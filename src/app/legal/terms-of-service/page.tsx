import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service",
};

export default function TermsOfService() {
    return (
        <div className="container mx-auto max-w-3xl min-h-screen py-10">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter">
                        Terms of Service
                    </h1>
                    <p className="text-muted-foreground">
                        Last updated: January 17, 2025
                    </p>
                </div>

                {/* Introduction */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Introduction</h2>
                    <p className="text-justify text-muted-foreground">
                        Welcome to Airtheon ("we," "our," or "us"). These Terms
                        of Service ("Terms") govern your access to and use of
                        our AI-powered memory management and retrieval services
                        ("Services"), available through our platform. By
                        accessing or using our Services, you agree to comply
                        with and be bound by these Terms. If you do not agree to
                        these Terms, you must not use our Services.
                    </p>
                    <p className="text-justify text-muted-foreground">
                        Airtheon provides a unique AI-driven platform designed
                        to assist users in managing and retrieving memories,
                        information, and data efficiently. Our Services are
                        intended for personal and business use, subject to the
                        terms and conditions outlined herein.
                    </p>
                </section>

                {/* Eligibility */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Eligibility</h2>
                    <p className="text-justify text-muted-foreground">
                        To use our Services, you must meet the following
                        criteria:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>
                            Be at least 16 years old or the age of majority in
                            your jurisdiction.
                        </li>
                        <li>
                            Have the legal capacity to enter into a binding
                            agreement.
                        </li>
                        <li>
                            Comply with all applicable laws and regulations in
                            your jurisdiction.
                        </li>
                        <li>
                            Not be prohibited from receiving our Services under
                            any applicable laws or regulations.
                        </li>
                    </ul>
                    <p className="text-justify text-muted-foreground">
                        By using our Services, you represent and warrant that
                        you meet all eligibility requirements. If you do not
                        meet these requirements, you must not access or use our
                        Services.
                    </p>
                </section>

                {/* Account Registration */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Account Registration
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        To access certain features of our Services, you may be
                        required to create an account. During registration, you
                        agree to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>
                            Provide accurate, current, and complete information.
                        </li>
                        <li>
                            Maintain and promptly update your account
                            information to keep it accurate, current, and
                            complete.
                        </li>
                        <li>
                            Protect your account credentials and notify us
                            immediately of any unauthorized access or breach of
                            security.
                        </li>
                        <li>
                            Accept responsibility for all activities that occur
                            under your account.
                        </li>
                    </ul>
                    <p className="text-justify text-muted-foreground">
                        We reserve the right to suspend or terminate your
                        account if any information provided during registration
                        is found to be inaccurate, incomplete, or misleading.
                    </p>
                </section>

                {/* User Responsibilities */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        User Responsibilities
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        By using our Services, you agree to the following
                        responsibilities:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>
                            Use our Services only for lawful purposes and in
                            compliance with these Terms.
                        </li>
                        <li>
                            Not engage in any activity that interferes with or
                            disrupts the functionality of our Services.
                        </li>
                        <li>
                            Not attempt to gain unauthorized access to our
                            systems, networks, or other users' accounts.
                        </li>
                        <li>
                            Not upload, share, or transmit any content that is
                            illegal, harmful, defamatory, or infringes on the
                            rights of others.
                        </li>
                        <li>
                            Not use our Services to create or distribute spam,
                            malware, or other harmful content.
                        </li>
                        <li>
                            Not reverse-engineer, decompile, or disassemble any
                            part of our Services.
                        </li>
                    </ul>
                    <p className="text-justify text-muted-foreground">
                        Violation of these responsibilities may result in
                        immediate termination of your access to our Services and
                        legal action, if necessary.
                    </p>
                </section>

                {/* Intellectual Property */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Intellectual Property
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        All content, trademarks, logos, software, and other
                        intellectual property associated with Airtheon are the
                        property of Airtheon or its licensors. You are granted a
                        limited, non-exclusive, non-transferable license to use
                        our Services for personal or business purposes. This
                        license does not permit you to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>
                            Reproduce, distribute, or create derivative works of
                            our intellectual property without prior written
                            consent.
                        </li>
                        <li>
                            Use our intellectual property for commercial
                            purposes without a separate agreement.
                        </li>
                        <li>
                            Remove or alter any copyright, trademark, or
                            proprietary notices from our content.
                        </li>
                    </ul>
                    <p className="text-justify text-muted-foreground">
                        Any unauthorized use of our intellectual property may
                        result in legal action and termination of your access to
                        our Services.
                    </p>
                </section>

                {/* User-Generated Content */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        User-Generated Content
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        Our Services may allow you to upload, share, or transmit
                        content ("User-Generated Content"). By submitting
                        User-Generated Content, you grant Airtheon a worldwide,
                        non-exclusive, royalty-free license to use, reproduce,
                        modify, and distribute your content for the purpose of
                        providing and improving our Services.
                    </p>
                    <p className="text-justify text-muted-foreground">
                        You represent and warrant that:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>
                            You own or have the necessary rights to submit
                            User-Generated Content.
                        </li>
                        <li>
                            Your content does not infringe on the rights of any
                            third party.
                        </li>
                        <li>
                            Your content complies with all applicable laws and
                            regulations.
                        </li>
                    </ul>
                    <p className="text-justify text-muted-foreground">
                        We reserve the right to remove or disable access to any
                        User-Generated Content that violates these Terms or is
                        otherwise objectionable.
                    </p>
                </section>

                {/* Limitation of Liability */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Limitation of Liability
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        To the fullest extent permitted by law, Airtheon shall
                        not be liable for any indirect, incidental, special,
                        consequential, or punitive damages, including but not
                        limited to loss of profits, data, or use, arising out of
                        or related to your use of our Services. Our total
                        liability for any claim arising under these Terms shall
                        not exceed the amount you paid to us, if any, for
                        accessing our Services.
                    </p>
                    <p className="text-justify text-muted-foreground">
                        This limitation of liability applies regardless of the
                        legal theory on which the claim is based, including
                        negligence, breach of contract, or any other cause of
                        action.
                    </p>
                </section>

                {/* Indemnification */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Indemnification</h2>
                    <p className="text-justify text-muted-foreground">
                        You agree to indemnify, defend, and hold harmless
                        Airtheon, its affiliates, and their respective officers,
                        directors, employees, and agents from and against any
                        claims, liabilities, damages, losses, and expenses,
                        including reasonable attorneys' fees, arising out of or
                        related to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Your use of our Services.</li>
                        <li>Your violation of these Terms.</li>
                        <li>Your infringement of any third-party rights.</li>
                    </ul>
                </section>

                {/* Termination */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Termination</h2>
                    <p className="text-justify text-muted-foreground">
                        We reserve the right to suspend or terminate your access
                        to our Services at any time, with or without notice, for
                        any reason, including but not limited to a violation of
                        these Terms. Upon termination, your right to use our
                        Services will immediately cease.
                    </p>
                    <p className="text-justify text-muted-foreground">
                        You may also terminate your account at any time by
                        contacting us at support@airtheon.com. Upon termination,
                        all provisions of these Terms that by their nature
                        should survive will remain in effect, including but not
                        limited to intellectual property rights, disclaimers,
                        and limitations of liability.
                    </p>
                </section>

                {/* Governing Law */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Governing Law</h2>
                    <p className="text-justify text-muted-foreground">
                        These Terms shall be governed by and construed in
                        accordance with the laws of India, without regard to its
                        conflict of law principles. Any disputes arising under
                        these Terms shall be subject to the exclusive
                        jurisdiction of the courts located in India.
                    </p>
                </section>

                {/* Dispute Resolution */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Dispute Resolution
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        In the event of any dispute arising out of or related to
                        these Terms, you agree to first attempt to resolve the
                        dispute informally by contacting us at
                        support@airtheon.com. If the dispute cannot be resolved
                        informally, it shall be resolved through binding
                        arbitration in accordance with the Arbitration and
                        Conciliation Act, 1996.
                    </p>
                    <p className="text-justify text-muted-foreground">
                        The arbitration shall be conducted in English and shall
                        take place in New Delhi, India. The decision of the
                        arbitrator shall be final and binding on both parties.
                    </p>
                </section>

                {/* Changes to Terms */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Changes to Terms</h2>
                    <p className="text-justify text-muted-foreground">
                        We reserve the right to modify or update these Terms at
                        any time. We will notify you of any changes by posting
                        the updated Terms on our platform. Your continued use of
                        our Services after such changes constitutes your
                        acceptance of the revised Terms.
                    </p>
                    <p className="text-justify text-muted-foreground">
                        If you do not agree to the revised Terms, you must
                        discontinue using our Services immediately.
                    </p>
                </section>

                {/* Contact Information */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Contact Information
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        If you have any questions or concerns about these Terms,
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
