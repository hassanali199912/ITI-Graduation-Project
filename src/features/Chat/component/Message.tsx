interface IMessageProps {
    content: string,
    image: string,
    status: string,
    name: string,
    direction?: "start" | "end",

};

export const Message: React.FC<IMessageProps> = ({
    content,
    image,
    status,
    name,
    direction,
}: IMessageProps) => {
    return (
        <div>
            <div className={`chat chat-${direction}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt={name || "Image"}
                            src={image || "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"}
                        />
                    </div>
                </div>
                <div className="chat-header">
                    {name}
                    <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{content}</div>
                <div className="chat-footer opacity-50">{status}</div>
            </div>
        </div>
    );
}
