import { useState } from "react";
import Section from "../components/section";

export default function CertificateSection() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const certificates = [
        {
            id: 1,
            title: "Web Development Certification",
            issuer: "Apna College",
            category: "Courses",
            date: "Dec 2024",
            link: "/assets/certificates/web-development.pdf"
        },
        {
            id: 2,
            title: "Intoduction to Data Science",
            issuer: "Cisco Academy",
            category: "Courses",
            date: "Jan 2025",
            image: "/assets/certificate2.jpg",
            link: "/assets/certificates/data-science.pdf"
        },
        {
            id: 3,
            title: "Top-3 Hackathon Winner",
            issuer: "Google Developer Group On Campus GCOE, Nagpur",
            category: "Hackathons",
            date: "Feb 2025",
            link: "/assets/certificates/hackathon-winner.pdf"
        },
        {
            id: 4,
            title: "Web Development Internship Completion",
            issuer: "Mainflow Technologies",
            category: "Courses",
            date: "March 2025",
            link: "/assets/certificates/internship.pdf"
        },
        {
            id: 5,
            title: "Winner - Code Mania ",
            issuer: "Inter College Debugging Competition",
            category: "Competitions",
            date: "Sep 2023",
            link: "/assets/certificates/code-mania.jpeg"
        },
        {
            id: 6,
            title: "DSA with Java",
            issuer: "Apna College",
            category: "Courses",
            date: "April 2024",
            link: "/assets/certificates/dsa-java.pdf"
        },
        {
            id: 7,
            title: "BTech- Computer Science & Engineering",
            issuer: "G.H.Raisoni University, Amravti",
            category: "Academics",
            date: "May 2027",
            link: "/assets/certificates/btech.pdf"
        },
    ];

    const categories = ["All", "Academics", "Courses", "Hackathons", "Competitions"];

    const filteredCertificates = selectedCategory === "All" 
        ? certificates 
        : certificates.filter(cert => cert.category === selectedCategory);

    const handleViewCertificate = (link: string) => {
        window.open(link, "_blank");
    };

    return (
        <Section title="Certificates & Achievements">
            <div className="w-full space-y-4">
                {/* Filter Tags */}
                <div className="w-full flex flex-wrap gap-2 pb-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                                selectedCategory === category
                                    ? "border-gray-800 bg-gray-800 text-white"
                                    : "border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Certificates List - Horizontal Cards */}
                <div className="w-full space-y-3">
                    {filteredCertificates.map((certificate) => (
                        <div
                            key={certificate.id}
                            className="flex flex-col md:flex-row items-start md:items-center justify-between w-full border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-2xl hover:-translate-y-1 hover:border-gray-400 transition-all duration-300 cursor-pointer"
                        >
                            {/* Certificate Info */}
                            <div className="flex-1 w-full md:w-auto">
                                <h3 className="text-base font-medium text-gray-800 mb-2">
                                    {certificate.title}
                                </h3>
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-gray-600">
                                    <span>{certificate.issuer}</span>
                                    <span className="hidden md:inline">•</span>
                                    <span>{certificate.date}</span>
                                </div>
                            </div>

                            {/* View Button */}
                            <button 
                                onClick={() => handleViewCertificate(certificate.link)}
                                className="mt-3 md:mt-0 md:ml-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg text-sm font-medium text-gray-800 transition-colors whitespace-nowrap w-full md:w-auto"
                            >
                                View Certificate
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
