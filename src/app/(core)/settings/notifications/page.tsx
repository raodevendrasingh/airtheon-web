import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function NotificationSettings() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">
                    Notifications
                </h2>
                <p className="text-muted-foreground">
                    Manage how you receive notifications.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Email Notifications</CardTitle>
                    <CardDescription>
                        Configure your email notification preferences.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                        <div className="space-y-0.5">
                            <Label>Marketing emails</Label>
                            <p className="text-[0.8rem] text-muted-foreground">
                                Receive emails about new features and updates.
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                        <div className="space-y-0.5">
                            <Label>Security alerts</Label>
                            <p className="text-[0.8rem] text-muted-foreground">
                                Get notified about security concerns.
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Push Notifications</CardTitle>
                    <CardDescription>
                        Manage your mobile and desktop notifications.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                        <div className="space-y-0.5">
                            <Label>Comments</Label>
                            <p className="text-[0.8rem] text-muted-foreground">
                                When someone comments on your post.
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                        <div className="space-y-0.5">
                            <Label>Mentions</Label>
                            <p className="text-[0.8rem] text-muted-foreground">
                                When someone mentions you.
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
