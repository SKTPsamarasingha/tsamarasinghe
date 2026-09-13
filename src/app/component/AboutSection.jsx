"use client";

import React, {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const techCategories = [
    {
        title: "Frontend",
        subtitle: "Modern interfaces built with reusable components, responsive layouts, animations, and clean architecture.",
        skills: ["React.js", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Redux Toolkit", "TanStack Query", "Framer Motion", "GSAP", "Zod"]
    },
    {
        title: "Backend",
        subtitle: "Scalable backend systems with secure APIs, authentication, validation, and reliable business logic.",
        skills: ["Node.js", "Express.js", "REST APIs", "JWT", "OAuth 2.0", "Prisma", "Joi", "PHP", "C#", "Python", "Java"]
    },
    {
        title: "Database",
        subtitle: "Reliable data systems with structured schemas, queries, relationships, caching, and real-time synchronization.",
        skills: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Firestore", "Redis", "Firebase Auth", "Firebase Admin SDK"]
    },
    {
        title: "Tools & Cloud",
        subtitle: "Modern development workflows with version control, testing, containers, deployment, storage, and design tools.",
        skills: ["Git", "GitHub", "Docker", "Postman", "Vitest", "Jest", "Vercel", "Cloudinary", "AWS S3", "Figma", "VS Code"]
    }
];

export default function AboutSection() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const rows = gsap.utils.toArray(".tech-row");

        rows.forEach((row) => {
            const badges = row.querySelectorAll(".skill-badge");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: row,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });

            tl.fromTo(
                row.querySelectorAll(".row-content"),
                {opacity: 0, y: 30},
                {opacity: 1, y: 0, duration: 0.6, ease: "power2.out"}
            ).fromTo(
                badges,
                {opacity: 0, scale: 0.8, x: -10},
                {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    duration: 0.4,
                    stagger: 0.05,
                    ease: "power2.out"
                },
                "-=0.3"
            );
        });

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => clearTimeout(timer);
    }, {scope: sectionRef});

    return (
        <section
            ref={sectionRef}
            className="w-full px-6 md:px-16 py-24 bg-black text-[#f5f5f5] flex flex-col justify-center"
        >
            <div className="w-full max-w-7xl mx-auto flex flex-col">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-16">
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
                        <span className="text-[#f5f5f5]">Tech</span>{" "}
                        <span className="text-[#8c8c8c]">Stack & Skills</span>
                    </h2>
                    <div className="hidden lg:block flex-1 h-[1px] bg-[#2e2e2e] ml-12"/>
                </div>

                <div className="flex flex-col divide-y divide-[#2e2e2e]">
                    {techCategories.map((group, index) => (
                        <div
                            key={index}
                            className="tech-row py-12 md:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
                        >
                            <div className="row-content flex flex-col gap-2 lg:max-w-md">
                                <h3 className="text-4xl md:text-6xl font-medium tracking-tight text-[#f5f5f5]">
                                    {group.title}
                                </h3>
                                <p className="text-sm md:text-base text-[#8c8c8c] leading-relaxed">
                                    {group.subtitle}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2.5 lg:max-w-lg lg:justify-end">
                                {group.skills.map((skill, sIndex) => (
                                    <span
                                        key={sIndex}
                                        className="skill-badge px-4 py-2 rounded-full bg-[#1a1a1a] text-xs md:text-sm font-mono text-[#f5f5f5] tracking-wide hover:border-[#8c8c8c] transition-colors cursor-pointer"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}