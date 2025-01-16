import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Acceptable Use Policy",
};

export default function AcceptableUsePolicy() {
    return (
        <div className="container mx-auto max-w-3xl min-h-screen py-10">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter">
                        Acceptable Use Policy
                    </h1>
                    <p className="text-muted-foreground">
                        Last updated: January 17, 2025
                    </p>
                </div>

                {/* Introduction */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Introduction</h2>
                    <p className="text-justify text-muted-foreground">
                        This Acceptable Use Policy ("Policy") outlines the terms
                        and conditions for using Airtheon, an AI-powered
                        second-brain application designed to help users store,
                        organize, and recall their digital memories. By
                        accessing or using Airtheon, you agree to comply with
                        this Policy. Failure to adhere to these terms may result
                        in suspension or termination of your account.
                    </p>
                </section>

                {/* User Roles */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">User Roles</h2>
                    <p className="text-justify text-muted-foreground">
                        Airtheon supports the following user roles:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>
                            <strong>Personal Users:</strong> Free-tier users can
                            create one Workplace with one member. Paid-tier
                            users can create multiple Workplaces under a single
                            account.
                        </li>
                        <li>
                            <strong>Workplace Members:</strong> Users can join a
                            Workplace without needing a paid account, but the
                            Workplace itself must be on a paid plan to add
                            multiple members.
                        </li>
                    </ul>
                    <p className="text-justify text-muted-foreground">
                        You are responsible for ensuring that your use of
                        Airtheon complies with the limitations of your user
                        role.
                    </p>
                </section>

                {/* Prohibited Content and Activities */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Prohibited Content and Activities
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        You agree not to use Airtheon to upload, store, or share
                        any content or engage in any activity that:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Violates any applicable laws or regulations.</li>
                        <li>
                            Contains illegal material, such as child
                            exploitation content or pirated software.
                        </li>
                        <li>
                            Promotes hate speech, discrimination, or violence
                            against individuals or groups.
                        </li>
                        <li>
                            Infringes on the intellectual property rights of
                            others (unless you have proper authorization).
                        </li>
                        <li>
                            Is abusive, harassing, or threatening to other users
                            or third parties.
                        </li>
                        <li>
                            Attempts to disrupt or interfere with the
                            functionality of Airtheon, including hacking,
                            phishing, or distributing malware.
                        </li>
                    </ul>
                    <p className="text-justify text-muted-foreground">
                        Airtheon reserves the right to block or remove any
                        content that violates this Policy.
                    </p>
                </section>

                {/* Third-Party Integrations */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Third-Party Integrations
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        Airtheon may integrate with third-party platforms, such
                        as Google Drive, Notion, and Gmail, to enhance
                        functionality. When using these integrations, you agree
                        to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>
                            Comply with the terms of service of the third-party
                            platform.
                        </li>
                        <li>
                            Not use the integration to upload or share
                            prohibited content.
                        </li>
                        <li>
                            Ensure that any content saved via integrations
                            (e.g., through the Google Chrome extension) complies
                            with this Policy.
                        </li>
                    </ul>
                    <p className="text-justify text-muted-foreground">
                        Airtheon is not responsible for the content or
                        functionality of third-party platforms.
                    </p>
                </section>

                {/* AI Usage */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">AI Usage</h2>
                    <p className="text-justify text-muted-foreground">
                        Airtheon uses AI to generate summaries, organize data,
                        and provide advanced search capabilities. When using
                        these features, you agree to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>
                            Not misuse the AI to generate harmful, misleading,
                            or illegal content.
                        </li>
                        <li>
                            Respect the limitations of your subscription tier
                            (e.g., free-tier users may have restricted AI
                            usage).
                        </li>
                        <li>
                            Acknowledge that AI-generated summaries are for
                            informational purposes only and may not always be
                            accurate.
                        </li>
                    </ul>
                </section>

                {/* Data Ownership and Access */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Data Ownership and Access
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        You retain ownership of all data uploaded to Airtheon.
                        However, by using our Services, you grant Airtheon a
                        non-exclusive, worldwide license to access, process, and
                        store your data for the purpose of providing and
                        improving our Services.
                    </p>
                </section>

                {/* Monitoring and Enforcement */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Monitoring and Enforcement
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        Airtheon reserves the right to monitor user activity to
                        ensure compliance with this Policy. If we detect any
                        violations, we may:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Block or remove prohibited content.</li>
                        <li>Suspend or terminate your account.</li>
                        <li>
                            Report illegal activities to the appropriate
                            authorities.
                        </li>
                    </ul>
                </section>

                {/* Business Use */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Business Use</h2>
                    <p className="text-justify text-muted-foreground">
                        If you use Airtheon for business or organizational
                        purposes, you agree to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>
                            Ensure that all Workplace members comply with this
                            Policy.
                        </li>
                        <li>
                            Not share sensitive or confidential information
                            without proper authorization.
                        </li>
                        <li>
                            Comply with any internal policies or regulations
                            applicable to your organization.
                        </li>
                    </ul>
                </section>

                {/* Reporting Violations */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Reporting Violations
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        If you encounter any content or activity that violates
                        this Policy, please report it to us immediately at{" "}
                        <strong>support@airtheon.com</strong>. We will
                        investigate all reports and take appropriate action.
                    </p>
                </section>

                {/* Changes to This Policy */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Changes to This Policy
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        We may update this Policy from time to time. We will
                        notify you of any changes by posting the updated Policy
                        on our platform. Your continued use of Airtheon after
                        such changes constitutes your acceptance of the revised
                        Policy.
                    </p>
                </section>

                {/* Contact Information */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Contact Information
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        If you have any questions or concerns about this Policy,
                        please contact us at:
                    </p>
                    <p className="text-muted-foreground">
                        Email: support@airtheon.com
                    </p>
                </section>
            </div>
        </div>
    );
}
