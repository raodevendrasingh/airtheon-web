// aws-signer.ts
export async function signAWSRequest({
    method,
    url,
    region,
    service,
    body,
    accessKeyId,
    secretAccessKey,
}: {
    method: string;
    url: string;
    region: string;
    service: string;
    body: string;
    accessKeyId: string;
    secretAccessKey: string;
}) {
    const date =
        new Date()
            .toISOString()
            .replace(/[:-]|\.\d{3}/g, "")
            .substring(0, 8) +
        "T" +
        new Date()
            .toISOString()
            .split("T")[1]
            .replace(/[:-]|\.\d{3}/g, "")
            .substring(0, 6) +
        "Z";
    const shortDate = date.substring(0, 8);

    const payloadHash = await sha256(body);
    const canonicalRequest = [
        method,
        "/",
        "",
        `content-type:application/x-www-form-urlencoded; charset=utf-8`,
        `host:email.${region}.amazonaws.com`,
        `x-amz-date:${date}`,
        "",
        "content-type;host;x-amz-date",
        payloadHash,
    ].join("\n");

    const stringToSign = [
        "AWS4-HMAC-SHA256",
        date,
        `${shortDate}/${region}/${service}/aws4_request`,
        await sha256(canonicalRequest),
    ].join("\n");

    const signingKey = await getSigningKey(
        secretAccessKey,
        shortDate,
        region,
        service,
    );
    const signature = await hmac(signingKey, stringToSign, "hex");

    return {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Host: `email.${region}.amazonaws.com`,
        "X-Amz-Date": date,
        Authorization: `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${shortDate}/${region}/${service}/aws4_request, SignedHeaders=content-type;host;x-amz-date, Signature=${signature}`,
    };
}

async function sha256(message: string) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    return Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

async function hmac(
    key: Uint8Array,
    message: string,
    outputFormat: "hex" | "base64",
) {
    const cryptoKey = await crypto.subtle.importKey(
        "raw",
        key,
        { name: "HMAC", hash: { name: "SHA-256" } },
        false,
        ["sign"],
    );
    const signature = await crypto.subtle.sign(
        "HMAC",
        cryptoKey,
        new TextEncoder().encode(message),
    );
    return outputFormat === "hex"
        ? Array.from(new Uint8Array(signature))
              .map((b) => b.toString(16).padStart(2, "0"))
              .join("")
        : btoa(String.fromCharCode(...new Uint8Array(signature)));
}

async function getSigningKey(
    secretKey: string,
    date: string,
    region: string,
    service: string,
) {
    const kDate = await hmac(
        new TextEncoder().encode("AWS4" + secretKey),
        date,
        "base64",
    );
    const kRegion = await hmac(
        new Uint8Array([...atob(kDate)].map((c) => c.charCodeAt(0))),
        region,
        "base64",
    );
    const kService = await hmac(
        new Uint8Array([...atob(kRegion)].map((c) => c.charCodeAt(0))),
        service,
        "base64",
    );
    return new Uint8Array(
        [
            ...atob(
                await hmac(
                    new Uint8Array(
                        [...atob(kService)].map((c) => c.charCodeAt(0)),
                    ),
                    "aws4_request",
                    "base64",
                ),
            ),
        ].map((c) => c.charCodeAt(0)),
    );
}
