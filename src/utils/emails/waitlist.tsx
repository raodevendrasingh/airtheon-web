import {
    Body,
    Link,
    Hr,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Img,
    Tailwind,
    Text,
} from "@react-email/components";

export default function WaitlistTemplate() {
    return (
        <Html>
            <Head>
                <style>{`
             @media (prefers-color-scheme: dark) {
               .logo-light { display: none !important; }
               .logo-dark { display: block !important; }
             }
             @media (prefers-color-scheme: light) {
               .logo-light { display: block !important; }
               .logo-dark { display: none !important; }
             }
           `}</style>
            </Head>
            <Preview>Your spot on our waitlist is confirmed! 🎉</Preview>
            <Tailwind>
                <Body className="bg-white font-sans">
                    <Container className="mx-auto px-5 py-10">
                        <Img
                            src="https://pub-c7f630de23c6485897d72216233130eb.r2.dev/brand-assets/airtheon-logo-wordmark/airtheon-light-wordmark.png"
                            width="150"
                            height="auto"
                            alt="Airtheon"
                            className="logo-light mx-auto hidden"
                        />
                        <Img
                            src="https://pub-c7f630de23c6485897d72216233130eb.r2.dev/brand-assets/airtheon-logo-wordmark/airtheon-dark-wordmark.png"
                            width="150"
                            height="auto"
                            alt="Airtheon"
                            className="logo-dark mx-auto"
                        />
                        <Heading className="text-2xl font-bold text-center text-gray-800 my-8">
                            You're on the list! 🎉
                        </Heading>
                        <Text className="text-base text-gray-700 leading-6 text-justify">
                            Thank you for joining our waitlist! We're thrilled
                            to have you as part of our growing community.
                        </Text>
                        <Text className="text-base text-gray-700 text-justify leading-6">
                            We're working hard to create something special and
                            you'll be among the first to know when we launch.
                            We'll keep you updated on our progress and let you
                            know when it's your turn to join.
                        </Text>
                        <Text className="text-base text-gray-700 leading-6 text-justify">
                            While you wait, why not stay updated with our latest
                            news and announcements?
                        </Text>
                        <Section className="text-center mt-8">
                            <Text className="text-base font-bold text-gray-800 mb-4">
                                Follow us for updates:
                            </Text>
                            <table
                                style={{ margin: "0 auto" }}
                                cellPadding="0"
                                cellSpacing="0"
                                border={0}
                            >
                                <tr>
                                    <td>
                                        <Link
                                            href="https://x.com/airtheonlabs"
                                            target="_blank"
                                            style={{
                                                backgroundColor: "#000000",
                                                borderRadius: "12px",
                                                color: "#ffffff",
                                                display: "inline-block",
                                                fontFamily: "sans-serif",
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                padding: "12px 24px",
                                                textDecoration: "none",
                                                textAlign: "center",
                                            }}
                                        >
                                            <table
                                                cellPadding="0"
                                                cellSpacing="0"
                                                border={0}
                                            >
                                                <tr>
                                                    <td
                                                        style={{
                                                            verticalAlign:
                                                                "middle",
                                                        }}
                                                    >
                                                        <Img
                                                            src="https://static.vecteezy.com/system/resources/thumbnails/031/737/206/small_2x/twitter-new-logo-twitter-icons-new-twitter-logo-x-2023-x-social-media-icon-free-png.png"
                                                            width="40"
                                                            height="40"
                                                            alt="X logo"
                                                            style={{
                                                                display:
                                                                    "block",
                                                                marginRight:
                                                                    "8px",
                                                            }}
                                                        />
                                                    </td>
                                                    <td
                                                        style={{
                                                            verticalAlign:
                                                                "middle",
                                                        }}
                                                    >
                                                        @airtheonlabs
                                                    </td>
                                                </tr>
                                            </table>
                                        </Link>
                                    </td>
                                </tr>
                            </table>
                        </Section>
                        <Hr className="border-gray-300 my-6" />
                        <Text className="text-xs text-center text-gray-500 leading-5">
                            If you didn't sign up for the Airtheon waitlist,
                            please disregard this email.
                        </Text>
                        <Text className="text-xs text-gray-500 leading-5 text-center mt-6">
                            © {new Date().getFullYear()} Airtheon. All rights
                            reserved.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
