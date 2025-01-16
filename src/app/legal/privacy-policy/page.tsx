import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
};

export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto max-w-3xl min-h-screen py-10">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter">
                        Privacy Policy
                    </h1>
                    <p className="text-muted-foreground">
                        Last updated: January 17, 2025
                    </p>
                </div>

                {/* Introduction */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Introduction</h2>
                    <p className="text-justify text-muted-foreground">
                        Welcome to Airtheon ("we," "our," or "us"). We are
                        committed to protecting your privacy and ensuring the
                        security of your personal information. This Privacy
                        Policy explains how we collect, use, disclose, and
                        safeguard your information when you use our AI-powered
                        memory management and retrieval services ("Services").
                    </p>
                    <p className="text-justify text-muted-foreground">
                        By accessing or using our Services, you agree to the
                        terms of this Privacy Policy. If you do not agree with
                        the terms of this Privacy Policy, you must not use our
                        Services.
                    </p>
                </section>

                {/* Information We Collect */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Information We Collect
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        We may collect the following types of information when
                        you use our Services:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>
                            <strong>Personal Information:</strong> Name, email
                            address, and other identifiers you provide during
                            account registration or while using our Services.
                        </li>
                        <li>
                            <strong>Usage Data:</strong> Information about how
                            you interact with our Services, including IP
                            address, device type, browser type, pages visited,
                            and timestamps.
                        </li>
                        <li>
                            <strong>Cookies and Tracking Technologies:</strong>{" "}
                            We use cookies, web beacons, and similar
                            technologies to collect information about your
                            browsing behavior and preferences.
                        </li>
                        <li>
                            <strong>User-Generated Content:</strong> Any content
                            you upload, share, or transmit through our Services,
                            such as notes, reminders, or other data.
                        </li>
                    </ul>
                    <p className="text-justify text-muted-foreground">
                        We collect this information to provide, improve, and
                        personalize our Services, as well as to comply with
                        legal obligations.
                    </p>
                </section>

                {/* How We Use Your Information */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        How We Use Your Information
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        We use the information we collect for the following
                        purposes:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>To provide, operate, and maintain our Services.</li>
                        <li>
                            To improve, personalize, and enhance your experience
                            with our Services.
                        </li>
                        <li>
                            To communicate with you, including sending
                            service-related notifications, updates, and
                            promotional materials.
                        </li>
                        <li>
                            To analyze usage trends and monitor the
                            effectiveness of our Services.
                        </li>
                        <li>
                            To detect, prevent, and address technical issues or
                            fraudulent activities.
                        </li>
                        <li>
                            To comply with legal obligations and enforce our
                            policies.
                        </li>
                    </ul>
                </section>

                {/* How We Share Your Information */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        How We Share Your Information
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        We may share your information in the following
                        circumstances:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>
                            <strong>With Service Providers:</strong> We may
                            share your information with third-party service
                            providers who assist us in delivering our Services,
                            such as hosting, analytics, and customer support.
                        </li>
                        <li>
                            <strong>For Legal Compliance:</strong> We may
                            disclose your information if required by law,
                            regulation, or legal process, or to protect our
                            rights, property, or safety.
                        </li>
                        <li>
                            <strong>With Your Consent:</strong> We may share
                            your information with third parties if you provide
                            explicit consent for such sharing.
                        </li>
                        <li>
                            <strong>During Business Transfers:</strong> In the
                            event of a merger, acquisition, or sale of assets,
                            your information may be transferred to the new owner
                            as part of the transaction.
                        </li>
                    </ul>
                    <p className="text-justify text-muted-foreground">
                        We do not sell your personal information to third
                        parties for marketing purposes.
                    </p>
                </section>

                {/* Data Security */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Data Security</h2>
                    <p className="text-justify text-muted-foreground">
                        We implement industry-standard security measures to
                        protect your information from unauthorized access,
                        alteration, disclosure, or destruction. These measures
                        include:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Encryption of data in transit and at rest.</li>
                        <li>
                            Regular security audits and vulnerability
                            assessments.
                        </li>
                        <li>
                            Access controls to limit who can access your
                            information.
                        </li>
                    </ul>
                    <p className="text-justify text-muted-foreground">
                        Despite our efforts, no method of transmission over the
                        internet or electronic storage is completely secure.
                        Therefore, we cannot guarantee absolute security of your
                        information.
                    </p>
                </section>

                {/* Data Retention */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Data Retention</h2>
                    <p className="text-justify text-muted-foreground">
                        We retain your information only for as long as necessary
                        to fulfill the purposes outlined in this Privacy Policy,
                        unless a longer retention period is required or
                        permitted by law. Factors influencing retention periods
                        include:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>The duration of your use of our Services.</li>
                        <li>
                            Legal obligations to retain data for specific
                            periods.
                        </li>
                        <li>
                            The need to resolve disputes or enforce our
                            policies.
                        </li>
                    </ul>
                    <p className="text-justify text-muted-foreground">
                        Once your information is no longer needed, we will
                        securely delete or anonymize it.
                    </p>
                </section>

                {/* Your Rights */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Your Rights</h2>
                    <p className="text-justify text-muted-foreground">
                        Depending on your jurisdiction, you may have the
                        following rights regarding your personal information:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>
                            <strong>Access:</strong> Request a copy of the
                            personal information we hold about you.
                        </li>
                        <li>
                            <strong>Correction:</strong> Request correction of
                            inaccurate or incomplete information.
                        </li>
                        <li>
                            <strong>Deletion:</strong> Request deletion of your
                            personal information, subject to legal requirements.
                        </li>
                        <li>
                            <strong>Objection:</strong> Object to the processing
                            of your personal information for specific purposes.
                        </li>
                        <li>
                            <strong>Data Portability:</strong> Request a
                            transfer of your personal information to another
                            service provider.
                        </li>
                    </ul>
                    <p className="text-justify text-muted-foreground">
                        To exercise these rights, please contact us at
                        support@airtheon.com. We will respond to your request
                        within 30 days, subject to applicable laws.
                    </p>
                </section>

                {/* Third-Party Links */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Third-Party Links
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        Our Services may contain links to third-party websites
                        or services that are not operated by us. We are not
                        responsible for the privacy practices or content of
                        these third parties. We encourage you to review the
                        privacy policies of any third-party websites or services
                        you visit.
                    </p>
                </section>

                {/* Children's Privacy */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Children's Privacy
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        Our Services are not intended for individuals under the
                        age of 18. We do not knowingly collect personal
                        information from children. If we become aware that we
                        have collected personal information from a child without
                        parental consent, we will take steps to delete such
                        information.
                    </p>
                </section>

                {/* Changes to This Privacy Policy */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Changes to This Privacy Policy
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        We may update this Privacy Policy from time to time. We
                        will notify you of any changes by posting the updated
                        Privacy Policy on our platform. Your continued use of
                        our Services after such changes constitutes your
                        acceptance of the revised Privacy Policy.
                    </p>
                </section>

                {/* Contact Information */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Contact Information
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        If you have any questions or concerns about this Privacy
                        Policy, please contact us at:
                    </p>
                    <p className="text-muted-foreground">
                        Email: support@airtheon.com
                    </p>
                </section>
            </div>
        </div>
    );
}
