'use client';
import {useRef} from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import profileImg from '@/../public/profile.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    const bioText = "I help startups and enterprises create meaningful connections between their products and customers. With a focus on ethical practices, I streamline publishing workflows and empower businesses to achieve their goals while fostering lasting customer engagement.";
    const words = bioText.split(' ');
    const imageSrc = profileImg; // or "/profile.jpg" if placed in public folder

    useGSAP(() => {
        const container = containerRef.current;
        if (!container) return;

        const wordTargets = container.querySelectorAll('.word-span');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=150%',
                scrub: 0.5,
                pin: true,
                anticipatePin: 1,
            },
        });

        tl.to(wordTargets, {
            color: '#ffffff',
            stagger: 0.5,
            ease: 'none',
        });

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, {scope: sectionRef});

    const handleMouseEnter = (e) => {
        const textEl = e.currentTarget.querySelector(".spin-text");
        if (!textEl) return;
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
            id="about"
            ref={sectionRef}
            className="relative w-full h-screen flex flex-col justify-between px-6 md:px-16 py-16 bg-black text-offwhite overflow-hidden"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto w-full">
                {/* Left Side: Bio Text */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                    <p
                        ref={containerRef}
                        className="font-sans text-xl md:text-3xl font-normal leading-relaxed tracking-tight max-w-2xl flex flex-wrap gap-x-[0.25em]"
                    >
                        {words.map((word, index) => (
                            <span
                                key={index}
                                className="word-span inline-block"
                                style={{color: '#4a4a4a'}}
                            >
                                {word}
                            </span>
                        ))}
                    </p>
                </div>

                {/* Right Side: Moody Portrait Image (Hidden on Mobile) */}
                <div
                    className="hidden lg:block lg:col-span-5 relative w-full h-[600px] rounded-2xl overflow-hidden contrast-125">
                    {imageSrc ? (
                        <Image
                            src={imageSrc}
                            alt="Thiruna Samarasinghe portrait"
                            fill
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover object-center"
                            priority
                        />
                    ) : null}
                </div>

            </div>

            {/* Bottom Action Links with Vertical Spin Hover Effect */}
            <div className="w-full  flex items-center gap-8 font-mono text-xs">
                <a
                    href="#contact"
                    onMouseEnter={handleMouseEnter}
                    className="group flex items-center gap-2 text-offwhite hover:text-lightgrey transition-colors cursor-pointer"
                    style={{perspective: "1000px"}}
                >
                    <span className="spin-text inline-block origin-center" style={{transformStyle: "preserve-3d"}}>
                        CONTACT
                    </span>
                    <span
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </a>
                <a
                    href="https://www.linkedin.com/in/tsamarasingha"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={handleMouseEnter}
                    className="group flex items-center gap-2 text-offwhite hover:text-lightgrey transition-colors cursor-pointer"
                    style={{perspective: "1000px"}}
                >
                    <span className="spin-text inline-block origin-center" style={{transformStyle: "preserve-3d"}}>
                        LINKEDIN
                    </span>
                    <span
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </a>
                <a
                    href="https://github.com/SKTPsamarasingha"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={handleMouseEnter}
                    className="group flex items-center gap-2 text-offwhite hover:text-lightgrey transition-colors cursor-pointer"
                    style={{perspective: "1000px"}}
                >
                    <span className="spin-text inline-block origin-center" style={{transformStyle: "preserve-3d"}}>
                        GITHUB
                    </span>
                    <span
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </a>
            </div>
        </section>
    );
}