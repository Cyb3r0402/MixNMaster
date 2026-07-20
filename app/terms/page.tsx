import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — MixMaster Studio',
  description:
    'Read the Terms of Service for MixMaster Studio, covering our mixing and mastering services, payment terms, revisions policy, and intellectual property rights.',
  openGraph: {
    title: 'Terms of Service — MixMaster Studio',
    description:
      'Terms of Service for MixMaster Studio mixing and mastering services.',
  },
};

const LAST_UPDATED = 'July 20, 2026';

const SECTIONS = [
  { id: 'overview', title: '1. Overview' },
  { id: 'services', title: '2. Services' },
  { id: 'ordering', title: '3. Ordering & Payment' },
  { id: 'delivery', title: '4. Delivery & Revisions' },
  { id: 'ip', title: '5. Intellectual Property' },
  { id: 'files', title: '6. File Handling & Privacy' },
  { id: 'liability', title: '7. Limitation of Liability' },
  { id: 'refunds', title: '8. Refunds & Cancellations' },
  { id: 'modifications', title: '9. Modifications' },
  { id: 'contact', title: '10. Contact' },
];

export default function TermsPage() {
  return (
    <main className="grain relative">
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-24 sm:pt-32">
        {/* Header */}
        <span className="font-mono text-xs uppercase tracking-widest text-amber">
          Legal
        </span>
        <h1 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-paper/50">
          Last updated: {LAST_UPDATED}
        </p>

        {/* Table of Contents */}
        <nav className="mt-10 rounded-xl border border-line bg-surface/40 p-6">
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-amber">
            Table of Contents
          </h2>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-paper/60 transition-colors hover:text-amber"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Content */}
        <div className="terms-content mt-12 space-y-12">
          <section id="overview">
            <h2 className="font-display text-2xl font-bold uppercase">
              1. Overview
            </h2>
            <p>
              Welcome to MixMaster Studio. These Terms of Service (&quot;Terms&quot;)
              govern your use of our website and mixing/mastering services. By
              placing an order or using our website, you agree to be bound by
              these Terms. If you do not agree, please do not use our services.
            </p>
            <p>
              MixMaster Studio provides professional audio mixing and mastering
              services for independent artists and producers. Our services are
              available to individuals who are at least 18 years of age or have
              parental/guardian consent.
            </p>
          </section>

          <section id="services">
            <h2 className="font-display text-2xl font-bold uppercase">
              2. Services
            </h2>
            <p>We offer the following services:</p>
            <ul>
              <li>
                <strong>Mix Only</strong> — Balance, EQ, compression, and spatial
                processing across your stems to create a cohesive mix.
              </li>
              <li>
                <strong>Master Only</strong> — Final polish, loudness optimization,
                and format preparation on an already-mixed track.
              </li>
              <li>
                <strong>Mix + Master</strong> — Complete signal chain from raw stems
                to a release-ready master.
              </li>
            </ul>
            <p>
              The specific processing applied to each project is at the discretion
              of our engineers, guided by your instructions, reference tracks, and
              industry best practices.
            </p>
          </section>

          <section id="ordering">
            <h2 className="font-display text-2xl font-bold uppercase">
              3. Ordering &amp; Payment
            </h2>
            <p>
              All prices are listed in US Dollars (USD) and are displayed on our
              website at the time of ordering. Pricing is flat and upfront — there
              are no hidden fees or per-stem surcharges.
            </p>
            <p>
              Payment is processed securely through Stripe. Your payment
              information is transmitted directly to Stripe and never touches our
              servers. By placing an order, you authorize us to charge your
              payment method for the selected service.
            </p>
            <p>
              An order is considered confirmed once payment is successfully
              processed and you receive a confirmation email.
            </p>
          </section>

          <section id="delivery">
            <h2 className="font-display text-2xl font-bold uppercase">
              4. Delivery &amp; Revisions
            </h2>
            <p>
              Standard delivery time is 3–5 business days from the date we
              receive your stems and project notes. Delivery times may vary based
              on current workload and project complexity.
            </p>
            <p>
              Each order includes <strong>one (1) free revision</strong>. A
              revision consists of specific, actionable feedback on the delivered
              mix (e.g., &quot;bring the vocals up,&quot; &quot;less reverb on
              the snare&quot;). Complete re-mixes or fundamental direction changes
              may be subject to additional charges.
            </p>
            <p>
              Additional revisions beyond the included revision are available for
              $25 USD each. Revision requests must be submitted within 14 days of
              receiving the initial delivery.
            </p>
          </section>

          <section id="ip">
            <h2 className="font-display text-2xl font-bold uppercase">
              5. Intellectual Property
            </h2>
            <p>
              <strong>You retain all rights to your music.</strong> MixMaster
              Studio does not claim any ownership, copyright, or royalty interest
              in the audio content you submit or the finished mixes we deliver.
            </p>
            <p>
              By submitting audio files, you represent and warrant that you own or
              have the necessary rights and licenses to the content, and that your
              content does not infringe on any third-party intellectual property
              rights.
            </p>
            <p>
              We may request permission to use brief excerpts of completed work
              for portfolio/demo purposes. This is entirely optional, and we will
              always ask before featuring your music publicly.
            </p>
          </section>

          <section id="files">
            <h2 className="font-display text-2xl font-bold uppercase">
              6. File Handling &amp; Privacy
            </h2>
            <p>
              Your audio files are uploaded securely and stored using
              industry-standard encrypted cloud storage. We retain your files for
              up to 30 days after delivery to facilitate any revisions.
            </p>
            <p>
              After the 30-day retention period, all uploaded stems and project
              files are permanently deleted from our storage. We recommend
              downloading and backing up all delivered files promptly.
            </p>
            <p>
              We do not share, sell, or distribute your audio files or personal
              information to third parties, except as necessary to process
              payments (via Stripe) or deliver notifications (via email).
            </p>
          </section>

          <section id="liability">
            <h2 className="font-display text-2xl font-bold uppercase">
              7. Limitation of Liability
            </h2>
            <p>
              MixMaster Studio provides services on an &quot;as-is&quot; basis. While we
              strive for the highest quality in every project, music production is
              inherently subjective. We do not guarantee specific commercial
              outcomes (e.g., chart placement, streaming numbers).
            </p>
            <p>
              To the maximum extent permitted by law, MixMaster Studio shall not
              be liable for any indirect, incidental, special, consequential, or
              punitive damages arising from your use of our services.
            </p>
            <p>
              Our total liability for any claim arising from our services shall
              not exceed the amount you paid for the specific service giving rise
              to the claim.
            </p>
          </section>

          <section id="refunds">
            <h2 className="font-display text-2xl font-bold uppercase">
              8. Refunds &amp; Cancellations
            </h2>
            <p>
              You may cancel your order for a full refund if we have not yet
              begun work on your project. Once mixing or mastering has commenced,
              cancellations are handled on a case-by-case basis.
            </p>
            <p>
              If you are dissatisfied with the delivered mix after using your
              included revision, please contact us. We are committed to finding a
              resolution, which may include additional revisions or, in
              exceptional circumstances, a partial refund.
            </p>
          </section>

          <section id="modifications">
            <h2 className="font-display text-2xl font-bold uppercase">
              9. Modifications to These Terms
            </h2>
            <p>
              We reserve the right to update these Terms at any time. Changes will
              be posted on this page with an updated &quot;Last updated&quot;
              date. Continued use of our services after changes are posted
              constitutes acceptance of the revised Terms.
            </p>
            <p>
              We encourage you to review these Terms periodically for any updates.
            </p>
          </section>

          <section id="contact">
            <h2 className="font-display text-2xl font-bold uppercase">
              10. Contact
            </h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us:
            </p>
            <ul>
              <li>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:kalebmay18@gmail.com"
                  className="text-amber transition-colors hover:text-signal"
                >
                  kalebmay18@gmail.com
                </a>
              </li>
              <li>
                <strong>Website:</strong>{' '}
                <a
                  href="/"
                  className="text-amber transition-colors hover:text-signal"
                >
                  MixMaster Studio
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
