import React from "react";

const ChatWelcome: React.FC = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-tl from-blue-800/15 to-white">
            <div className="text-center space-y-6 p-8">
                {/* Icon */}
                <div className="w-24 h-24 mx-auto bg-blue-800/10 rounded-full flex items-center justify-center">
                    <svg
                        className="w-12 h-12 text-blue-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                </div>

                {/* Title */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome to Chat
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Select a conversation to start messaging
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatWelcome; 