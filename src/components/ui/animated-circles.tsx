"use client";

import React, { useEffect, useRef } from "react";

interface Circle {
    x: number;
    y: number;
    radius: number;
    dx: number;
    dy: number;
    opacity: number;
}

export function AnimatedCircles(): React.JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const setCanvasSize = (): void => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        setCanvasSize();
        window.addEventListener("resize", setCanvasSize);

        // Circle properties
        const circles: Circle[] = [];

        // Create initial circles
        for (let i = 0; i < 15; i++) {
            circles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 100 + 50,
                dx: (Math.random() - 0.5) * 0.5,
                dy: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.2,
            });
        }

        // Animation
        function animate(): void {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            circles.forEach((circle: Circle) => {
                // Move circles
                circle.x += circle.dx;
                circle.y += circle.dy;

                // Bounce off walls
                if (
                    circle.x + circle.radius > canvas.width ||
                    circle.x - circle.radius < 0
                ) {
                    circle.dx = -circle.dx;
                }
                if (
                    circle.y + circle.radius > canvas.height ||
                    circle.y - circle.radius < 0
                ) {
                    circle.dy = -circle.dy;
                }

                // Draw circle
                ctx.beginPath();
                ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(161, 161, 170, ${circle.opacity})`;
                ctx.fill();
            });

            requestAnimationFrame(animate);
        }

        animate();

        // Cleanup function
        return (): void => {
            window.removeEventListener("resize", setCanvasSize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 -z-10" />;
}
