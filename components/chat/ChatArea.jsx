import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

export default function ChatArea() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Halo!", sender: "user" },
    { id: 2, text: "Selamat datang di chat.", sender: "ai" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi untuk menambah pesan baru
  const handleSend = (text) => {
    if (!text.trim()) return;
    const newMessage = {
      id: Date.now(),
      text,
      sender: "user",
    };
    setMessages((prev) => [...prev, newMessage]);
    // Simulasi balasan AI
    setIsLoading(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Ini balasan dari AI.",
          sender: "ai",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400">Belum ada pesan.</div>
        ) : (
          messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
        )}
      </div>
      <MessageInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}

function MessageBubble({ message }) {
  const isUser = message.sender === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow-sm ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
