import React, { useState, useRef, useEffect } from "react";
import MessageInput from "./MessageInput";
import Profil from "/public/logo.png";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";

export default function ChatGenerative() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const handleSend = async (message) => {
    if (!message.text || isLoading) return;

    const newMessage = {
      id: Date.now(),
      text: message.text,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const res = await fetch("https://merdekai.my.id/imagegen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.text }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          image: data.reply,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "⚠️ Error: gagal ambil gambar.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
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
              <div className="text-center max-w-2xl mx-auto px-6">
                <div className="mb-8">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg mb-6">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Halo, {session?.user?.name || ""}
                  </h1>
                  <p className="text-lg text-gray-600">
                    Siap untuk membuat gambar dengan AI?
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-6 py-4 space-y-6 w-full max-w-4xl mx-auto">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  setModalImage={setModalImage}
                />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Message Input Area */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto">
          <MessageInput onSend={handleSend} isLoading={isLoading} />
        </div>
      </div>

      {/* Enhanced Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 cursor-pointer"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] p-6">
            {/* Close button */}
            <button
              className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors z-10 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                setModalImage(null);
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image */}
            <img
              src={modalImage}
              alt="Full size image"
              className="max-w-full max-h-full object-contain rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
function MessageBubble({ message, setModalImage }) {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex items-start gap-4 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
        }`}
      >
        {isUser ? (
          <span className="font-semibold">U</span>
        ) : (
          <Image
            src={Profil}
            height={24}
            width={24}
            alt="AI"
            className="rounded-full"
          />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-3xl ${isUser ? "text-right" : ""}`}>
        <div
          className={`inline-block rounded-lg px-4 py-3 text-sm ${
            isUser
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-100 text-gray-800 rounded-bl-none"
          }`}
        >
          {/* Image */}
          {message.image && (
            <div className={message.text ? "mb-3" : ""}>
              <img
                src={message.image}
                alt="Generated image"
                className="max-w-full max-h-64 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setModalImage(message.image)}
              />
            </div>
          )}

          {/* Text */}
          {message.text && (
            <div className="whitespace-pre-wrap">{message.text}</div>
          )}
        </div>

        {/* Timestamp */}
        <div
          className={`text-xs text-gray-500 mt-1 ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {message.timestamp?.toLocaleTimeString("id-ID", {
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
    <div className="flex items-start gap-4">
      {/* AI Avatar */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-sm font-medium">
        <Image
          src={Profil}
          height={24}
          width={24}
          alt="AI"
          className="rounded-full"
        />
      </div>

      {/* Typing Animation */}
      <div className="flex-1 max-w-3xl">
        <div className="bg-gray-100 rounded-lg rounded-bl-none px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.15s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.3s" }}
              ></div>
            </div>
            <span className="text-sm text-gray-600">
              AI sedang membuat gambar...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
