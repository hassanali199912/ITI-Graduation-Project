import React from "react";
import ChatListItem from "./ChatListItem";

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  avatar: string;
}

interface ChatSidebarProps {
  chatList: Chat[];
  selectedChatId: number | null;
  onChatSelect: (chatId: number) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ chatList, selectedChatId, onChatSelect }) => (
  <aside className="w-full sm:w-80 bg-base-150 border-r border-base-300 flex flex-col">
    {/* Search Bar */}
    <div className="p-4">
      <input
        type="text"
        placeholder="Search chats"
        className="input input-bordered w-full"
      />
    </div>
    {/* Chat List */}
    <ul className="flex-1 overflow-y-auto">
      {chatList.map((chat) => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          isSelected={chat.id === selectedChatId}
          onClick={() => onChatSelect(chat.id)}
        />
      ))}
    </ul>
  </aside>
);

export default ChatSidebar; 