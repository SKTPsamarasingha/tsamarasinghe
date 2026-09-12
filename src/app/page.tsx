import HeroSection from "@/app/component/HeroSection";
import IntroSection from "@/app/component/IntroSection";
import WorkSection from "@/app/component/WorkSection";
import ServicesSection from "@/app/component/ServicesSection";
import ContactSection from "@/app/component/ContactSection";
import AboutSection from "@/app/component/AboutSection";

export default function Home() {
    return (
        <>
            <HeroSection/>
            <IntroSection/>
            <WorkSection/>
            <AboutSection/>

            <ServicesSection/>
            <ContactSection/>
        </>
    );
}
