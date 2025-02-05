import { BackButton } from "@/components/back-button";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Refund Policy",
};

export default function RefundPolicy() {
    return (
        <div className="container mx-auto max-w-3xl min-h-screen py-10">
            <div className="space-y-8">
                <main className="flex justify-between">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tighter">
                            Refund Policy
                        </h1>
                        <p className="text-muted-foreground">
                            Last updated: January 17, 2025
                        </p>
                    </div>
                    <BackButton />
                </main>

                {/* Introduction */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Introduction</h2>
                    <p className="text-justify text-muted-foreground">
                        At Airtheon, we strive to provide high-quality
                        AI-powered memory management and retrieval services
                        ("Services") to our users. This Refund Policy outlines
                        the terms and conditions under which refunds may be
                        issued for purchases made through our platform. By using
                        our Services, you agree to the terms of this Refund
                        Policy.
                    </p>
                </section>

                {/* Eligibility for Refunds */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Eligibility for Refunds
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        Refunds may be issued under the following circumstances:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>
                            <strong>Service Unavailability:</strong> If our
                            Services are unavailable for an extended period due
                            to technical issues on our end.
                        </li>
                        <li>
                            <strong>Duplicate Charges:</strong> If you are
                            accidentally charged multiple times for the same
                            service.
                        </li>
                        <li>
                            <strong>Unauthorized Transactions:</strong> If a
                            charge is made without your authorization.
                        </li>
                        <li>
                            <strong>Dissatisfaction:</strong> If you are
                            dissatisfied with our Services and request a refund
                            within the specified refund period (see below).
                        </li>
                    </ul>
                    <p className="text-justify text-muted-foreground">
                        Refunds are subject to the terms and conditions outlined
                        in this policy.
                    </p>
                </section>

                {/* Refund Period */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Refund Period</h2>
                    <p className="text-justify text-muted-foreground">
                        To be eligible for a refund, you must submit a refund
                        request within <strong>14 days</strong> of the purchase
                        date. Refund requests submitted after this period will
                        not be considered.
                    </p>
                </section>

                {/* Non-Refundable Items */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Non-Refundable Items
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        The following items are non-refundable:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>
                            Services that have been fully utilized or accessed
                            beyond a trial period.
                        </li>
                        <li>
                            Promotional or discounted purchases, unless
                            otherwise stated.
                        </li>
                        <li>
                            Charges related to third-party services or
                            integrations.
                        </li>
                    </ul>
                </section>

                {/* Refund Process */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Refund Process</h2>
                    <p className="text-justify text-muted-foreground">
                        To request a refund, please follow these steps:
                    </p>
                    <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                        <li>
                            Contact our support team at{" "}
                            <strong>support@airtheon.com</strong> with your
                            purchase details and reason for the refund request.
                        </li>
                        <li>
                            Provide any necessary documentation, such as proof
                            of purchase or transaction details.
                        </li>
                        <li>
                            Wait for our team to review your request. We will
                            respond within <strong>7 business days</strong>.
                        </li>
                    </ol>
                    <p className="text-justify text-muted-foreground">
                        If your refund request is approved, the refund will be
                        processed within <strong>14 business days</strong>. The
                        refund will be issued to the original payment method
                        used during the purchase.
                    </p>
                </section>

                {/* Partial Refunds */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Partial Refunds</h2>
                    <p className="text-justify text-muted-foreground">
                        In some cases, we may issue a partial refund if:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>
                            Only a portion of the Services was used or accessed.
                        </li>
                        <li>
                            The issue reported affects only a specific feature
                            or component of the Services.
                        </li>
                    </ul>
                    <p className="text-justify text-muted-foreground">
                        The amount refunded will be determined at our discretion
                        based on the circumstances of the request.
                    </p>
                </section>

                {/* Refund Denials */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Refund Denials</h2>
                    <p className="text-justify text-muted-foreground">
                        We reserve the right to deny refund requests in the
                        following situations:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>
                            The refund request is submitted after the refund
                            period has expired.
                        </li>
                        <li>
                            The Services were fully utilized or accessed beyond
                            a trial period.
                        </li>
                        <li>
                            The request is fraudulent or violates our Terms of
                            Service.
                        </li>
                    </ul>
                    <p className="text-justify text-muted-foreground">
                        If your refund request is denied, we will provide a
                        detailed explanation for the decision.
                    </p>
                </section>

                {/* Disputes and Chargebacks */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Disputes and Chargebacks
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        If you dispute a charge or initiate a chargeback with
                        your payment provider, we may suspend or terminate your
                        access to our Services until the dispute is resolved. We
                        encourage you to contact us directly at{" "}
                        <strong>support@airtheon.com</strong> to resolve any
                        issues before initiating a chargeback.
                    </p>
                </section>

                {/* Changes to This Refund Policy */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Changes to This Refund Policy
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        We may update this Refund Policy from time to time. We
                        will notify you of any changes by posting the updated
                        Refund Policy on our platform. Your continued use of our
                        Services after such changes constitutes your acceptance
                        of the revised Refund Policy.
                    </p>
                </section>

                {/* Contact Information */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                        Contact Information
                    </h2>
                    <p className="text-justify text-muted-foreground">
                        If you have any questions or concerns about this Refund
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
