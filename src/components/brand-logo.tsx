import brandWordmarkDark from "@/assets/brand/airtheon-logo-wordmark/airtheon-dark-wordmark.png";
import brandWordmarkLight from "@/assets/brand/airtheon-logo-wordmark/airtheon-light-wordmark.png";
import Image from "next/image";
import Link from "next/link";

export const BrandLogoWordmark = () => {
    return (
        <Link
            href="/"
            className="flex items-center gap-2 self-center font-medium"
        >
            <Image
                src={brandWordmarkDark}
                alt="Airtheon Logo"
                width={180}
                height={180}
                className="hidden dark:block"
            />

            <Image
                src={brandWordmarkLight}
                alt="Airtheon Logo"
                width={180}
                height={180}
                className="block dark:hidden"
            />
        </Link>
    );
};
