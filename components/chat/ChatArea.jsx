import React, { useState, useRef, useEffect } from "react";
import MessageInput from "./MessageInput";
import Profil from "/public/logo.png";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";

export default function ChatArea() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleSend = async (message) => {
    // message: { text: string, image: base64|null }

    if ((!message.text && !message.image) || isLoading) return;

    const newMessage = {
      id: Date.now(),
      text: message.text,
      image: message.image,
      sender: "user",
    };
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    if (message.image) {
      console.log("Image...");

      try {
        const res = await fetch("http://localhost:3001/image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: message.image,
            messagetxt: message.text,
          }), // or send image too if supported
        });

        const data = await res.json();

        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, text: data.reply, sender: "ai" },
        ]);
      } catch (err) {
        console.error(err);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "⚠️ Error: gagal ambil balasan.",
            sender: "ai",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Text....");
      try {
        const res = await fetch("http://localhost:3001/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: message.text }), // or send image too if supported
        });

        const data = await res.json();

        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, text: data.reply, sender: "ai" },
        ]);
      } catch (err) {
        console.error(err);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: "⚠️ Error: gagal ambil balasan.",
            sender: "ai",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const { data: session } = useSession();

  return (
    <div className="flex-1 flex flex-col h-full bg-white">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md mx-auto px-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500 to-white flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
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
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                  Hallo {session?.user?.name}
                </h1>
                <p className="text-gray-500 text-sm">
                  Mulai percakapan dengan mengetikkan pesan Anda di bawah
                </p>
              </div>
            </div>
          ) : (
            <div className="px-6 py-6 space-y-6 w-full max-w-6xl mx-auto">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Message Input Area */}
      <div className="border-t bg-white">
        <div className="max-w-6xl mx-auto">
          <MessageInput onSend={handleSend} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
function MessageBubble({ message }) {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
          isUser
            ? "bg-red-500 text-white"
            : "bg-gray-100 text-gray-600 border-2 border-gray-200"
        }`}
      >
        {isUser ? (
          "U"
        ) : (
          <Image src={Profil} height={50} width={50} alt="profile" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 ${isUser ? "text-right" : ""}`}>
        <div
          className={`inline-block px-4 py-3 rounded-2xl text-sm leading-relaxed max-w-full ${
            isUser
              ? "bg-red-500 text-white rounded-br-md"
              : "bg-gray-100 text-gray-800 rounded-bl-md border border-gray-200"
          }`}
        >
          {/* Show image if exists */}
          {message.image && (
            <div className="mb-3">
              <img
                src={message.image}
                alt="sent image"
                className="max-w-full max-h-80 rounded-lg object-cover shadow-sm"
              />
            </div>
          )}
          {message.text && (
            <div className="whitespace-pre-wrap break-words">
              {message.text}
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div
          className={`text-xs text-gray-400 mt-1 px-1 ${
            isUser ? "text-right" : ""
          }`}
        >
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      {/* AI Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 text-gray-600 border-2 border-gray-200 flex items-center justify-center text-xs font-medium">
        <Image src={Profil} height={50} width={50} alt="profile" />
      </div>

      {/* Typing Animation */}
      <div className="bg-gray-100 border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
          <span className="text-xs text-gray-500 ml-2">
            AI sedang mengetik...
          </span>
        </div>
      </div>
    </div>
  );
}
