export interface IconData {
    id?: string;
    type: "icon" | "emoji" | "image";
    value: string;
    metadata?: {
        iconName?: string; // For FA icons
        unicode?: string; // For emojis
        base64?: string; // For images
        mimeType?: string; // For images
    };
}
