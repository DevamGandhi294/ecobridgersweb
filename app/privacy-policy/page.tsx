import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://ecobridgers.com/privacy-policy',
  },
  title: 'Privacy Policy | Playco by Ecobridgers',
  description: 'Privacy Policy for Playco mobile social-deduction game provided by Ecobridgers.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-screen-md px-4 py-16 sm:px-6 lg:px-8 text-zinc-300">
      <div className="space-y-6">
        <div>
          <Link href="/work/playco" className="text-xs font-bold text-emerald-400 uppercase tracking-widest hover:underline">
            ← Back to Playco Game
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            Playco — Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-purple-400 font-semibold uppercase tracking-wider">Playco Mobile Game Privacy Policy</p>
          <p className="mt-1 text-xs text-zinc-500">Last updated: September 04, 2026</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed border-t border-white/10 pt-6" style={{ fontFamily: "var(--font-body)" }}>
          <p>
            This Privacy Policy describes how Ecobridgers (&quot;Company&quot;, &quot;We&quot;, &quot;Us&quot;, or &quot;Our&quot;) collects, uses, discloses, and protects information when you use Playco (the &quot;Application&quot; or &quot;Service&quot;), a mobile social-deduction game. It also describes your privacy rights and how the law protects you.
          </p>

          <p>
            By using the Service, you agree to the collection and use of information in accordance with this Privacy Policy.
          </p>

          {/* ── INTERPRETATION & DEFINITIONS ── */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Interpretation and Definitions</h2>
            <h3 className="text-base font-semibold text-emerald-400">Definitions</h3>
            <ul className="list-disc pl-5 space-y-2 text-zinc-300">
              <li><strong>Account</strong> — a unique account created for you to access and use the Service.</li>
              <li><strong>Application / Service</strong> — refers to Playco, the mobile game provided by the Company.</li>
              <li><strong>Company (&quot;We&quot;, &quot;Us&quot;, &quot;Our&quot;)</strong> — refers to Ecobridgers.</li>
              <li><strong>Country</strong> — Gujarat, India.</li>
              <li><strong>Device</strong> — any device that can access the Service, such as a mobile phone or tablet.</li>
              <li><strong>Personal Data</strong> — any information that relates to an identified or identifiable individual.</li>
              <li><strong>Service Provider</strong> — any third party that processes data on behalf of the Company, such as Google Firebase.</li>
              <li><strong>Usage Data</strong> — data collected automatically from use of the Service, such as interaction and diagnostic data.</li>
              <li><strong>User / You</strong> — the individual accessing or using the Service.</li>
            </ul>
          </section>

          {/* ── INFORMATION WE COLLECT ── */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Information We Collect</h2>

            <h3 className="text-base font-semibold text-emerald-400">Personal Data You Provide</h3>
            <p>When you create an Account, We may ask you to provide:</p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-300">
              <li>Phone number (used with a one-time password (&quot;OTP&quot;) to verify and log you in)</li>
              <li>Name or username</li>
              <li>If you sign in with Google, your name and email address as provided by Google</li>
            </ul>
            <p className="text-xs text-zinc-400 bg-zinc-900/60 border border-white/10 p-3 rounded-xl">
              We use your phone number and OTP only to verify your identity and secure your Account. We do not use your phone number for promotional SMS or marketing messages.
            </p>

            <h3 className="text-base font-semibold text-emerald-400 pt-2">Usage and Analytics Data</h3>
            <p>
              We use Google Firebase Analytics, a third-party analytics service, to understand how the Service is used and to improve it. Firebase automatically collects data such as:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-300">
              <li>Device type, operating system, and app version</li>
              <li>IP address and approximate location (country/region level)</li>
              <li>In-app activity, including screens viewed, buttons/elements tapped (&quot;onclick&quot; events), session length, and crash/diagnostic data</li>
            </ul>
            <p>
              This data is collected and processed by Firebase on Our behalf, in accordance with Google&apos;s Privacy Policy (available at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">policies.google.com/privacy</a>). We do not use browser-style cookies, as Playco is a mobile application rather than a website.
            </p>

            <h3 className="text-base font-semibold text-emerald-400 pt-2">Push Notifications</h3>
            <p>
              If you enable notifications, We may send you push notifications regarding game invites, matches, updates, or account-related alerts. You can disable push notifications at any time through your device&apos;s notification settings.
            </p>
          </section>

          {/* ── HOW WE USE YOUR DATA ── */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">How We Use Your Data</h2>
            <p>The Company may use Personal Data and Usage Data for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
              <li>To create, maintain, and secure your Account</li>
              <li>To verify your identity via OTP or Google Sign-In</li>
              <li>To operate, maintain, and improve the Service</li>
              <li>To send push notifications related to gameplay or your Account</li>
              <li>To analyze usage trends and improve app performance, using Firebase Analytics</li>
              <li>To detect, prevent, and address technical issues, fraud, or abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          {/* ── SHARING OF YOUR INFORMATION ── */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Sharing of Your Information</h2>
            <p>We may share your information in the following situations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
              <li><strong>With Service Providers</strong> — such as Google Firebase, to enable analytics and app functionality.</li>
              <li><strong>For business transfers</strong> — in connection with a merger, acquisition, or sale of assets.</li>
              <li><strong>With law enforcement</strong> — where required by applicable law or valid legal process.</li>
              <li><strong>With your consent</strong> — for any other purpose disclosed to you at the time of collection.</li>
            </ul>
            <p className="font-semibold text-white">We do not sell your Personal Data to third parties.</p>
          </section>

          {/* ── DATA RETENTION ── */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Data Retention</h2>
            <p>We retain your Personal Data only as long as necessary for the purposes described in this Privacy Policy:</p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-300">
              <li><strong>Account information:</strong> retained for the duration of your Account, plus up to 24 months after account closure.</li>
              <li><strong>Usage/analytics data:</strong> retained by Firebase in accordance with Google&apos;s standard analytics retention settings, generally up to 14 months, unless a shorter period is configured.</li>
            </ul>
            <p>We may retain data longer where required by law, to resolve disputes, or to enforce our agreements.</p>
          </section>

          {/* ── DATA SECURITY ── */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Data Security</h2>
            <p>
              We use commercially reasonable measures to protect your Personal Data. However, no method of transmission over the internet or electronic storage is 100% secure, and We cannot guarantee absolute security.
            </p>
          </section>

          {/* ── YOUR RIGHTS ── */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Your Rights</h2>
            <p>
              You may request to access, correct, or delete your Personal Data at any time by contacting Us using the details below. Where you have an Account, certain information can also be updated directly within the app.
            </p>
          </section>

          {/* ── CHILDREN'S PRIVACY ── */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Children&apos;s Privacy</h2>
            <p>
              The Service is not directed to, and We do not knowingly collect Personal Data from, anyone under the age of 18. If you are a parent or guardian and believe your child has provided Us with Personal Data, please contact Us, and We will take steps to delete such information.
            </p>
          </section>

          {/* ── CHANGES TO THIS PRIVACY POLICY ── */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy in the app and updating the &quot;Last updated&quot; date above.
            </p>
          </section>

          {/* ── CONTACT US ── */}
          <section className="space-y-3 border-t border-white/10 pt-6">
            <h2 className="text-xl font-bold text-white">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, you can contact Us:</p>
            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 text-sm space-y-2">
              <p>• Through the in-app feedback/support form</p>
              <p>• By email: <a href="mailto:ecobridgers.tech@gmail.com" className="text-emerald-400 font-semibold hover:underline">ecobridgers.tech@gmail.com</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
