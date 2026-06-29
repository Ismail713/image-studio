"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Copy, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";

interface GalleryItem {
  id: number;
  src: string;
  style: string;
  prompt: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
    style: "Cinematic",
    prompt:
      "A breathtaking cinematic landscape of a misty valley at golden hour, layered mountains fading into fog, warm amber light streaming through clouds, ultra-wide composition, film grain, anamorphic lens flare",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
    style: "Photorealistic",
    prompt:
      "Sun rays breaking through dense forest canopy onto a winding mountain path, volumetric god rays, lush green foliage, shallow depth of field, 85mm lens, National Geographic style",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop",
    style: "Digital Art",
    prompt:
      "Serene alpine lake reflecting snow-capped peaks at sunset, mirror-still water, pastel sky gradients from coral to lavender, foreground wildflowers, panoramic composition, hyperdetailed digital painting",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&h=400&fit=crop",
    style: "Oil Painting",
    prompt:
      "Majestic waterfall cascading through emerald forest, suspended bridge in mist, tropical vegetation, impressionist oil painting style, visible brushstrokes, rich saturated greens and whites",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=400&fit=crop",
    style: "Anime",
    prompt:
      "Vast rolling meadow under dramatic cumulus clouds at golden hour, single path disappearing into horizon, wildflowers in wind, Makoto Shinkai anime style, vibrant colors, lens flare",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    style: "Watercolor",
    prompt:
      "Tropical beach at dawn with crystal-clear turquoise water, gentle waves lapping at white sand, palm trees silhouetted against pastel pink sky, watercolor painting style, soft washes, bleeding edges",
  },
];

export const PhotoGallery = () => {
  const t = useTranslations("gallery");
  const locale = useLocale();
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = useCallback(
    async (id: number, prompt: string) => {
      await navigator.clipboard.writeText(prompt);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    },
    []
  );

  return (
    <div className="min-h-screen relative bg-neutral-950">
      {/* Background glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(59,130,246,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 text-center pt-14 sm:pt-24 pb-8 sm:pb-12 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
          {t("title")}
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg">
          {t("description")}
        </p>
      </div>

      {/* Gallery grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {galleryItems.map((item, i) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 transition-transform duration-300 hover:-translate-y-1 hover:border-neutral-700"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[3/2]">
                <Image
                  src={item.src}
                  alt={`${item.style} style example`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Style badge */}
                <span className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm rounded-full px-3 py-1">
                  {item.style}
                </span>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Prompt section */}
              <div className="p-4">
                <p className="text-sm text-gray-300 leading-relaxed line-clamp-2 mb-3">
                  {item.prompt}
                </p>
                <button
                  onClick={() => handleCopy(item.id, item.prompt)}
                  className={cn(
                    "flex items-center gap-2 text-xs font-medium rounded-lg px-3 py-2 transition-colors w-full justify-center",
                    copiedId === item.id
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-neutral-800 text-gray-300 border border-neutral-700 hover:bg-neutral-700 hover:text-white"
                  )}
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      {t("copied")}
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      {t("copy")}
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="relative z-10 pb-12 sm:pb-20 flex justify-center gap-4 px-4">
        <Link
          href={`/${locale}/generator`}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          <Sparkles className="h-4 w-4" />
          {t("generateOwn")}
        </Link>
      </div>
    </div>
  );
};
