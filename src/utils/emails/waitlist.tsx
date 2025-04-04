export function renderWaitlistEmail() {
    const currentYear = new Date().getFullYear();

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your spot on our waitlist is confirmed! 🎉</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            color-scheme: light dark;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.5;
            color: #374151;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
            box-sizing: border-box;
        }

        .logo-container {
            width: 100%;
            text-align: center;
            margin-bottom: 32px;
        }

        .logo {
            display: none;
            margin: 0 auto;
            width: 150px;
            height: auto;
        }

        /* Light mode (default) */
        .logo-light { display: none; }
        .logo-dark { display: block; }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
            .logo-light { display: block !important; }
            .logo-dark { display: none !important; }
        }

        h1 {
            font-size: 24px;
            font-weight: 700;
            text-align: center;
            color: #1f2937;
            margin: 32px 0;
            font-family: 'Outfit', sans-serif;
        }

        p {
            margin: 16px 0;
            font-size: 16px;
            text-align: justify;
            font-family: 'Outfit', sans-serif;
        }

        .social-section {
            text-align: center;
            margin: 32px 0;
        }

        .social-heading {
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 16px;
            font-family: 'Outfit', sans-serif;
        }

        .social-button {
            display: inline-flex;
            align-items: center;
            background-color: #000000;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 700;
            font-family: 'Outfit', sans-serif;
        }

        .social-button img {
            margin-right: 8px;
        }

        hr {
            border: none;
            border-top: 1px solid #e5e7eb;
            margin: 24px 0;
        }

        .footer-text {
            font-size: 12px;
            color: #6b7280;
            text-align: center;
            margin: 8px 0;
            font-family: 'Outfit', sans-serif;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo-container">
            <img
                src="https://pub-c7f630de23c6485897d72216233130eb.r2.dev/brand-assets/airtheon-logo-wordmark/airtheon-light-wordmark.png"
                alt="Airtheon"
                class="logo logo-light"
            />
            <img
                src="https://pub-c7f630de23c6485897d72216233130eb.r2.dev/brand-assets/airtheon-logo-wordmark/airtheon-dark-wordmark.png"
                alt="Airtheon"
                class="logo logo-dark"
            />
        </div>

        <h1>You're on the list! 🎉</h1>

        <p>
            Thank you for joining our waitlist! We're thrilled to have you as part of our growing community.
        </p>

        <p>
            We're working hard to create something special and you'll be among the first to know when we launch.
            We'll keep you updated on our progress and let you know when it's your turn to join.
        </p>

        <p>
            While you wait, why not stay updated with our latest news and announcements?
        </p>

        <div class="social-section">
            <p class="social-heading">Follow us for updates:</p>
            <a href="https://x.com/airtheonlabs" target="_blank" class="social-button">
                <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/031/737/206/small_2x/twitter-new-logo-twitter-icons-new-twitter-logo-x-2023-x-social-media-icon-free-png.png"
                    width="20"
                    height="20"
                    alt="X logo"
                />
                @airtheonlabs
            </a>
        </div>

        <hr />

        <p class="footer-text">
            If you didn't sign up for the Airtheon waitlist, please disregard this email.
        </p>

        <p class="footer-text">
            © ${currentYear} Airtheon. All rights reserved.
        </p>
    </div>
</body>
</html>`;
}
