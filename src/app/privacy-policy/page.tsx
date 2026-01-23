
export const metadata = {
    title: "BodenLink Privacy Policy",
    description:
        "Learn how BodenLink collects, uses, and protects your personal data. Transparency and security for professional roofing solutions.",
};

export default function PrivacyPolicyPage() {
    return (
        <section
            aria-labelledby="privacy-policy-heading"
            className="min-h-full wrapper py-10"
        >
            <div className="mb-6">
                <h1 id="privacy-policy-heading" className="text-2xl font-medium">
                    Privacy Policy
                </h1>
            </div>

            <article className="w-full space-y-4 text-sm text-gray-700">
                <p>Effective Date: January 23, 2026</p>
                <p>
                    BodenLink (“we,” “our,” or “us”) is committed to protecting your
                    privacy. This Privacy Policy explains how we collect, use, and
                    safeguard your information when you visit our website or use our
                    products and services.
                </p>

                <h2 className="font-medium mt-4">1. Information We Collect</h2>
                <ul className="list-disc pl-5 space-y-2">
                    <li>
                        <strong>Personal Information:</strong> Name, email address, phone
                        number, and company details when you contact us or register for
                        updates.
                    </li>
                    <li>
                        <strong>Technical Data:</strong> IP address, browser type,
                        operating system, and website usage analytics.
                    </li>
                    <li>
                        <strong>Transactional Data:</strong> Details of inquiries, product
                        orders, and communication with our support team.
                    </li>
                </ul>

                <h2 className="font-medium mt-4">2. How We Use Your Information</h2>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Responding to inquiries and requests.</li>
                    <li>Providing updates, newsletters, and promotional materials.</li>
                    <li>Improving our products, services, and website.</li>
                </ul>

                <h2 className="font-medium mt-4">3. Data Protection</h2>
                <p>
                    We implement appropriate security measures to protect your data from
                    unauthorized access, alteration, or disclosure.
                </p>

                <h2 className="font-medium mt-4">4. Sharing Information</h2>
                <p>
                    We do not sell or rent your personal information. We may share
                    information with trusted partners to provide services on our behalf.
                </p>

                <h2 className="font-medium mt-4">5. Your Rights</h2>
                <p>
                    You may request access, correction, or deletion of your personal
                    information by contacting us at <strong>privacy@bodenlink.com</strong>.
                </p>
            </article>
        </section>
    );
}
