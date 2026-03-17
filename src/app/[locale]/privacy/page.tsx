import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Linimatic A/S collects, uses, and protects your personal data under GDPR.",
};

export default function PrivacyPolicyPage() {
  return (
    <article className="bg-zinc-50 pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-ember" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">
            Legal
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)] mb-8">
          Privacy Policy
        </h1>
        <p className="text-sm text-zinc-400 font-[family-name:var(--font-mono)] mb-12">
          Last updated: March 2026
        </p>

        <div className="prose prose-zinc max-w-none text-zinc-600 space-y-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-zinc-900 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-zinc-800 [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:leading-relaxed [&_ul]:space-y-2 [&_li]:text-zinc-600">

          <h2>Data Controller</h2>
          <p>
            Linimatic A/S is the data controller for personal data collected through this website.
          </p>
          <p>
            Linimatic A/S<br />
            Bomose Allé 12<br />
            DK-3200 Helsinge, Denmark<br />
            CVR: DK-20254386<br />
            <a href="mailto:info@linimatic.dk" className="text-ember hover:text-ember-light transition-colors">
              info@linimatic.dk
            </a><br />
            <span className="font-[family-name:var(--font-mono)]">+45 4876 4040</span>
          </p>

          <h2>What Data We Collect</h2>
          <p>We may collect the following personal data through our website:</p>
          <ul className="list-disc pl-5">
            <li><strong>Contact form submissions:</strong> Name, company, email, phone number, and project description when you request a quote or contact us.</li>
            <li><strong>Job applications:</strong> Name, contact details, CV, and cover letter when applying for positions.</li>
            <li><strong>Technical data:</strong> IP address, browser type, operating system, and browsing behaviour collected automatically through cookies (with your consent).</li>
            <li><strong>Communication data:</strong> Records of correspondence if you contact us by email or phone.</li>
          </ul>

          <h2>Legal Basis for Processing</h2>
          <p>Under the General Data Protection Regulation (GDPR), we process personal data based on:</p>
          <ul className="list-disc pl-5">
            <li><strong>Consent (Art. 6(1)(a)):</strong> For analytics and marketing cookies, and for newsletter subscriptions.</li>
            <li><strong>Contractual necessity (Art. 6(1)(b)):</strong> To process quote requests and respond to customer inquiries.</li>
            <li><strong>Legitimate interest (Art. 6(1)(f)):</strong> To improve our website, ensure security, and communicate about our services.</li>
            <li><strong>Legal obligation (Art. 6(1)(c)):</strong> To comply with tax, accounting, and other regulatory requirements.</li>
          </ul>

          <h2>How We Use Your Data</h2>
          <ul className="list-disc pl-5">
            <li>To respond to quote requests and customer inquiries</li>
            <li>To process job applications</li>
            <li>To improve our website and services (with consent)</li>
            <li>To comply with legal and regulatory obligations</li>
            <li>To protect our legitimate business interests</li>
          </ul>

          <h2>Data Retention</h2>
          <p>
            We retain personal data only as long as necessary for the purposes described above, or as required by law.
            Specifically:
          </p>
          <ul className="list-disc pl-5">
            <li><strong>Quote requests:</strong> Retained for 2 years from last contact, or longer if a business relationship is established.</li>
            <li><strong>Job applications:</strong> Retained for 6 months after the position is filled, unless you consent to longer retention.</li>
            <li><strong>Analytics data:</strong> Aggregated and anonymized within 26 months.</li>
            <li><strong>Accounting records:</strong> Retained for 5 years as required by Danish bookkeeping law.</li>
          </ul>

          <h2>Data Sharing</h2>
          <p>
            We do not sell your personal data. We may share data with:
          </p>
          <ul className="list-disc pl-5">
            <li><strong>Service providers:</strong> Hosting, email, and analytics providers who process data on our behalf under data processing agreements.</li>
            <li><strong>Legal authorities:</strong> When required by law or to protect our rights.</li>
          </ul>
          <p>
            All data processors are located within the EU/EEA. If any data transfer outside the EU/EEA is necessary,
            we ensure appropriate safeguards are in place (e.g., Standard Contractual Clauses).
          </p>

          <h2>Your Rights</h2>
          <p>Under GDPR, you have the right to:</p>
          <ul className="list-disc pl-5">
            <li><strong>Access</strong> — Request a copy of the personal data we hold about you.</li>
            <li><strong>Rectification</strong> — Request correction of inaccurate data.</li>
            <li><strong>Erasure</strong> — Request deletion of your data (&ldquo;right to be forgotten&rdquo;).</li>
            <li><strong>Restriction</strong> — Request limitation of data processing.</li>
            <li><strong>Portability</strong> — Request your data in a structured, machine-readable format.</li>
            <li><strong>Objection</strong> — Object to processing based on legitimate interest.</li>
            <li><strong>Withdraw consent</strong> — Withdraw previously given consent at any time.</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:info@linimatic.dk" className="text-ember hover:text-ember-light transition-colors">
              info@linimatic.dk
            </a>.
            We will respond within 30 days.
          </p>

          <h2>Complaints</h2>
          <p>
            If you believe your data protection rights have been violated, you have the right to lodge a complaint
            with the Danish Data Protection Agency (Datatilsynet):
          </p>
          <p>
            Datatilsynet<br />
            Carl Jacobsens Vej 35<br />
            2500 Valby, Denmark<br />
            <span className="font-[family-name:var(--font-mono)]">+45 3319 3200</span><br />
            dt@datatilsynet.dk
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. The &ldquo;last updated&rdquo; date at the top
            reflects the most recent revision. We encourage you to review this page periodically.
          </p>
        </div>
      </div>
    </article>
  );
}
