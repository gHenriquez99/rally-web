import type { Metadata } from "next";

const supportEmail = "support@rallyapp.app";
const supportSubject = encodeURIComponent("Rally Support Request");
const supportBody = encodeURIComponent(
  `Type (Feedback/Bug):
Device:
App version:
Description:
Steps to reproduce (optional):
`
);
const supportMailtoHref = `mailto:${supportEmail}?subject=${supportSubject}&body=${supportBody}`;

export const metadata: Metadata = {
  title: "Support - Rally",
  description: "Contact Rally support for feedback and issue reports.",
};

export default function SupportPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-3">Rally Support</h1>
      <p className="text-sm text-foreground/60 mb-6">
        Need help, found a bug, or want to share feedback? Send us an email.
      </p>

      <p className="mb-6">
        <a href={supportMailtoHref} className="underline hover:opacity-80">
          Email Rally Support
        </a>
      </p>

      <p>
        If the button above does not open your mail app, email us at{" "}
        <a
          href={`mailto:${supportEmail}`}
          className="underline hover:opacity-80"
        >
          {supportEmail}
        </a>
        .
      </p>
    </main>
  );
}
