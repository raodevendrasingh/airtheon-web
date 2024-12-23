import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SecuritySettings() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">
                    Account Center
                </h2>
                <p className="text-muted-foreground">
                    Manage your account security settings.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                        Add an extra layer of security to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                        <div className="space-y-0.5">
                            <Label>Enable 2FA</Label>
                            <p className="text-[0.8rem] text-muted-foreground">
                                Use an authenticator app to generate one-time
                                codes.
                            </p>
                        </div>
                        <Switch />
                    </div>
                    <Button variant="outline">Set up authenticator</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Connected Accounts</CardTitle>
                    <CardDescription>
                        Manage third-party account connections.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Google</Label>
                            <p className="text-[0.8rem] text-muted-foreground">
                                Connected to your Google account
                            </p>
                        </div>
                        <Button variant="outline">Disconnect</Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Apple</Label>
                            <p className="text-[0.8rem] text-muted-foreground">
                                Not connected
                            </p>
                        </div>
                        <Button>Connect</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
