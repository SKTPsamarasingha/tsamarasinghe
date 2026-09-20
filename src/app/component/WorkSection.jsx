'use client'
import {useEffect, useRef} from 'react';
import Image from 'next/image';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin safely
gsap.registerPlugin(ScrollTrigger);

const projects = [{
    title: "Luzifer",
    year: "'26",
    tags: ["FULL-STACK", "E-COMMERCE", "DEV"],
    image: "/projects/luzifer.png",
    link: "https://luzifer-clothing.vercel.app/"
}, {
        title: "WildRoute",
        year: "'26",
        tags: ["E-COMMERCE", "BOOKING", "DEV"],
        image: "/projects/wildroute.png",
        link: "https://wildroute-bice.vercel.app/"
    }, {
        title: "Locks & Cos",
        year: "'26",
        tags: ["FRONTEND", "BOOKING", "DEV"],
        image: "/projects/Locks&Cos.png",
        link: "https://salon-booking-brown.vercel.app/"
    }, {
        title: "Velevt Pour",
        year: "'25",
        tags: ["FRONTEND", "DEV", "UI"],
        image: "/projects/velevt-pour.png",
        link: "https://velevt-pour.vercel.app/"
    }, {
        title: "Anera Foods",
        year: "'2024",
        tags: ["E-COMMERCE", "DEV", "UI"],
        image: "/projects/anera-foods.png",
        link: "https://anera-foods.vercel.app/"
    }, {
        title: "Dilru Crochet",
        year: "'2024",
        tags: ["E-COMMERCE", "DEV", "UI"],
        image: "/projects/dilru-crochet.png",
        link: "https://dilru-crochet.vercel.app/"
    }];
const cardBackgrounds = ['bg-[#121212]', // Card 1: Deep Dark Charcoal
    'bg-[#222222]', // Card 2: Neutral Dark Grey
    'bg-[#363636]', // Card 3: Medium-Dark Grey
    'bg-[#525252]', // Card 4: True Medium Grey
    'bg-[#737373]', // Card 5: Soft Slate Grey
];
export default function WorkSection() {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const cards = cardsRef.current.filter(Boolean);

        cards.forEach((card, index) => {
            // Apply GSAP animation directly to handle subtle visual depth changes on scroll
            gsap.fromTo(card, {
                boxShadow: "0 0px 0px rgba(0,0,0,0)",
            }, {
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)", scrollTrigger: {
                    trigger: card, start: "top 15%", end: "top 5%", scrub: true,
                }
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (<section ref={containerRef} id="work" className="w-full min-h-screen px-6 md:px-16 py-24  text-[#f5f5f5]">

        {/* Section Title */}
        <div className="mb-12">
            <h2 className="text-lg font-mono text-white tracking-widest uppercase">
                Selected Work
            </h2>
        </div>

        {/* Projects List */}
        <div className="flex flex-col ">
            {projects.map((project, index) => (<a
                key={index}
                href={project.link}
                ref={(el) => (cardsRef.current[index] = el)}
                style={{
                    position: 'sticky', // Staggered top threshold height so previous cards keep their tabs visible
                    top: `${96 + (index * 24)}px`, zIndex: index + 1,
                }}
                className={`group relative flex flex-col md:flex-row items-start md:items-center justify-between py-14 border-b border-[#2e2e2e] transition-colors px-4 ${cardBackgrounds[index] || "bg-[#1c1c1c]"} hover:bg-[#262626]`}
            >
                {/* Left side: Title and Tags */}
                <div className="flex flex-col gap-3 w-full md:w-auto flex-1">
                    <h3 className="text-3xl md:text-5xl font-medium tracking-tight text-[#f5f5f5] group-hover:text-[#8c8c8c] transition-colors">
                        {project.title}
                    </h3>

                    {/* Tags Under Title */}
                    <div className="flex items-center gap-2 font-mono text-[10px] text-white  w-[14rem]">
                        {projects[index].tags.map((tag, tagIndex) => (<span
                            key={tagIndex}
                            className="px-2 py-1 rounded  text-white tracking-wider"
                        >
                                        {tag}
                                    </span>))}
                    </div>
                </div>

                {/* Middle/Right side: Connecting line with Year on top, and Large Thumbnail image */}
                <div
                    className="overflow-hidden flex items-center gap-6 mt-6 md:mt-0 w-full md:w-auto justify-between md:justify-end">

                    {/* Horizontal line running from left elements to the image, with year sitting right on top */}
                    <div className="flex flex-col items-end relative  w-200 mx-6">
                               <span className="font-mono text-2xl sm:text-6xl text-white mb-1">
                                    {project.year}
                                </span>
                        <div className="w-full h-[1px] bg-lightgrey"/>
                    </div>

                    {/* Large Project Image Thumbnail with Slow Color Transition on Hover */}
                    <div
                        className="relative w-80 h-65 hidden md:block overflow-hidden shrink-0 shadow-lg mr-10">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            unoptimized
                            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out group-hover:scale-105"
                        />
                    </div>
                </div>
            </a>))}
        </div>

    </section>);
}
