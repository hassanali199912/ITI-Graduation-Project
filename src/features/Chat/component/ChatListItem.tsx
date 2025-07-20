import React from "react";

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  avatar: string;
}

interface ChatListItemProps {
  chat: Chat;
  isSelected?: boolean;
  onClick?: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, isSelected = false, onClick }) => (
  <li 
    className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-base-200 transition ${isSelected ? 'bg-base-200' : ''}`}
    onClick={onClick}
  >
    <div className="avatar">
      <div className="w-12 rounded-full">
        <img src={chat.avatar} alt={chat.name} />
      </div>
    </div>
    <div>
      <div className="font-semibold">{chat.name}</div>
      <div className="text-xs text-base-content/60 truncate max-w-[140px]">
        {chat.lastMessage}
      </div>
    </div>
  </li>
);

export default ChatListItem; 