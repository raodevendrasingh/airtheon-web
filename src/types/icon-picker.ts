export interface IconData {
    id?: string;
    type: "icon" | "emoji" | "image";
    preview: string;
    buffer?: ArrayBuffer;
    fileName?: string;
    metadata?: {
        iconName?: string;
        unicode?: string;
        base64?: string;
        mimeType?: string;
    };
}
