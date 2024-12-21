interface EmailTemplateProps {
    email: string;
    otp: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    email,
    otp,
}) => (
    <div
        style={{
            fontFamily: "Arial, sans-serif",
            maxWidth: "600px",
            margin: "0 auto",
        }}
    >
        <h2>Email Verification</h2>
        <p>Your verification code is:</p>
        <h1
            style={{
                backgroundColor: "#f0f0f0",
                padding: "10px",
                textAlign: "center",
                letterSpacing: "2px",
            }}
        >
            {otp}
        </h1>
        <p>This code will expire in 10 minutes.</p>
        <p style={{ color: "#666", fontSize: "12px" }}>
            This code was sent to {email}. If you didn't request this
            verification, please ignore this email.
        </p>
    </div>
);
