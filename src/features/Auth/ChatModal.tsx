import { useState, useEffect } from "react";
import { useGetMessagesQuery, useSendMessageMutation, useMarkAsReadMutation } from "../../redux/api/chatApi";

interface ChatModalProps {
  currentUserId: string;
  otherUserId: string;
  otherUserName: string;
  onClose: () => void;
}

const ChatModal = ({ currentUserId, otherUserId, otherUserName, onClose }: ChatModalProps) => {
  const { data: messages, refetch } = useGetMessagesQuery({ currentUserId, otherUserId });
  const [sendMessage] = useSendMessageMutation();
  const [markAsRead] = useMarkAsReadMutation();
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    markAsRead({ currentUserId, otherUserId });
  }, [currentUserId, otherUserId]);

  const handleSend = async () => {
    if (newMessage.trim()) {
      await sendMessage({ currentUserId, otherUserId, message: newMessage });
      setNewMessage("");
      refetch(); // تحديث الرسائل بعد الإرسال
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-md shadow-lg p-4 flex flex-col">
        <h2 className="text-lg font-bold mb-4 text-blue-600">شات مع {otherUserName}</h2>
        
        {/* الرسائل */}
        <div className="flex-1 overflow-y-auto max-h-80 border rounded p-3 mb-4">
          {messages?.map((msg) => (
            <div key={msg.id} className={`mb-2 ${msg.senderId === currentUserId ? "text-right" : "text-left"}`}>
              <div
                className={`inline-block px-3 py-2 rounded-lg ${
                  msg.senderId === currentUserId ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.messageText}
              </div>
            </div>
          ))}
        </div>

        {/* إدخال الرسالة */}
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded px-3 py-2"
            placeholder="اكتب رسالتك..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            إرسال
          </button>
        </div>

        <button onClick={onClose} className="mt-4 w-full bg-gray-200 py-2 rounded hover:bg-gray-300">إغلاق</button>
      </div>
    </div>
  );
};

export default ChatModal;
