"use client";

import React, {useRef} from "react";
import {Code2, Server, ShoppingBag, Wand2} from "lucide-react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const services = [
    {
        number: "01",
        title: "Web Development",
        description: "Fast, responsive websites built with modern frontend technologies, clean interfaces, and optimized user experiences for everyone.",
        stats: ["1 – 3w"],
        icon: Code2,
    },
    {
        number: "02",
        title: "Full-Stack Development",
        description: "Complete web applications with modern interfaces, APIs, authentication, databases, and scalable backend systems for businesses.",
        stats: ["2 – 6w"],
        icon: Server,
    },
    {
        number: "03",
        title: "E-Commerce Development",
        description: "Scalable online stores featuring product catalogs, shopping carts, orders, authentication, and powerful administration tools.",
        stats: ["2 – 6w"],
        icon: ShoppingBag,
    },
    {
        number: "04",
        title: "Vibe Code Cleanup",
        description: "Clean, refactor, and optimize AI-generated code into structured, maintainable, scalable, production-ready applications for teams.",
        stats: ["1 – 3w"],
        icon: Wand2,
    },
];

export default function ServicesSection() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const progressBarRef = useRef(null);

    useGSAP(() => {
        const track = trackRef.current;
        let tween;

        const initAnimation = () => {
            const getScrollAmount = () => {
                return -(track.scrollWidth - window.innerWidth + 64);
            };

            tween = gsap.to(track, {
                x: getScrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.5,
                    start: "top top",
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    end: () => `+=${track.scrollWidth}`,
                },
            });

            gsap.to(progressBarRef.current, {
                width: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    scrub: 0.5,
                    start: "top top",
                    end: () => `+=${track.scrollWidth}`,
                },
            });

            ScrollTrigger.refresh();
        };

        // Prevents layout miscalculations in production caused by early font rendering races
        document.fonts.ready.then(() => {
            initAnimation();
        });

        return () => {
            if (tween) tween.kill();
        };
    }, {scope: sectionRef});

    return (
        <section
            ref={sectionRef}
            className="w-full h-screen px-4 sm:px-6 md:px-16 py-16 md:py-24 bg-[#0f0f0f] text-[#f5f5f5] overflow-hidden flex flex-col justify-center relative"
        >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-tight">
                    <span className="text-[#f5f5f5]">Services</span>{" "}
                    <span className="text-[#8c8c8c]">and Capabilities</span>
                </h2>

                <div className="hidden lg:block flex-1 h-[1px] bg-[#2e2e2e] ml-12 relative overflow-hidden">
                    <div
                        ref={progressBarRef}
                        className="absolute top-0 left-0 h-full w-0 bg-[#f5f5f5]"
                    />
                </div>
            </div>

            <div className="overflow-hidden w-full">
                <div ref={trackRef} className="flex w-fit pb-6 ">
                    {services.map((service, index) => {
                        const IconComponent = service.icon;

                        return (
                            <div
                                key={index}
                                className="relative flex flex-col justify-between w-[85vw] sm:w-[380px] md:w-[450px] lg:w-[500px] h-[380px] sm:h-[400px] md:h-[420px] p-6 sm:p-8 bg-[#1a1a1a] hover:border-[#8c8c8c]/50 transition-all duration-300 group flex-shrink-0"
                            >
                                <div className="flex items-center justify-between z-10">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="p-2.5 sm:p-3 rounded-xl bg-[#2e2e2e]/50 text-[#f5f5f5] group-hover:bg-[#f5f5f5] group-hover:text-[#0f0f0f] transition-colors duration-300">
                                            <IconComponent size={22} className="sm:w-6 sm:h-6"/>
                                        </div>

                                        <div
                                            className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-[#8c8c8c]">
                                            {service.stats.map((stat, sIndex) => (
                                                <span
                                                    key={sIndex}
                                                    className="px-2.5 sm:px-3 py-1 rounded-full bg-[#2e2e2e]/60 text-[#f5f5f5] tracking-wide"
                                                >
                                                    {stat}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <span
                                        className="font-mono text-4xl sm:text-5xl md:text-6xl font-semibold text-[#2e2e2e] select-none group-hover:text-[#8c8c8c]/30 transition-colors">
                                        {service.number}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2 sm:gap-3 z-10">
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-[#f5f5f5]">
                                        {service.title}
                                    </h3>

                                    <p className="text-xs sm:text-sm md:text-base text-[#8c8c8c] leading-relaxed line-clamp-3 sm:line-clamp-none">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}