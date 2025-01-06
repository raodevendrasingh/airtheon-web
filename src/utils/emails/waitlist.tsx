import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";
import * as React from "react";

export default function WaitlistTemplate() {
    return (
        <Html>
            <Head />
            <Preview>Your spot on our waitlist is confirmed! 🎉</Preview>
            <Tailwind>
                <Body className="bg-gray-50 py-16">
                    <Container className="bg-white border border-gray-200 rounded-lg mx-auto p-10 max-w-2xl">
                        {/* Logo Section */}
                        <Section className="mb-8">
                            <Text className="text-4xl font-bold text-center text-black tracking-tight">
                                Airtheon
                            </Text>
                        </Section>

                        {/* Main Heading */}
                        <Heading className="text-2xl font-semibold text-gray-800 text-center my-6">
                            You're on the list! 🎉
                        </Heading>

                        {/* Main Content */}
                        <Text className="text-gray-600 text-base leading-relaxed my-6">
                            Thank you for joining our waitlist! We're thrilled
                            to have you as part of our growing community.
                        </Text>

                        <Text className="text-gray-600 text-base leading-relaxed my-6">
                            We're working hard to create something special and
                            you'll be among the first to know when we launch.
                            We'll keep you updated on our progress and let you
                            know when it's your turn to join.
                        </Text>

                        {/* CTA Button */}
                        <Section className="text-center my-8">
                            <Button
                                href="https://airtheon.com"
                                className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold inline-block transition-colors duration-200"
                            >
                                Visit Our Website
                            </Button>
                        </Section>

                        {/* Footer */}
                        <Section className="mt-12 pt-8 border-t border-gray-200">
                            <Text className="text-gray-500 text-sm text-center leading-relaxed">
                                © {new Date().getFullYear()} Airtheon. All
                                rights reserved.
                                <br />
                                <br />
                                If you didn't sign up for our waitlist, you can
                                safely ignore this email.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
