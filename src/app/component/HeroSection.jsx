"use client";

import Image from "next/image";
import {useState, useEffect, useRef} from "react";
import gsap from "gsap";

export default function HeroSection() {
    const [timeZone] = useState("SLST (GMT +5:30)");

    // React refs for container and sections
    const containerRef = useRef(null);
    const topSectionRef = useRef(null);
    const middleSectionRef = useRef(null);
    const bottomSectionRef = useRef(null);

    // Separate refs for the two lines so they scale outward from the center
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // 1. Top Section: Slides DOWN from the top (-60px)
            // REMOVED the position parameter "-=0.5" here because it is the start anchor
            tl.fromTo(
                topSectionRef.current,
                {y: -60, opacity: 0},
                {y: 0, opacity: 1, duration: 0.4, ease: "power1.inOut"}
            );

            // 2. Middle Section: Slides up from the bottom
            // Starts 0.5 seconds BEFORE the top section finishes moving
            tl.fromTo(
                middleSectionRef.current,
                {y: 80, opacity: 0},
                {y: 0, opacity: 1, duration: 1, ease: "power1.inOut"},
                "-=0.5"
            );

            // 3. Bottom Section text content: Fades up cleanly
            // Upped duration slightly from 0.1 to 0.4 so it doesn't jarringly flash into view
            tl.fromTo(
                bottomSectionRef.current,
                {y: 20, opacity: 0},
                {y: 0, opacity: 1, duration: 0.4, ease: "power1.inOut"},
                "-=0.6" // Adjusted offset to time nicely with the middle headline's end
            );

            // 4. Bottom Lines: Grow outwards from the center (scaleX: 0 to 1)
            tl.fromTo(
                [line1Ref.current, line2Ref.current],
                {scaleX: 0},
                {scaleX: 1, duration: 1, ease: "power3.inOut", transformOrigin: "center"},
                "-=0.4"
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);


    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-[90vh] flex flex-col justify-between px-6 md:px-16 py-12 bg-black text-[#f5f5f5] overflow-hidden"
        >
            {/* Top Section: Avatar & Bio (Slides DOWN from top) */}
            <div
                ref={topSectionRef}
                className="flex items-start gap-4 max-w-sm opacity-0"
            >
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ">
                    <Image
                        src="/avatar.png"
                        alt="Profile Avatar"
                        fill
                        className="object-cover"
                    />
                </div>
                <p className="font-mono text-xs text-gray-400 leading-relaxed">
                    I Connect with creators and builders to design and develop Framer websites reaching goals and
                    delivering the message
                </p>
            </div>

            {/* Middle Section: Main Headline (Slides UP from bottom) */}
            <div
                ref={middleSectionRef}
                className="my-auto py-12 flex flex-col gap-2 opacity-0"
            >
                <h1 className="text-5xl md:text-8xl font-medium tracking-tight text-white">
                    Website Designer
                </h1>
                <div className="flex items-center gap-x-4 md:gap-x-6">
                    <span className="text-gray-400 font-sans font-normal text-4xl md:text-7xl">and</span>
                    <span className="text-white font-sans text-5xl md:text-8xl font-medium tracking-tight">Brand Strategist</span>
                </div>
            </div>

            {/* Bottom Section: Segmented Layout */}
            <div ref={bottomSectionRef} className="w-full opacity-0">
                <div className="flex items-center justify-between font-mono text-xs text-gray-400 gap-2">
                    {/* Item 1: Location */}
                    <span className="shrink-0">Colombo, LK</span>

                    {/* Line Segment 1 (Animates from center) */}
                    <div ref={line1Ref} className="flex-1 h-[1px] bg-lightgrey mx-4 origin-center"/>

                    {/* Item 2: Timezone */}
                    <span className="shrink-0">{timeZone}</span>

                    {/* Line Segment 2 (Animates from center) */}
                    <div ref={line2Ref} className="flex-1 h-[1px] bg-lightgrey mx-4 origin-center"/>

                    {/* Item 3: Status */}
                    <div className="flex items-center gap-2 shrink-0">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
                        <span className="text-white tracking-wider">AVAILABLE</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
