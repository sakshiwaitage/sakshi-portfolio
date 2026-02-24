import Footer from "./components/footer";
import LenisScroll from "./components/lenis";
import AboutSection from "./sections/about-section";
import CertificateSection from "./sections/certificate";
import ContactSection from "./sections/contact-section";
import EducationSection from "./sections/education-section";
import ExperienceSection from "./sections/experience-section";
import HeroSection from "./sections/hero-section";
import OtherSitesSection from "./sections/othersite";
import ProjectsSection from "./sections/projects-section";
import ResumeChatSection from "./sections/resume-chat-section";
import SkillsSection from "./sections/skills-section";

export default function App() {
    return (
        <main className="max-md:px-4">
            <LenisScroll />
            <HeroSection />
            <AboutSection />
            <ResumeChatSection />
            <ProjectsSection />
            <ExperienceSection />
            <EducationSection />
            <CertificateSection />
            <SkillsSection />
            <OtherSitesSection />
            <ContactSection />
            <Footer />
        </main>
    )
}
