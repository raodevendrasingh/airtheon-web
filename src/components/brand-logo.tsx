import brandWordmarkDark from "@/assets/brand/airtheon-logo-wordmark/brand-wordmark-dark.png";
import brandWordmarkLight from "@/assets/brand/airtheon-logo-wordmark/brand-wordmark-light.png";
import Image from "next/image";
import Link from "next/link";

export const BrandWordmarkLogo = () => {
    return (
        <Link href="/" className="self-center">
            <Image
                src={brandWordmarkLight}
                alt="Airtheon Logo"
                width={180}
                height={180}
                className="hidden dark:block"
            />

            <Image
                src={brandWordmarkDark}
                alt="Airtheon Logo"
                width={180}
                height={180}
                className="block dark:hidden"
            />
        </Link>
    );
};
