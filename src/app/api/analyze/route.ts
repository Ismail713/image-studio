import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) {
    return NextResponse.json(
      { error: "Missing Cloudflare credentials" },
      { status: 500 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const imageArray = [...new Uint8Array(arrayBuffer)];

    const style = formData.get("style") as string | null;
    const styleHint = style ? ` Style preference: ${style}.` : "";

    const cfRes = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/llava-hf/llava-1.5-7b-hf`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageArray,
          prompt: `You are an expert AI art prompt engineer. Analyze this image and write a detailed generation prompt that could recreate it in Midjourney, Stable Diffusion, or DALL-E. Include: subject description, art style, color palette, mood, lighting, composition, level of detail, and relevant quality tags. Return ONLY the prompt, no intro, no explanation.${styleHint}`,
          max_tokens: 512,
        }),
      }
    );

    const cfJson = await cfRes.json();

    if (!cfJson.success) {
      const message =
        cfJson.errors?.[0]?.message ?? "Cloudflare AI request failed";
      return NextResponse.json({ error: message }, { status: 502 });
    }

    const description: string = cfJson.result.description;
    return NextResponse.json({ prompt: description });
  } catch (err) {
    console.error("[analyze] unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
