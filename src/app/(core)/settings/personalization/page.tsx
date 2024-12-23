import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function PersonalizationSettings() {
    return (
        <div className="space-y-5 w-full">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">
                    Personalization
                </h2>
                <p className="text-muted-foreground">
                    Customize your experience.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                        Customize how the application looks on your device.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="theme">Theme</Label>
                        <Select defaultValue="system">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                        <div className="space-y-0.5">
                            <Label>Reduce animations</Label>
                            <p className="text-[0.8rem] text-muted-foreground">
                                Reduce motion for fewer animations.
                            </p>
                        </div>
                        <Switch />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Keyboard Shortcuts</CardTitle>
                    <CardDescription>
                        Customize keyboard shortcuts for quick access.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="commandSearch">Command Search</Label>
                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                            Ctrl + K
                        </code>
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="aiShortcut">AI Assistant</Label>
                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                            Ctrl + J
                        </code>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
