export default function PrivacyPage() {
  return (
    <div className="max-w-200 mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-4 tracking-[-1px] text-ink">Privacy Policy</h1>
      <p className="text-ink-muted mb-10">
        Last updated: June 2026
      </p>

      <div className="flex flex-col gap-8 text-ink-secondary leading-relaxed text-[15px]">
        <section>
          <h2 className="text-xl font-bold mb-3 text-ink">1. Information We Collect</h2>
          <p>
            When you use imagestudio, we may collect your email address and
            profile information if you create an account. Images uploaded for
            analysis are processed in real time and are <strong>not</strong>{" "}
            stored on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-ink">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide and improve the
            imagestudio service, communicate with you about your account, and
            send service-related notifications.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-ink">3. Third-Party Services</h2>
          <p>
            We use Cloudflare Workers AI to process image analysis. Images are
            sent to Cloudflare for inference and are subject to{" "}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Cloudflare&apos;s Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-ink">4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your
            data. However, no method of transmission over the Internet is 100%
            secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 text-ink">5. Contact</h2>
          <p>
            If you have questions about this Privacy Policy, please{" "}
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
