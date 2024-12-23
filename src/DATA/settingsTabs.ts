import {
    BellDot,
    CreditCard,
    Layers,
    Ratio,
    Settings2,
    ShieldCheck,
    UserCircle,
} from "lucide-react";

export const settingsTabs = [
    {
        title: "General",
        value: "general",
        href: "/settings/general",
        icon: Settings2,
    },
    {
        title: "Personalization",
        value: "personalization",
        href: "/settings/personalization",
        icon: Ratio,
    },
    {
        title: "Workspace",
        value: "workspace",
        href: "/settings/workspace",
        icon: Layers,
    },
    {
        title: "Account Center",
        value: "account",
        href: "/settings/account",
        icon: UserCircle,
    },
    {
        title: "Security",
        value: "security",
        href: "/settings/security",
        icon: ShieldCheck,
    },
    {
        title: "Billing",
        value: "billing",
        href: "/settings/billing",
        icon: CreditCard,
    },
    {
        title: "Notifications",
        value: "notifications",
        href: "/settings/notifications",
        icon: BellDot,
    },
];
