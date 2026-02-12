import Section from "../components/section";

export default function ProjectsSection() {
    const projects = [
        {
            title: "Wanderlust",
            description: "Full-stack airbnb application",
            image: "/assets/airbnb.png",
            link: "https://airbnb-project-ogut.onrender.com/listings",
        },
        {
            title: "ResumeBuilder",
            description: "Resume Builder web application",
            image: "/assets/resumebuilder.png",
            link: "https://resume-builder-client-teal.vercel.app/",
        },
    ];

    return (
        <Section title="Projects">
            <div className="flex flex-wrap justify-center items-center gap-4 mr-auto">
                {projects.map((project) => (
                    <a
                        key={project.title}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:-translate-y-0.5 transition duration-300 max-w-75 border border-gray-200 rounded-xl cursor-pointer block"
                    >
                        <img
                            className="rounded-t-xl h-42 object-fit"
                            src={project.image}
                            alt={project.title}
                            width={300}
                            height={170}
                        />
                        <div className="p-4">
                            <h3 className="text-base font-medium">
                                {project.title}
                            </h3>
                            <p className="text-gray-500 mt-1">
                                {project.description}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </Section>
    );
}