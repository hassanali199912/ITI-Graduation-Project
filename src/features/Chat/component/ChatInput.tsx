import React, { useState } from "react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-base-100 border-t border-base-300 flex gap-2">
      <input
        type="text"
        placeholder="Type a message"
        className="input input-bordered flex-1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="btn bg-blue-800 text-white" type="submit" disabled={!message.trim()}>
        Send
      </button>
    </form>
  );
};

export default ChatInput; 