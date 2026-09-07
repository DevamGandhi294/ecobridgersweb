import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://ecobridgers.com/terms-and-conditions',
  },
  title: 'Terms and Conditions | Playco by Ecobridgers',
  description: 'Terms and Conditions for Playco mobile social-deduction game operated by Ecobridgers.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="mx-auto max-w-screen-md px-4 py-16 sm:px-6 lg:px-8 text-zinc-300">
      <div className="space-y-6">
        <div>
          <Link href="/work/playco" className="text-xs font-bold text-emerald-400 uppercase tracking-widest hover:underline">
            ← Back to Playco Game
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            Playco — Terms and Conditions
          </h1>
          <p className="mt-2 text-xs text-purple-400 font-semibold uppercase tracking-wider">Playco Mobile Game Terms &amp; Conditions</p>
          <p className="mt-1 text-xs text-zinc-500">Last updated: September 04, 2026</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed border-t border-white/10 pt-6" style={{ fontFamily: "var(--font-body)" }}>
          <p>
            Please read these Terms and Conditions (&quot;Terms&quot;) carefully before using Playco (the &quot;Application&quot; or &quot;Service&quot;), operated by Ecobridgers (&quot;Company&quot;, &quot;We&quot;, &quot;Us&quot;, or &quot;Our&quot;).
          </p>

          <p>
            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part, you may not access the Service.
          </p>

          {/* ── ELIGIBILITY AND AGE REQUIREMENT ── */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Eligibility and Age Requirement</h2>
            <p>
              You must be at least 18 years old to create an Account or use the Service. By using the Service, you represent and warrant that you meet this age requirement.
            </p>
          </section>

          {/* ── ACCOUNTS ── */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Accounts</h2>
            <p>
              When you create an Account with Us, you must provide your phone number and a name or username, and verify your identity via OTP or Google Sign-In. You are responsible for:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-300">
              <li>Safeguarding your Account and OTP/login credentials</li>
              <li>All activity that occurs under your Account</li>
              <li>Providing accurate and current information</li>
            </ul>
            <p>
              You must notify Us immediately if you become aware of any unauthorized use of your Account. We are not liable for any loss arising from your failure to safeguard your Account.
            </p>
          </section>

          {/* ── ACCEPTABLE USE ── */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-300">
              <li>Use the Service for any unlawful purpose or in violation of these Terms</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Attempt to gain unauthorized access to the Service, other accounts, or related systems</li>
              <li>Use cheats, bots, exploits, or unauthorized third-party software to interfere with gameplay</li>
              <li>Impersonate any person or entity, or misrepresent your affiliation</li>
            </ul>
            <p className="text-xs text-zinc-400 bg-zinc-900/60 border border-white/10 p-3 rounded-xl">
              We reserve the right to suspend or terminate Accounts that violate these Terms.
            </p>
          </section>

          {/* ── INTELLECTUAL PROPERTY ── */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality — including but not limited to the Playco name, logo, visual design, characters, artwork, and user interface — are and will remain the exclusive property of Ecobridgers. Our trademarks and trade dress may not be copied, reproduced, or used in connection with any product or service without Our prior written consent.
            </p>
            <p>
              Nothing in these Terms grants you any right to use Our trademarks, logos, or branding without express permission.
            </p>
          </section>

          {/* ── FEEDBACK ── */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Feedback</h2>
            <p>
              If you choose to submit ideas, suggestions, or feedback about the Service, you agree that We may use, modify, and incorporate such feedback into the Service without any obligation to compensate or credit you.
            </p>
          </section>

          {/* ── THIRD-PARTY SERVICES ── */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Third-Party Services</h2>
            <p>
              The Service uses Google Firebase for analytics and account sign-in functionality. Your use of these features is also subject to Google&apos;s applicable terms and privacy policy. We are not responsible for the practices of third-party services.
            </p>
          </section>

          {/* ── TERMINATION ── */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Termination</h2>
            <p>
              We may suspend or terminate your Account and access to the Service at any time, without prior notice, for conduct that We believe violates these Terms, is harmful to other users, or is otherwise inappropriate.
            </p>
            <p>
              You may stop using the Service and delete your Account at any time.
            </p>
          </section>

          {/* ── DISCLAIMER OF WARRANTIES ── */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Disclaimer of Warranties</h2>
            <p>
              The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis, without warranties of any kind, whether express or implied. We do not warrant that the Service will be uninterrupted, error-free, or free of harmful components.
            </p>
          </section>

          {/* ── LIMITATION OF LIABILITY ── */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Ecobridgers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, arising out of or related to your use of the Service.
            </p>
          </section>

          {/* ── GOVERNING LAW ── */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes shall be subject to the exclusive jurisdiction of the courts of Gujarat, India.
            </p>
          </section>

          {/* ── CHANGES TO THESE TERMS ── */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Changes to These Terms</h2>
            <p>
              We may revise these Terms from time to time. Material changes will be notified through the app or by updating the &quot;Last updated&quot; date above. Continued use of the Service after changes take effect constitutes acceptance of the revised Terms.
            </p>
          </section>

          {/* ── CONTACT US ── */}
          <section className="space-y-3 border-t border-white/10 pt-6">
            <h2 className="text-xl font-bold text-white">Contact Us</h2>
            <p>If you have any questions about these Terms and Conditions, you can contact Us:</p>
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
