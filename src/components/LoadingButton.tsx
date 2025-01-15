import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoaderProps {
    size?: number;
    className?: string;
    disabled?: boolean;
    pending: boolean;
    children: React.ReactNode;
    onClick?: () => void;
    form?: string;
}

export const LoadingButton = ({
    size = 64,
    pending,
    children,
    disabled,
    className,
    onClick,
    form,
}: LoaderProps) => {
    return (
        <Button
            onClick={onClick}
            className={cn(
                "w-full disabled:opacity-50 disabled:cursor-not-allowed",
                className,
            )}
            type="submit"
            disabled={disabled}
            form={form}
        >
            {pending ? (
                <div className="flex items-center justify-center">
                    <svg
                        width={size}
                        height={size}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-background"
                    >
                        <style>
                            {`
                        .spinner_b2T7 {
                            animation: spinner_xe7Q .8s linear infinite;
                        }
                        .spinner_YRVV {
                            animation-delay: -.65s;
                        }
                        .spinner_c9oY {
                            animation-delay: -.5s;
                        }
                        @keyframes spinner_xe7Q {
                            93.75%, 100% { r: 3px; }
                            46.875% { r: .2px; }
                        }
                        `}
                        </style>
                        <circle
                            className="spinner_b2T7 fill-current"
                            cx="4"
                            cy="12"
                            r="3"
                        />
                        <circle
                            className="spinner_b2T7 spinner_YRVV fill-current"
                            cx="12"
                            cy="12"
                            r="3"
                        />
                        <circle
                            className="spinner_b2T7 spinner_c9oY fill-current"
                            cx="20"
                            cy="12"
                            r="3"
                        />
                    </svg>
                </div>
            ) : (
                children
            )}
        </Button>
    );
};
