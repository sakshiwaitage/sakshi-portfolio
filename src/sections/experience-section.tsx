import Section from "../components/section";

export default function ExperienceSection() {
    const experience = [
        {
            image: "/assets/mainflow.jpg",
            title: "Web Development Intern",
            company: "Mainflow Technologies",
            location: "Remote",
            start: "Jan 2024",
            end: "March 2024",
            description: [
                "Worked on designing and developing responsive web pages using HTML, CSS, and JavaScript. Assisted in building user-friendly interfaces, improving UI/UX, and implementing basic functionality.",
                "Collaborated with the team to debug issues, optimize performance, and follow best practices in web development.",
                " Gained hands-on experience with real-world projects, version control, and deployment workflows.",
            ],
        },
        
    ];

    return (
        <Section title="Experience">
            <div className="space-y-6">
                {experience.map((experience) => (
                    <div key={experience.title} className="w-full border border-gray-200 p-6 rounded-xl">
                        <div className="flex flex-col md:flex-row items-start gap-3 md:items-center justify-between w-full text-gray-500">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                    <img
                                        src={experience.image}
                                        alt={experience.title}
                                        width={80}
                                        height={80}
                                    />
                                </div>
                                <div>
                                    <h3 className="text-base font-medium text-gray-800">
                                        {experience.title}
                                    </h3>
                                    <div>{experience.company}</div>
                                </div>
                            </div>
                            <div>{experience.start} - {experience.end}</div>
                        </div>
                        <ul className="list-disc px-5 mt-6 text-gray-500 space-y-2">
                            {experience.description.map((description) => (
                                <li key={description}>{description}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Section>
    );
}