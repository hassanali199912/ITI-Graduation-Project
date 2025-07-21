// services/chatHub.ts
import * as signalR from "@microsoft/signalr";

const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`http://academix1.runasp.net/chatHub`, {
        accessTokenFactory: () => localStorage.getItem("token") ?? "",
    })
    .withAutomaticReconnect()
    .build();

export const startConnection = async () => {
    if (hubConnection.state === signalR.HubConnectionState.Disconnected) {
        try {
            await hubConnection.start();
            console.log("SignalR connected");
        } catch (err) {
            console.error("SignalR connection failed: ", err);
        }
    }
};

export const sendMessage = (receiverId: string, message: string) => {
    return hubConnection.invoke("SendMessage", receiverId, message);
};

export const markAsRead = (otherUserId: string) => {
    return hubConnection.invoke("MarkMessagesAsRead", otherUserId);
};

export const onReceiveMessage = (callback: (msg: any) => void) => {
    hubConnection.on("ReceiveMessage", callback);
};

export const onMessageSent = (callback: (msg: any) => void) => {
    hubConnection.on("MessageSent", callback);
};

export const onMessagesMarkedAsRead = (callback: (userId: string) => void) => {
    hubConnection.on("MessagesMarkedAsRead", callback);
};


hubConnection.on("ReceiveMessage", (rez) => {
    console.log(rez);

});