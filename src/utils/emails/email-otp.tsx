export function renderOTPEmail(email: string, otp: string) {
    const currentYear = new Date().getFullYear();
    const username = email.split("@")[0];

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify your email address</title>
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

        h2 {
            font-size: 28px;
            font-weight: 700;
            text-align: center;
            color: #1f2937;
            margin: 24px 0;
            font-family: 'Outfit', sans-serif;
        }

        p {
            margin: 16px 0;
            font-size: 16px;
            text-align: center;
            font-family: 'Outfit', sans-serif;
            color: #374151;
        }

        .otp-container {
            background-color: #f3f4f6;
            border-radius: 12px;
            padding: 24px;
            margin: 24px 0;
            text-align: center;
        }

        .otp-code {
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 4px;
            color: #1f2937;
            margin: 0;
            font-family: 'Outfit', sans-serif;
        }

        .footer-text {
            font-size: 12px;
            color: #6b7280;
            text-align: center;
            margin: 24px 0 8px 0;
            font-family: 'Outfit', sans-serif;
        }

        hr {
            border: none;
            border-top: 1px solid #e5e7eb;
            margin: 24px 0;
        }

        @media (prefers-color-scheme: dark) {
            .otp-container {
                background-color: #374151;
            }

            .otp-code {
                color: #f3f4f6;
            }
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

        <h2>Hi ${username},</h2>

        <p>Thank you for choosing Airtheon! To complete your sign-up, please verify your email address using the code below:</p>

        <div class="otp-container">
            <div class="otp-code">${otp}</div>
        </div>

        <p>This code will expire in <strong>10 minutes</strong>.</p>

        <p>If you didn't request this verification, please ignore this email.</p>

        <hr />

        <p class="footer-text">
            This email was sent to <strong>${email}</strong>.
        </p>

        <p class="footer-text">
            <a href="https://help.airtheon.com/legal/terms-of-service" target="_blank">Terms of Service</a> |
            <a href="https://help.airtheon.com/legal/privacy-policy" target="_blank">Privacy Policy</a>
        </p>

        <p class="footer-text">
            © ${currentYear} Airtheon. All rights reserved.
        </p>
    </div>
</body>
</html>`;
}
