import React from "react";

interface ChatHeaderProps {
  avatar: string;
  name: string;
  status?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ avatar, name, status = "online" }) => (
  <div className="flex items-center gap-3 p-4 border-b border-base-300 bg-base-100">
    <div className="avatar">
      <div className="w-10 rounded-full">
        <img src={avatar} alt={name} />
      </div>
    </div>
    <div>
      <div className="font-semibold">{name}</div>
      <div className="text-xs text-base-content/60">{status}</div>
    </div>
  </div>
);

export default ChatHeader; 