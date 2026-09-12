'use client'

import {useEffect, useState} from "react";

const NavBar = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                const currentScroll = window.scrollY;
                setScrollProgress((currentScroll / totalScroll) * 100);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className="sticky top-0 z-50 flex items-center justify-between gap-4 md:gap-8 px-4 md:px-8 py-5 w-full bg-white/70 dark:bg-black/50 backdrop-blur-md dark:border-white/10">
            {/* Brand Logo */}
            <a href={"#"} className="font-bold text-lg whitespace-nowrap m-0">TSamarasinghe.</a>

            {/* Horizontal Progress Bar Track */}
            <div className="flex-1 h-[1px] bg-black rounded-full overflow-hidden min-w-[30px] md:min-w-[50px]">
                <div
                    className="h-full bg-green transition-all duration-75 ease-out origin-left"
                    style={{width: `${scrollProgress}%`}}
                ></div>
            </div>

            {/* Navigation Links with smooth scroll anchors */}
            <ul className="flex items-center gap-8 md:gap-15 m-0 p-0 list-none whitespace-nowrap">


                <li className="hidden md:block">
                    <a href="#work" className="hover:text-gray-500 transition-colors">Work</a>
                </li>
                <li className="hidden md:block">
                    <a href="#about" className="hover:text-gray-500 transition-colors">About</a>
                </li>
                <li>
                    <a href="#contact" className="hover:text-gray-500 transition-colors">Contact</a>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;