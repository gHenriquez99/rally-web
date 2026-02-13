import type { Metadata } from "next";
/* eslint-disable react/no-unescaped-entities */

export const metadata: Metadata = {
  title: "Terms of Service - Rally",
  description:
    "Rally terms governing eligibility, acceptable use, content, and legal limitations.",
};

export default function TermsOfService() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-3">Rally Terms of Service</h1>
      <p className="text-sm text-foreground/60 mb-6">
        Effective date: February 13, 2026
      </p>
      <p className="mb-6">
        These Terms of Service ("Terms") govern your access to and use of the
        Rally mobile application and related services (collectively, the
        "Service") operated by Rally ("Rally," "we," "us," or "our"). By
        creating an account, accessing, or using the Service, you agree to
        these Terms.
      </p>
      <p className="mb-10">
        Contact:{" "}
        <a
          href="mailto:henriquez.gus99@gmail.com"
          className="underline hover:opacity-80"
        >
          henriquez.gus99@gmail.com
        </a>
      </p>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">1. Eligibility and Acceptance</h2>
        <p>You must be at least 13 years old to use the Service. By using Rally, you represent and warrant that:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You are at least 13.</li>
          <li>You can form a binding agreement.</li>
          <li>You will comply with these Terms and applicable laws.</li>
        </ul>
        <p>If you do not agree to these Terms, do not use the Service.</p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">2. Accounts and Security</h2>
        <p>
          To use Rally, you must register and authenticate with a valid phone
          number and one-time passcode flow.
        </p>
        <p>You are responsible for:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Providing accurate account information.</li>
          <li>
            Maintaining control of your device and authentication credentials.
          </li>
          <li>All activity that occurs under your account.</li>
        </ul>
        <p>
          You must promptly notify us at{" "}
          <a
            href="mailto:henriquez.gus99@gmail.com"
            className="underline hover:opacity-80"
          >
            henriquez.gus99@gmail.com
          </a>{" "}
          if you suspect unauthorized account access.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">3. Service Description</h2>
        <p>
          Rally allows users to create and manage event pages, invite
          participants, share event links/codes, manage RSVPs and ticket
          commitments, and receive event-related notifications.
        </p>
        <p>
          We may modify, improve, suspend, or discontinue any part of the
          Service at any time.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">4. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Use the Service for unlawful, harmful, fraudulent, or deceptive
            purposes.
          </li>
          <li>
            Upload or share content that infringes another party&apos;s rights.
          </li>
          <li>Harass, abuse, threaten, or impersonate others.</li>
          <li>
            Attempt to disrupt, probe, reverse engineer, scrape, or bypass
            security or access controls.
          </li>
          <li>
            Use automation or abusive behavior that harms Service integrity or
            other users.
          </li>
          <li>Distribute malware or malicious code through the Service.</li>
        </ul>
        <p>
          We may investigate violations and remove content, restrict access,
          suspend, or terminate accounts when necessary.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">5. User Content</h2>
        <p>
          "User Content" includes information and materials you submit through
          Rally, including profile details, event details, invite links/codes,
          RSVPs, and related content.
        </p>
        <p>
          You retain ownership of your User Content. By submitting User Content,
          you grant Rally a non-exclusive, worldwide, royalty-free license to
          host, store, process, reproduce, and display that content solely to
          operate, provide, maintain, and improve the Service.
        </p>
        <p>You represent and warrant that:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            You have the rights needed to submit and share your User Content.
          </li>
          <li>
            Your User Content and use of the Service do not violate law or
            third-party rights.
          </li>
        </ul>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">6. Invites, Links, and Event Access</h2>
        <p>
          Rally may provide shareable event links/tokens. You are responsible
          for how and with whom you share invite links or codes.
        </p>
        <p>You understand that:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            People with valid invite access may be able to view and participate
            in event content according to Service rules.
          </li>
          <li>
            Rally may enforce event/member limits and other access controls.
          </li>
          <li>
            Event owners are responsible for event details and updates they
            publish.
          </li>
        </ul>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">
          7. Third-Party Services and Links
        </h2>
        <p>
          The Service may integrate with or link to third-party services (for
          example, maps providers, calendar providers, or external ticket URLs).
          We do not control and are not responsible for third-party products,
          content, policies, or practices.
        </p>
        <p>
          Your use of third-party services is governed by their own terms and
          policies.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">8. Privacy</h2>
        <p>
          Our data practices are described in the Privacy Policy:{" "}
          <a
            href="https://rallyapp.app/privacy-policy"
            className="underline hover:opacity-80"
          >
            https://rallyapp.app/privacy-policy
          </a>
        </p>
        <p>
          By using the Service, you acknowledge that Rally may process your
          information as described in that policy.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">9. Suspension and Termination</h2>
        <p>
          You may stop using the Service at any time. You may request account
          deletion in-app or by contacting us.
        </p>
        <p>We may suspend or terminate access immediately if we reasonably believe:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You violated these Terms.</li>
          <li>Your use poses legal, security, or operational risk.</li>
          <li>We are required to do so by law.</li>
        </ul>
        <p>
          Sections that by nature should survive termination (such as ownership,
          disclaimers, limitations, indemnity, governing law) will survive.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">
          10. App Store and Platform Terms (Apple)
        </h2>
        <p>If you access Rally through Apple&apos;s App Store, you acknowledge:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>These Terms are between you and Rally, not Apple.</li>
          <li>Apple is not responsible for the Service or its content.</li>
          <li>
            Apple has no obligation to provide maintenance or support for the
            Service.
          </li>
          <li>
            To the maximum extent permitted by law, Apple has no warranty
            obligations regarding the Service.
          </li>
          <li>
            Apple and Apple&apos;s subsidiaries are third-party beneficiaries of
            these Terms and may enforce these Terms against you.
          </li>
        </ul>
        <p>You also represent that:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            You are not located in a country subject to a U.S. government
            embargo.
          </li>
          <li>
            You are not on any U.S. government list of prohibited or restricted
            parties.
          </li>
        </ul>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">11. Disclaimers</h2>
        <p>
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES
          OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND
          NON-INFRINGEMENT.
        </p>
        <p>
          Rally does not warrant that the Service will be uninterrupted,
          error-free, secure, or always available, or that any content will be
          accurate or complete.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">12. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, RALLY AND ITS AFFILIATES,
          SERVICE PROVIDERS, AND PERSONNEL WILL NOT BE LIABLE FOR ANY INDIRECT,
          INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR
          ANY LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS
          INTERRUPTION, ARISING OUT OF OR RELATED TO THE SERVICE OR THESE TERMS.
        </p>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE TOTAL LIABILITY OF RALLY
          FOR ALL CLAIMS ARISING OUT OF OR RELATED TO THE SERVICE OR THESE TERMS
          WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS (USD $100).
        </p>
        <p>
          Some jurisdictions do not allow certain limitations, so parts of this
          section may not apply to you.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">13. Indemnification</h2>
        <p>
          You agree to defend, indemnify, and hold harmless Rally and its
          affiliates, service providers, and personnel from and against claims,
          liabilities, damages, losses, and expenses (including reasonable
          attorneys&apos; fees) arising from or related to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Your use of the Service.</li>
          <li>Your User Content.</li>
          <li>Your violation of these Terms or applicable law.</li>
          <li>Your infringement of third-party rights.</li>
        </ul>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">14. Governing Law and Venue</h2>
        <p>
          These Terms and any dispute arising out of or related to these Terms
          or the Service are governed by the laws of the District of Columbia,
          without regard to conflict of law rules.
        </p>
        <p>
          Any legal action or proceeding must be brought exclusively in the
          state or federal courts located in the District of Columbia, and you
          consent to personal jurisdiction and venue in those courts.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">15. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. If we make material
          changes, we will post the updated Terms and revise the effective date
          above. Your continued use of the Service after updated Terms become
          effective constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-semibold">16. General Terms</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Entire agreement: These Terms, together with the Privacy Policy, are
            the entire agreement between you and Rally regarding the Service.
          </li>
          <li>
            Severability: If any provision is held unenforceable, the remaining
            provisions remain in effect.
          </li>
          <li>No waiver: Failure to enforce a provision is not a waiver.</li>
          <li>
            Assignment: You may not assign these Terms without our prior written
            consent. We may assign these Terms in connection with a merger,
            acquisition, reorganization, or asset sale.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">17. Contact</h2>
        <p>Questions or legal notices:</p>
        <p>
          <a
            href="mailto:henriquez.gus99@gmail.com"
            className="underline hover:opacity-80"
          >
            henriquez.gus99@gmail.com
          </a>
        </p>
      </section>
    </main>
  );
}
