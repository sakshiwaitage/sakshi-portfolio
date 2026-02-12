import Section from "../components/section";

export default function EducationSection() {
    return (
        <Section title="Education">
            <div className="space-y-4">
                <div className="w-full border border-gray-200 p-6 rounded-xl">
                <div className="flex flex-col md:flex-row items-start gap-3 md:items-center justify-between w-full text-gray-500">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                            <img
                                src="/assets/college.jpg"
                                alt="Education"
                                width={25}
                                height={50}
                                className="size-20"
                            />
                        </div>
                        <div>
                            <h3 className="text-base font-medium text-gray-800">
                                BTech in Computer Science & Engineering
                            </h3>
                            <div>G.H.Raisoni University, Amravti</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div>Aug 2023 - May 2027</div>
                        <div className="text-sm text-gray-400 mt-1">CGPA: 9.5</div>
                    </div>
                </div>
                <p className="mt-6 text-gray-500">Pursuing a BTech in Computer Science & Engineering with a strong focus on practical learning through labs and projects. The program has strengthened my problem-solving skills and provided hands-on experience in core computer science and development technologies.</p>
            </div>
            <div className="w-full border border-gray-200 p-6 rounded-xl">
                <div className="flex flex-col md:flex-row items-start gap-3 md:items-center justify-between w-full text-gray-500">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                            <img
                                src="/assets/school.jpg"
                                alt="Education"
                                width={25}
                                height={50}
                                className="size-20"
                            />
                        </div>
                        <div>
                            <h3 className="text-base font-medium text-gray-800">
                            Higher Secondary Certificate
                            </h3>
                            <div> Dr. B. R. Ambedkar Jr. College, Hinganghat</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div>2021 - 2023</div>
                        <div className="text-sm text-gray-400 mt-1">Percentage: 67%</div>
                    </div>
                </div>
                <p className="mt-6 text-gray-500">Studied Physics, Chemistry, Mathematics, and Computer Science in 12th standard, gaining a solid understanding of analytical reasoning and core scientific concepts. Computer Science coursework helped develop logical thinking, basic programming skills, and an early interest in software development.</p>
            </div>

            <div className="w-full border border-gray-200 p-6 rounded-xl">
                <div className="flex flex-col md:flex-row items-start gap-3 md:items-center justify-between w-full text-gray-500">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                            <img
                                src="/assets/school.jpg"
                                alt="Education"
                                width={25}
                                height={50}
                                className="size-20"
                            />
                        </div>
                        <div>
                            <h3 className="text-base font-medium text-gray-800">
                            Secondary School Certificate
                            </h3>
                            <div> Dr. B. R. Ambedkar Jr. College, Hinganghat</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div>2021</div>
                        <div className="text-sm text-gray-400 mt-1">Percentage: 91%</div>
                    </div>
                </div>
                <p className="mt-6 text-gray-500">Completed SSC with a strong academic foundation, focusing on core subjects such as Mathematics, Science, and English. Developed disciplined study habits, problem-solving skills, and an early interest in technology and logical thinking. Actively participated in academic and school activities, building teamwork and communication skills.</p>
            </div>
            </div>
        </Section>
    );
}