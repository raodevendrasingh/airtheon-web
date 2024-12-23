import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GeneralSettings() {
    return (
        <div className="space-y-5 w-full">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">
                    General Settings
                </h2>
                <p className="text-muted-foreground">
                    Manage your basic account settings and preferences.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                        Update your basic profile information.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            placeholder="Enter your email"
                            defaultValue="example@email.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select defaultValue="male">
                            <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Location Settings</CardTitle>
                    <CardDescription>
                        Configure your location preferences.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Location customization</Label>
                        <Select defaultValue="ip">
                            <SelectTrigger>
                                <SelectValue placeholder="Select location setting" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ip">
                                    Use approximate location (based on IP)
                                </SelectItem>
                                <SelectItem value="precise">
                                    Use precise location
                                </SelectItem>
                                <SelectItem value="manual">
                                    Set location manually
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
