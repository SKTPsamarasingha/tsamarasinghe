import type {Metadata} from "next";
import {Inter, Geist_Mono} from "next/font/google";
import "./globals.css";
import NavBar from "@/app/component/NavBar";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Replaced Geist with Inter for the sleek portfolio look
const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Thiruna Codes",
    description: "Thiruna Samarasinghe Portfolio",
};
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
        >
        <body className="min-h-full flex flex-col">
        <main>
            <NavBar/>
            {children}
        </main>
        </body>
        </html>
    );
}
