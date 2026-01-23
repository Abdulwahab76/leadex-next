
export const metadata = {
    title: "BodenLink Terms & Conditions",
    description:
        "Read BodenLink's Terms & Conditions for product use, website access, and legal guidelines.",
};

export default function TermsPage() {
    return (
        <section
            aria-labelledby="terms-heading"
            className="min-h-full wrapper py-10"
        >
            <div className="mb-6">
                <h1 id="terms-heading" className="text-2xl font-medium">
                    Terms & Conditions
                </h1>
            </div>

            <article className="w-full space-y-4 text-sm text-gray-700">
                <p>Effective Date: January 23, 2026</p>
                <p>
                    By accessing or using BodenLink’s website and services, you agree to
                    comply with these Terms & Conditions. If you do not agree, please do
                    not use our services.
                </p>

                <h2 className="font-medium mt-4">1. Use of Our Website</h2>
                <p>
                    You may use our website only for lawful purposes. You must not
                    interfere with or disrupt the website’s operation or its security.
                </p>

                <h2 className="font-medium mt-4">2. Intellectual Property</h2>
                <p>
                    All content, products, and materials on this website are owned by
                    BodenLink and protected by copyright, trademark, and other laws.
                </p>

                <h2 className="font-medium mt-4">3. Product Information</h2>
                <p>
                    We aim to provide accurate product descriptions. However, we do not
                    guarantee that all content is complete, current, or error-free.
                </p>

                <h2 className="font-medium mt-4">4. Limitation of Liability</h2>
                <p>
                    BodenLink is not liable for damages arising from use of our products
                    or website, except where required by law.
                </p>

                <h2 className="font-medium mt-4">5. Changes to Terms</h2>
                <p>
                    We may update these Terms & Conditions at any time. The updated
                    version will be posted on this page with a revised effective date.
                </p>

                <h2 className="font-medium mt-4">6. Contact</h2>
                <p>
                    For questions, contact us at <strong>support@bodenlink.com</strong>.
                </p>
            </article>
        </section>
    );
}
