export default function TermsPage() {
  return (
    <div className="max-w-200 mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-4 tracking-[-1px] text-ink">Terms of Service</h1>
      <p className="text-ink-muted mb-10">
        Last updated: June 2026
      </p>

      <div className="flex flex-col gap-8 text-ink-secondary leading-relaxed text-[15px]">
        <section>
          <h2 className="text-xl font-bold mb-3 text-ink">1. Acceptance of Terms</h2>
          <p>
            By accessing and using imagestudio, you agree to be bound by these
            Terms of Service. If you do not agree, please do not use the
            service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-ink">2. Description of Service</h2>
          <p>
            imagestudio provides AI-powered image-to-prompt generation. You
            upload an image, and the service returns a text prompt describing
            the image in a style suitable for AI image generators.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-ink">3. User Responsibilities</h2>
          <p>
            You are responsible for the images you upload. Do not upload images
            that contain illegal, harmful, or copyrighted content without
            authorization. You retain ownership of your uploaded images and
            generated prompts.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-ink">4. Limitations</h2>
          <p>
            The service is provided &quot;as is&quot; without warranties of any
            kind. We do not guarantee the accuracy, completeness, or usefulness
            of any generated prompt. We reserve the right to modify or
            discontinue the service at any time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-ink">5. Contact</h2>
          <p>
            Questions about these terms? Please{" "}
            <a href="/contact" className="text-primary hover:underline">
              contact us
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
