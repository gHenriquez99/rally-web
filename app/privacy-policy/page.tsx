import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Rally",
  description:
    "Privacy policy for Rally. Learn what data we collect, why we collect it, and what your rights are.",
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Rally App Privacy Policy</h1>
      <p className="text-base mb-8">
        This privacy policy explains what information Rally collects, how it is
        used, and what rights users have regarding their information.
      </p>
      <p className="text-sm text-foreground/60 mb-10">
        Latest update: February 08, 2026
      </p>

      <section className="space-y-6 mb-10">
        <h2 className="text-2xl font-semibold">Owner</h2>
        <p>
          Owner contact email:{" "}
          <a
            href="mailto:henriquez.gus99@gmail.com"
            className="underline hover:opacity-80"
          >
            henriquez.gus99@gmail.com
          </a>
        </p>
      </section>

      <section className="space-y-6 mb-10">
        <h2 className="text-2xl font-semibold">Information We Collect</h2>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">
            Personal Data provided by Users
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Account information such as name, email address, or phone number
            </li>
            <li>
              User-generated content including events, event details, locations,
              invitations, and related content
            </li>
            <li>
              Information provided when communicating with other users or the
              Owner
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Usage and Device Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>IP address and approximate location derived from it</li>
            <li>Device type, operating system, and app version</li>
            <li>Interaction data such as features used and actions taken</li>
            <li>System logs and diagnostic information</li>
          </ul>
        </div>

        <p>
          Users are responsible for any third-party Personal Data they choose to
          share through the Application.
        </p>
      </section>

      <section className="space-y-6 mb-10">
        <h2 className="text-2xl font-semibold">How We Use Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To create and manage user accounts</li>
          <li>To allow users to create, manage, and participate in events</li>
          <li>To provide notifications and service-related communications</li>
          <li>To operate, maintain, and improve the Application</li>
          <li>To detect, prevent, and address misuse or security issues</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>

      <section className="space-y-6 mb-10">
        <h2 className="text-2xl font-semibold">
          How Information Is Processed and Shared
        </h2>

        <p>
          Personal Data is processed using electronic systems and organizational
          procedures related to the purposes described in this policy. The Owner
          takes reasonable administrative, technical, and organizational
          measures to protect Personal Data against unauthorized access,
          disclosure, alteration, or destruction.
        </p>

        <p>
          Personal Data may be shared with third-party service providers that
          assist in operating the Application, such as hosting providers,
          infrastructure providers, analytics or error monitoring services, and
          communication services. These providers process data only as necessary
          to perform services on behalf of the Owner.
        </p>
      </section>

      <section className="space-y-6 mb-10">
        <h2 className="text-2xl font-semibold">Data Retention</h2>
        <p>
          Personal Data is retained for as long as necessary to provide the
          Service and fulfill the purposes described in this policy.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Account information is retained while an account remains active.
          </li>
          <li>
            User-generated content is retained until it is deleted by the user
            or the account is removed.
          </li>
          <li>
            Certain information may be retained for longer periods where
            required for legal, security, or operational purposes.
          </li>
        </ul>
      </section>

      <section className="space-y-6 mb-10">
        <h2 className="text-2xl font-semibold">Account and Data Deletion</h2>
        <p>
          Users may request deletion of their account and associated Personal
          Data by contacting the Owner. Upon deletion, Personal Data will be
          removed or anonymized unless retention is required for legal,
          security, or legitimate business purposes.
        </p>
      </section>

      <section className="space-y-6 mb-10">
        <h2 className="text-2xl font-semibold">Rights of Users (GDPR)</h2>
        <p>
          Users located in the European Economic Area have the right, where
          applicable, to access, correct, delete, or restrict processing of
          their Personal Data, as well as the right to data portability and to
          object to certain processing activities.
        </p>
        <p>
          Requests may be submitted using the contact information provided in
          this policy.
        </p>
      </section>

      <section className="space-y-6 mb-10">
        <h2 className="text-2xl font-semibold">California Residents</h2>
        <p>
          California residents have the right to request access to the personal
          information collected about them, request deletion or correction of
          their personal information, and request information about how their
          data is used.
        </p>
        <p>
          Rally does not sell or share personal information for advertising
          purposes.
        </p>
      </section>

      <section className="space-y-6 mb-10">
        <h2 className="text-2xl font-semibold">Children’s Privacy</h2>
        <p>
          This Application is not intended for individuals under the age of 13.
          The Owner does not knowingly collect Personal Data from children under
          13. If such information is discovered, it will be deleted promptly.
        </p>
      </section>

      <section className="space-y-6 mb-10">
        <h2 className="text-2xl font-semibold">
          Changes to This Privacy Policy
        </h2>
        <p>
          The Owner reserves the right to update this privacy policy at any
          time. Updates will be posted on this page with a revised update date.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Legal Information</h2>
        <p>
          This privacy policy applies solely to Rally unless otherwise stated.
        </p>
      </section>
    </main>
  );
}
