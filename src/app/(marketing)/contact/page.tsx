export default function ContactPage() {
  return (
    <div className="max-w-150 mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-4 tracking-[-1px] text-ink">Contact us</h1>
      <p className="text-ink-muted mb-10">
        Have a question, suggestion, or feedback? We&apos;d love to hear from
        you.
      </p>

      <form
        action="mailto:ismailsghir29@gmail.com"
        method="POST"
        encType="text/plain"
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="border border-hairline rounded-lg px-4 py-2.5 text-[15px] bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Your name"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="border border-hairline rounded-lg px-4 py-2.5 text-[15px] bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm font-medium text-ink">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="border border-hairline rounded-lg px-4 py-2.5 text-[15px] bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary resize-y"
            placeholder="How can we help?"
          />
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-active text-on-primary py-3 rounded-full font-medium text-sm transition-colors self-start px-10"
        >
          Send message
        </button>
      </form>
    </div>
  );
}
