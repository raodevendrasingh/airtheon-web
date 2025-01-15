import { motion } from "motion/react";
import { useEffect, useRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SpotlightButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: React.ReactNode;
}

export const SpotlightButton = ({
    onClick,
    className,
    children,
    ...props
}: SpotlightButtonProps) => {
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const spanRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { width } = (
                e.target as HTMLElement
            )?.getBoundingClientRect();
            const offset = e.offsetX;
            const left = `${(offset / width) * 100}%`;

            spanRef.current!.animate(
                { left },
                { duration: 250, fill: "forwards" },
            );
        };

        const handleMouseLeave = () => {
            spanRef.current!.animate(
                { left: "50%" },
                { duration: 100, fill: "forwards" },
            );
        };

        btnRef?.current?.addEventListener("mousemove", handleMouseMove);
        btnRef?.current?.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            btnRef?.current?.removeEventListener("mousemove", handleMouseMove);
            btnRef?.current?.removeEventListener(
                "mouseleave",
                handleMouseLeave,
            );
        };
    }, []);

    return (
        <motion.button
            whileTap={{ scale: 0.985 }}
            ref={btnRef}
            onClick={onClick}
            className="relative w-64 overflow-hidden rounded-lg bg-black dark:bg-black/50 px-4 py-2 text-lg font-medium text-lime-400"
        >
            <span
                className={cn(
                    "pointer-events-none relative z-10 mix-blend-difference",
                    className,
                )}
                {...props}
            >
                {children}
            </span>
            <span
                ref={spanRef}
                className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-lime-400"
            />
        </motion.button>
    );
};
