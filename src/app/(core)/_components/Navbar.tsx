import React from "react";
import { UserMenuDropdown } from "./UserMenuDropdown";
import { SearchBox } from "./SearchBox";

export const Navbar = () => {
    return (
        <nav className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-medium">Acme.</h1>
                </div>
                <div className="flex items-center gap-3">
                    <SearchBox />
                    <UserMenuDropdown />
                </div>
            </div>
        </nav>
    );
};
