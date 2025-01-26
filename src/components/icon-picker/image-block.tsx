"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, AlertCircle } from "lucide-react";
import { MAX_WORKPLACE_ICON_SIZE } from "@/data/constants";
import { Input } from "@/components/ui/input";

interface ImageUploadProps {
    onSelect: (value: {
        fileName?: string;
        type: "image";
        preview: string;
        buffer?: ArrayBuffer;
    }) => void;
}

interface FileInfo {
    name: string;
    size: number;
    preview: string;
    buffer: ArrayBuffer;
}

export function ImageUpload({ onSelect }: ImageUploadProps) {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState<
        "idle" | "uploading" | "success" | "error"
    >("idle");
    const [uploadError, setUploadError] = useState("");
    const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onloadstart = () => {
            setUploadStatus("uploading");
            setUploadProgress(0);
        };

        reader.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                setUploadProgress(percentComplete);
            }
        };

        reader.onload = async (e) => {
            if (!e.target?.result) return;

            // Validate file type and size
            if (!["image/jpeg", "image/png"].includes(file.type)) {
                setUploadError("Only JPEG and PNG files are allowed");
                setUploadStatus("error");
                return;
            }

            if (file.size > MAX_WORKPLACE_ICON_SIZE) {
                setUploadError(
                    `File size must be less than ${formatFileSize(MAX_WORKPLACE_ICON_SIZE)}`,
                );
                setUploadStatus("error");
                return;
            }

            // First get the buffer
            const buffer = e.target.result as ArrayBuffer;

            // Create preview URL
            const previewUrl = URL.createObjectURL(file);

            setFileInfo({
                name: file.name,
                size: file.size,
                preview: previewUrl,
                buffer: buffer,
            });

            setUploadStatus("success");

            // Call onSelect with all data
            onSelect({
                type: "image",
                fileName: file.name,
                preview: previewUrl,
                buffer: buffer,
            });
        };

        reader.onerror = () => {
            setUploadError("Error reading file");
            setUploadStatus("error");
        };

        reader.readAsDataURL(file);
    };

    const resetUpload = () => {
        setUploadStatus("idle");
        setUploadError("");
        setFileInfo(null);
        setUploadProgress(0);
    };

    // display different UI based on upload status

    switch (uploadStatus) {
        case "success":
            return (
                <div className="h-52 md:h-[290px] flex flex-col items-center justify-between rounded-xl gap-4">
                    <div className="flex flex-col items-center gap-2 w-full mt-5 md:mt-10">
                        <span className="flex items-center">
                            {fileInfo?.preview ? (
                                <img
                                    src={fileInfo.preview}
                                    alt={fileInfo.name}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                            ) : null}
                        </span>
                        <span className="text-center">
                            <p className="font-medium truncate">
                                {fileInfo?.name}
                            </p>
                            <p className="text-sm text-cente text-muted-foreground">
                                {formatFileSize(fileInfo?.size || 0)}
                            </p>
                        </span>
                    </div>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={resetUpload}
                    >
                        Change Picture
                    </Button>
                </div>
            );

        case "error":
            return (
                <div className="h-52 md:h-[290px] flex flex-col items-center justify-between rounded-xl gap-4">
                    <div className="flex flex-col items-center text-center mt-10 md:mt-20">
                        <AlertCircle className="h-8 w-8 text-destructive mb-2" />
                        <p className="font-medium text-destructive">
                            {uploadError}
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={resetUpload}
                    >
                        Try Again
                    </Button>
                </div>
            );

        case "uploading":
            return (
                <div className="h-52 md:h-[290px] flex flex-col items-center justify-between rounded-xl gap-4">
                    <div className="flex flex-col items-center gap-2 w-full mt-10 opacity-60">
                        <span className="flex items-center">
                            {fileInfo?.preview ? (
                                <img
                                    src={fileInfo.preview}
                                    alt={fileInfo.name}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                            ) : null}
                        </span>
                        <span className="text-center">
                            <p className="font-medium truncate">
                                {fileInfo?.name}
                            </p>
                            <p className="text-sm text-cente text-muted-foreground">
                                {formatFileSize(fileInfo?.size || 0)}
                            </p>
                        </span>
                    </div>
                    <Progress value={uploadProgress} />
                    <p className="text-sm text-center text-muted-foreground">
                        Uploading... {uploadProgress}%
                    </p>
                </div>
            );

        default:
            return (
                <label className="flex flex-col items-center justify-center w-full h-52 md:h-72 border-2 border-dashed border-primary/20 rounded-xl cursor-pointer bg-accent/90 hover:bg-muted">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-8 w-8 mb-4" />
                        <p className="mb-2 text-base">
                            <span className="font-semibold">
                                Click to upload
                            </span>{" "}
                            or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                            PNG, JPG (MAX.{" "}
                            {formatFileSize(MAX_WORKPLACE_ICON_SIZE)})
                        </p>
                    </div>
                    <Input
                        type="file"
                        className="hidden"
                        accept="image/png,image/jpeg"
                        onChange={handleFileUpload}
                    />
                </label>
            );
    }
}
