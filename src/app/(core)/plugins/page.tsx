"use client";

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { plugins } from "@/data/plugins";

export default function PluginsPage() {
    return (
        <section className="p-5 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight">
                    Plugins & Apps
                </h1>
                <p className="text-muted-foreground mt-2">
                    Access our platform from anywhere with our cross-platform
                    integrations.
                </p>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {plugins.map((plugin) => (
                    <Card
                        key={plugin.title}
                        className="group hover:shadow-sm transition-all"
                    >
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <plugin.icon className="w-12 h-12 text-primary" />
                                {plugin.available && (
                                    <Badge variant="secondary">
                                        {plugin.badge}
                                    </Badge>
                                )}
                            </div>
                            <CardTitle className="mt-5">
                                {plugin.title}
                            </CardTitle>
                            <CardDescription>
                                {plugin.description}
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            {plugin.available === false ? (
                                <Button
                                    className="w-full group-hover:bg-primary/90"
                                    disabled
                                >
                                    Coming soon
                                </Button>
                            ) : (
                                <Button
                                    className="w-full group-hover:bg-primary/90"
                                    asChild
                                >
                                    <Link href={plugin.link}>
                                        {plugin.buttonText}
                                    </Link>
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
}
