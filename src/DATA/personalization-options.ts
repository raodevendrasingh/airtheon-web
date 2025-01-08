import { AppleNotesIcon } from "@/assets/svg-icons/apple-notes";
import { EvernoteIcon } from "@/assets/svg-icons/evernote";
import { GoogleKeepIcon } from "@/assets/svg-icons/google-keep";
import { NotionIcon } from "@/assets/svg-icons/notion";
import { ObsidianIcon } from "@/assets/svg-icons/obsidian";
import { OneNoteIcon } from "@/assets/svg-icons/one-note";
import { TextFileIcon } from "@/assets/svg-icons/text-file";
import {
    FileText,
    Image,
    Link,
    BookOpen,
    Headphones,
    Keyboard,
    Camera,
    Bookmark,
    Mic,
    Laptop,
    Smartphone,
    Server,
    Code,
    LayoutDashboard,
    Palette,
    Database,
    Megaphone,
    GraduationCap,
    FlaskConical,
    Rocket,
    Home,
    Briefcase,
    User,
    Ban,
    type LucideIcon,
} from "lucide-react";

type IconType = LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;

type optionProps = {
    id: string;
    label: string;
    icon?: IconType;
};

export const goalOptions: optionProps[] = [
    {
        id: "personal_memories",
        label: "Store and organize personal memories (notes, images, links, etc.)",
    },
    {
        id: "productivity",
        label: "Enhance productivity and manage work-related information",
    },
    {
        id: "memory_retention",
        label: "Improve memory retention and recall important details",
    },
    {
        id: "knowledge_repository",
        label: "Build a knowledge repository for research or learning",
    },
];

export const contentTypeOptions: optionProps[] = [
    { id: "text_notes", label: "Text notes and documents", icon: FileText },
    {
        id: "images",
        label: "Images, screenshots, or visual content",
        icon: Image,
    },
    { id: "links", label: "Links, bookmarks, or web clippings", icon: Link },
    { id: "pdfs", label: "PDFs, articles, or research papers", icon: BookOpen },
    { id: "audio", label: "Audio or voice recordings", icon: Headphones },
];

export const retrievalMethodOptions: optionProps[] = [
    { id: "ai_summaries", label: "AI-generated summaries for quick insights" },
    {
        id: "advanced_search",
        label: "Advanced search to find specific details",
    },
    { id: "tags", label: "Tags and categories for organized browsing" },
    { id: "visual_timelines", label: "Visual timelines or memory maps" },
    { id: "other", label: "Other (please specify)" },
];

export const captureMethodOptions: optionProps[] = [
    {
        id: "typing",
        label: "Typing notes on a computer or mobile device",
        icon: Keyboard,
    },
    { id: "photos", label: "Taking photos or screenshots", icon: Camera },
    { id: "links", label: "Saving links or web content", icon: Bookmark },
    { id: "voice", label: "Recording voice memos or audio", icon: Mic },
];

export const currentToolsOptions: optionProps[] = [
    { id: "notion", label: "Notion", icon: NotionIcon },
    { id: "evernote", label: "Evernote", icon: EvernoteIcon },
    { id: "onenote", label: "OneNote", icon: OneNoteIcon },
    { id: "google_keep", label: "Google Keep", icon: GoogleKeepIcon },
    { id: "apple_notes", label: "Apple Notes", icon: AppleNotesIcon },
    { id: "obsidian", label: "Obsidian", icon: ObsidianIcon },
    {
        id: "physical_notes",
        label: "Physical notes",
        icon: TextFileIcon,
    },
    { id: "none", label: "I don’t use any tools currently", icon: Ban },
];

export const aiImportanceOptions: optionProps[] = [
    {
        id: "critical",
        label: "Critical – I rely on AI for summaries and organization",
    },
    {
        id: "helpful",
        label: "Helpful – I use AI occasionally for specific tasks",
    },
    {
        id: "not_important",
        label: "Not important – I prefer manual organization",
    },
    { id: "explore", label: "I’m curious to explore AI features" },
];

export const devicePreferenceOptions: optionProps[] = [
    { id: "mobile", label: "Mobile (smartphone or tablet)", icon: Smartphone },
    { id: "desktop", label: "Desktop or laptop", icon: Laptop },
    {
        id: "both",
        label: "Both – I switch between devices frequently",
        icon: Server,
    },
];

export const workBackgroundOptions: optionProps[] = [
    { id: "software_engineer", label: "Software Engineer", icon: Code },
    { id: "product_manager", label: "Product Manager", icon: LayoutDashboard },
    { id: "designer", label: "Designer", icon: Palette },
    { id: "data_scientist", label: "Data Scientist", icon: Database },
    { id: "marketer", label: "Marketer", icon: Megaphone },
    { id: "student", label: "Student", icon: GraduationCap },
    { id: "researcher", label: "Researcher", icon: FlaskConical },
    { id: "entrepreneur", label: "Entrepreneur", icon: Rocket },
    { id: "other", label: "Other (please specify)", icon: User },
];

export const usagePurposeOptions: optionProps[] = [
    { id: "personal_life", label: "For personal life", icon: Home },
    { id: "work_purposes", label: "For work purposes", icon: Briefcase },
    { id: "both", label: "Both", icon: User },
];

type onboardingProps = {
    question: string;
    options: optionProps[];
    type: "checkbox" | "radio";
    display: "wrapped" | "stacked";
};

export const onboardingQuestions: onboardingProps[] = [
    {
        question: "What is your primary work background?",
        options: workBackgroundOptions,
        type: "radio",
        display: "wrapped",
    },
    {
        question: "How do you plan to use Airtheon?",
        options: usagePurposeOptions,
        type: "radio",
        display: "stacked",
    },
    {
        question: "What is your primary goal for using Airtheon?",
        options: goalOptions,
        type: "checkbox",
        display: "stacked",
    },
    {
        question:
            "What type of content do you plan to store most often in Airtheon?",
        options: contentTypeOptions,
        type: "checkbox",
        display: "stacked",
    },
    {
        question:
            "How do you prefer to retrieve or interact with your stored information?",
        options: retrievalMethodOptions,
        type: "checkbox",
        display: "stacked",
    },
    {
        question: "How do you usually capture or save information?",
        options: captureMethodOptions,
        type: "checkbox",
        display: "stacked",
    },
    {
        question:
            "Which platforms or tools do you currently use to store or organize information?",
        options: currentToolsOptions,
        type: "radio",
        display: "wrapped",
    },
    {
        question:
            "How important is AI assistance in managing your digital memories?",
        options: aiImportanceOptions,
        type: "radio",
        display: "stacked",
    },
    {
        question: "What is your preferred device for accessing Airtheon?",
        options: devicePreferenceOptions,
        type: "radio",
        display: "stacked",
    },
];
