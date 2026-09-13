"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const steps = [
    {
        number: "01",
        title: "Discovery & Scope",
        description: "Deep dive into product requirements, target audience, technical constraints, and measurable business goals."
    },
    {
        number: "02",
        title: "Architecture & Design",
        description: "System design, database schemas, API contracts, and high-precision UI/UX interface systems."
    },
    {
        number: "03",
        title: "Engineering & Iteration",
        description: "Clean, test-driven full-stack implementation with continuous feedback loops and milestone builds."
    },
    {
        number: "04",
        title: "Deployment & Optimization",
        description: "Production rollout, performance auditing, edge caching, monitoring setup, and handoff support."
    }
];

export default function ProcessSection() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const items = gsap.utils.toArray(".process-step");
        items.forEach((item, index) => {
            gsap.fromTo(
                item,
                { opacity: 0, y: 35 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="w-full px-6 md:px-16 py-24 bg-[#0f0f0f] text-[#f5f5f5]"
        >
            <div className="w-full max-w-7xl mx-auto flex flex-col">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-16">
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
                        <span className="text-[#f5f5f5]">Development</span>{" "}
                        <span className="text-[#8c8c8c]">Process</span>
                    </h2>
                    <div className="hidden lg:block flex-1 h-[1px] bg-[#2e2e2e] ml-12" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="process-step flex flex-col justify-between p-6 sm:p-8 bg-[#1a1a1a] rounded-2xl border border-[#2e2e2e]/50 hover:border-[#8c8c8c]/40 transition-colors duration-300"
                        >
                            <div className="flex flex-col gap-6">
                                <span className="font-mono text-3xl font-semibold text-[#8c8c8c]/40">
                                    {step.number}
                                </span>
                                <h3 className="text-xl font-medium tracking-tight text-[#f5f5f5]">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-[#8c8c8c] leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}