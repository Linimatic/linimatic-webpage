import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Linimatic A/S uses cookies and similar technologies on our website.",
};

export default function CookiePolicyPage() {
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
          Cookie Policy
        </h1>
        <p className="text-sm text-zinc-400 font-[family-name:var(--font-mono)] mb-12">
          Last updated: March 2026
        </p>

        <div className="prose prose-zinc max-w-none text-zinc-600 space-y-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-zinc-900 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-zinc-800 [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:leading-relaxed [&_table]:w-full [&_table]:text-sm [&_th]:text-left [&_th]:py-3 [&_th]:px-4 [&_th]:bg-zinc-100 [&_th]:text-zinc-600 [&_th]:font-medium [&_th]:text-[11px] [&_th]:tracking-wider [&_th]:uppercase [&_th]:font-[family-name:var(--font-mono)] [&_td]:py-3 [&_td]:px-4 [&_td]:border-b [&_td]:border-zinc-100">

          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files placed on your device when you visit a website. They are widely used to make
            websites work more efficiently and provide information to website owners. Under EU regulation (the ePrivacy
            Directive and GDPR), we are required to obtain your consent before placing non-essential cookies.
          </p>

          <h2>How We Use Cookies</h2>
          <p>
            We categorize cookies into three types. You can manage your preferences at any time using the cookie
            settings on our website.
          </p>

          <h3>Necessary Cookies</h3>
          <p>
            These cookies are essential for the website to function properly. They enable basic features like page
            navigation, secure areas, and remembering your cookie preferences. The website cannot function properly
            without these cookies, and they cannot be disabled.
          </p>

          <table>
            <thead>
              <tr>
                <th>Cookie</th>
                <th>Purpose</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-[family-name:var(--font-mono)] text-zinc-800">cookie_consent</td>
                <td>Stores your cookie preference choices</td>
                <td>1 year</td>
              </tr>
            </tbody>
          </table>

          <h3>Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting and reporting
            information anonymously. This helps us improve the site experience for all users.
          </p>

          <h3>Marketing Cookies</h3>
          <p>
            These cookies are used to track visitors across websites to allow the display of relevant advertisements.
            They are typically placed by advertising networks with our permission.
          </p>

          <h2>Managing Your Preferences</h2>
          <p>
            When you first visit our website, a cookie banner will appear allowing you to accept all cookies,
            reject all non-essential cookies, or customize your preferences by category.
          </p>
          <p>
            You can change your cookie preferences at any time by clearing your browser cookies and revisiting the site,
            which will trigger the consent banner again.
          </p>
          <p>
            You can also control cookies through your browser settings. Most browsers allow you to refuse or delete
            cookies. The methods for doing so vary from browser to browser — consult your browser&apos;s help documentation.
          </p>

          <h2>Third-Party Cookies</h2>
          <p>
            Some cookies are placed by third-party services that appear on our pages. We do not control the use of
            these cookies. Relevant third-party providers include analytics and advertising platforms. Their respective
            privacy policies govern their use of data.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about our use of cookies, contact us at:
          </p>
          <p>
            Linimatic A/S<br />
            Bomose Allé 12<br />
            DK-3200 Helsinge, Denmark<br />
            <a href="mailto:info@linimatic.dk" className="text-ember hover:text-ember-light transition-colors">
              info@linimatic.dk
            </a><br />
            <span className="font-[family-name:var(--font-mono)]">+45 4876 4040</span>
          </p>
        </div>
      </div>
    </article>
  );
}
