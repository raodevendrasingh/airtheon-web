import { AppStoreIcon } from "@/assets/svg-icons/appstore";
import { ChromeIcon } from "@/assets/svg-icons/chrome";
import { FirefoxIcon } from "@/assets/svg-icons/firefox";
import { GooglePlayIcon } from "@/assets/svg-icons/googleplay";

export const plugins = [
    {
        title: "Chrome Extension",
        description:
            "Access our features directly from your browser. Quickly save, organize, and access your content.",
        icon: ChromeIcon,
        badge: "v1.0.0",
        buttonText: "Install",
        link: "#",
        available: true,
    },
    {
        title: "Firefox Extension",
        description:
            "Access our features directly from your browser. Quickly save, organize, and access your content.",
        icon: FirefoxIcon,
        badge: "v2.1.0",
        buttonText: "Install",
        link: "#",
        available: false,
    },
    {
        title: "Android App",
        description:
            "Get our full-featured mobile experience on your Android device. Sync across all your devices.",
        icon: GooglePlayIcon,
        badge: "v3.0.2",
        buttonText: "Get on Play Store",
        link: "#",
        available: false,
    },
    {
        title: "iOS App",
        description:
            "Experience our seamless mobile interface on your iPhone or iPad. Stay productive on the go.",
        icon: AppStoreIcon,
        badge: "v3.0.2",
        buttonText: "Download on App Store",
        link: "#",
        available: false,
    },
];
