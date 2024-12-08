"use client";

import React, { useState, useRef, useEffect } from "react";
import { Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import dummyUser from "@/assets/dummyUser.png";
import Image from "next/image";

export const UserMenuDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const currentUser = "Dev";

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleItemClick = (path: string) => {
        setIsOpen(false);
        router.push(path);
    };

    const handleLogout = async () => {
        setIsOpen(false);
        router.push("/");
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {currentUser && (
                <>
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <Avatar className="h-10 w-10 cursor-pointer">
                            <AvatarImage src="dummyUser" alt="@username" />
                            <AvatarFallback className="h-10 w-10 p-2">
                                D
                            </AvatarFallback>
                        </Avatar>
                    </button>
                    {isOpen && (
                        <div
                            className="absolute right-0 mt-2 w-52 rounded-xl p-2 shadow-xl bg-background border
                                border-border z-50"
                        >
                            <div className="flex items-center justify-start gap-3 px-3 pt-0.5 pb-2.5 border-b border-border">
                                <Image
                                    src={dummyUser}
                                    alt="dummyUser"
                                    className="h-10 w-10 rounded-full border"
                                />
                                <div className="flex text-sm flex-col truncate">
                                    <p className="font-medium">{currentUser}</p>
                                    <p className="text-gray-500">
                                        @{currentUser}
                                    </p>
                                </div>
                            </div>

                            <div className="py-2 w-full">
                                <Button
                                    onClick={() => handleItemClick("/settings")}
                                    variant="ghost"
                                    className="flex justify-start rounded-lg w-full px-3"
                                >
                                    <Settings className="mr-3 size-4" />
                                    <span>Settings</span>
                                </Button>
                            </div>
                            <hr className="border-border" />
                            <div className="pt-2">
                                <Button
                                    onClick={handleLogout}
                                    variant="ghost"
                                    className="flex justify-start rounded-lg w-full hover:text-destructive px-3"
                                >
                                    <LogOut className="mr-3 size-4" />
                                    <span>Logout</span>
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
