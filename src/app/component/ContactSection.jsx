"use client";

import React, {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ArrowUpRight, Calendar, Mail} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });

        tl.fromTo(
            ".contact-title",
            {opacity: 0, y: 50},
            {opacity: 1, y: 0, duration: 0.8, ease: "power3.out"}
        )
            .fromTo(
                ".contact-desc",
                {opacity: 0, y: 30},
                {opacity: 1, y: 0, duration: 0.6, ease: "power3.out"},
                "-=0.4"
            )
            .fromTo(
                ".contact-card",
                {opacity: 0, y: 40, scale: 0.95},
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.12,
                    ease: "steps(4)"
                },
                "-=0.3"
            )
            .fromTo(
                ".contact-footer",
                {opacity: 0},
                {opacity: 1, duration: 0.6, ease: "power2.out"},
                "-=0.2"
            );
    }, {scope: sectionRef});

    const handleMouseEnter = (e) => {
        const textEl = e.currentTarget.querySelector(".spin-text");
        gsap.to(textEl, {
            rotationX: 360 * 2,
            duration: 0.8,
            ease: "power2.inOut",
            overwrite: "auto",
            onComplete: () => gsap.set(textEl, {rotationX: 0})
        });
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="w-full min-h-screen px-6 md:px-16 py-24 bg-[#0f0f0f] text-[#f5f5f5] flex flex-col justify-between overflow-hidden relative"
        >
            {/* Top Heading */}
            <div className="contact-title">
                <h2 className="text-5xl md:text-8xl font-medium tracking-tight">
                    <span className="text-[#8c8c8c]">Let's</span>{" "}
                    <span className="text-[#f5f5f5]">Connect</span>
                </h2>
            </div>

            {/* Middle Content & Cards */}
            <div className="my-auto py-16 flex flex-col gap-12">
                {/* Subtitle / Description */}
                <div className="contact-desc flex flex-col gap-1 max-w-xl text-lg md:text-xl text-[#8c8c8c]">
                    <p>Feel free to contact me if having any questions.</p>
                    <p className="text-[#f5f5f5]">I'm available for new projects or just for chatting.</p>
                </div>

                {/* Two Action Cards */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 w-full rounded-2xl overflow-hidden bg-[#1a1a1a]">
                    {/* Card 1: Book a Call */}
                    <a
                        href="#book-call"
                        onMouseEnter={handleMouseEnter}
                        className="contact-card group flex items-center justify-between md:justify-center py-8 px-8 bg-[#1a1a1a] hover:bg-[#252525] text-[#f5f5f5] font-medium text-lg border-b md:border-b-0 md:border-r border-[#2e2e2e] transition-all duration-300 text-left md:text-center relative overflow-hidden"
                        style={{perspective: "1000px"}}
                    >
                        <div className="flex items-center gap-3" style={{transformStyle: "preserve-3d"}}>
                            <Calendar className="w-5 h-5 text-[#8c8c8c] group-hover:text-[#f5f5f5] transition-colors"/>
                            <span className="spin-text inline-block origin-center">Book a Call</span>
                        </div>
                        <ArrowUpRight
                            className="w-5 h-5 text-[#8c8c8c] group-hover:text-[#f5f5f5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 md:absolute md:top-6 md:right-6"/>
                    </a>

                    {/* Card 2: Send an Email */}
                    <a
                        href="mailto:your-email@example.com"
                        onMouseEnter={handleMouseEnter}
                        className="contact-card group flex items-center justify-between md:justify-center py-8 px-8 bg-[#1a1a1a] hover:bg-[#252525] text-[#f5f5f5] font-medium text-lg transition-all duration-300 text-left md:text-center relative overflow-hidden"
                        style={{perspective: "1000px"}}
                    >
                        <div className="flex items-center gap-3" style={{transformStyle: "preserve-3d"}}>
                            <Mail className="w-5 h-5 text-[#8c8c8c] group-hover:text-[#f5f5f5] transition-colors"/>
                            <span className="spin-text inline-block origin-center">Send an Email</span>
                        </div>
                        <ArrowUpRight
                            className="w-5 h-5 text-[#8c8c8c] group-hover:text-[#f5f5f5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 md:absolute md:top-6 md:right-6"/>
                    </a>
                </div>
            </div>

            {/* Bottom Footer Bar */}
            <div
                className="contact-footer w-full pt-12 flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-[#8c8c8c] gap-4 border-t border-[#2e2e2e]">
                <span>Thiruna Samarasinghe, 2026</span>

                {/* Social Links (LinkedIn & GitHub only) */}
                <div className="flex items-center gap-6 text-sm">
                    <a href="https://www.linkedin.com/in/tsamarasingha" target="_blank" rel="noopener noreferrer"
                       className="hover:text-[#f5f5f5] transition-colors">
                        LinkedIn
                    </a>
                    <a href="https://github.com/SKTPsamarasingha" target="_blank" rel="noopener noreferrer"
                       className="hover:text-[#f5f5f5] transition-colors">
                        GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}