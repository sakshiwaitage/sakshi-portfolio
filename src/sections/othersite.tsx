import Section from "../components/section";

export default function OtherSitesSection() {
    const codingPlatforms = [
        {
            id: 1,
            name: "LeetCode",
            logo: "🔗",
            description: "150+ Problems Solved",
            url: "https://leetcode.com/u/sakshi_waitage_/",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-200",
            textColor: "text-yellow-700",
            logoColor: "text-yellow-500",
        },
        {
            id: 2,
            name: "HackerRank",
            logo: "🏆",
            description: "5-Star Rating",
            url: "https://www.hackerrank.com/profile/sakshiwaitage245",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            textColor: "text-green-700",
            logoColor: "text-green-500",
        },
    ];

    return (
        <Section title="Coding Platforms">
            <div className="w-full space-y-3">
                {codingPlatforms.map((platform) => (
                    <a
                        key={platform.id}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex flex-col md:flex-row items-start md:items-center justify-between w-full ${platform.bgColor} ${platform.borderColor} border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:border-gray-300 hover:shadow-sm`}
                    >
                        {/* Platform Info */}
                        <div className="flex-1 w-full md:w-auto flex items-center gap-4">
                            {/* Logo */}
                            <div className={`text-3xl transition-transform group-hover:scale-110`}>
                                {platform.logo}
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className={`text-base font-medium ${platform.textColor}`}>
                                    {platform.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {platform.description}
                                </p>
                            </div>
                        </div>

                        {/* Visit Button */}
                        <button className="mt-3 md:mt-0 md:ml-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg text-sm font-medium text-gray-800 transition-colors whitespace-nowrap w-full md:w-auto">
                            Visit Profile →
                        </button>
                    </a>
                ))}
            </div>
        </Section>
    );
}
