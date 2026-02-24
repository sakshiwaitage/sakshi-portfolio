import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import Section from "../components/section";
import { sendChatMessage } from "../utils/api";
import type { ChatMessage } from "../utils/api";

const starterQuestions = [
    "What is Sakshi's current education status?",
    "Which technologies does Sakshi know?",
    "Tell me about Sakshi's internship experience.",
];

export default function ResumeChatSection() {
    const [sessionId, setSessionId] = useState<string>();
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: "assistant",
            content: "Ask me anything about Sakshi's resume, skills, projects, and experience.",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);

    const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

    useEffect(() => {
        if (!messagesContainerRef.current) {
            return;
        }
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }, [messages, isLoading]);

    const handleAsk = async (question: string) => {
        const text = question.trim();
        if (!text || isLoading) {
            return;
        }

        const userMessage: ChatMessage = { role: "user", content: text };
        const nextMessages = [...messages, userMessage];

        setMessages(nextMessages);
        setInput("");
        setError("");
        setIsLoading(true);

        try {
            const response = await sendChatMessage({
                message: text,
                session_id: sessionId,
                history: nextMessages.slice(-4),
            });

            setSessionId(response.session_id);
            setMessages((prev) => [...prev, { role: "assistant", content: response.answer }]);
        } catch (chatError) {
            const message = chatError instanceof Error ? chatError.message : "Unable to send message.";
            setError(message);
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "I could not process that request right now. Please try again.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        void handleAsk(input);
    };

    return (
        <Section title="AI Resume Chat">
            <div className="w-full border border-gray-200 rounded-xl p-4 md:p-5 bg-white shadow-sm">
                <div className="flex flex-wrap gap-2 mb-4">
                    {starterQuestions.map((question) => (
                        <button
                            key={question}
                            type="button"
                            onClick={() => void handleAsk(question)}
                            className="text-xs md:text-sm border border-gray-300 rounded-full px-3 py-1.5 hover:bg-gray-100 transition"
                            disabled={isLoading}
                        >
                            {question}
                        </button>
                    ))}
                </div>

                <div
                    ref={messagesContainerRef}
                    className="h-80 overflow-y-auto border border-gray-200 rounded-lg p-3 space-y-3 bg-gray-50"
                >
                    {messages.map((message, index) => (
                        <div
                            key={`${message.role}-${index}`}
                            className={`max-w-[90%] px-3 py-2 rounded-lg text-sm leading-6 whitespace-pre-line ${
                                message.role === "user"
                                    ? "ml-auto bg-indigo-600 text-white"
                                    : "bg-white border border-gray-200 text-gray-700"
                            }`}
                        >
                            {message.content}
                        </div>
                    ))}
                    {isLoading ? (
                        <div className="max-w-[90%] px-3 py-2 rounded-lg text-sm leading-6 bg-white border border-gray-200 text-gray-500">
                            Thinking...
                        </div>
                    ) : null}
                </div>

                <form onSubmit={onSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
                    <input
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        placeholder="Ask about skills, projects, education, experience..."
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={!canSend}
                        className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        Send
                    </button>
                </form>
                {error ? <p className="text-red-600 text-xs mt-2">{error}</p> : null}
            </div>
        </Section>
    );
}
