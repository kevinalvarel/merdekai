import React, { useState, useRef, useEffect } from "react";
import MessageInput from "./MessageInput";
import Profil from "/public/logo.png";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";

export default function ChatArea() {
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
    if ((!message.text && !message.image) || isLoading) return;
    const dataChat = {
      id: "123abc",
      name: "Charlie",
      email: "charlie@example.com",
      image: "https://example.com/avatar.png",
    };

    const newMessage = {
      id: Date.now(),
      text: message.text || "",
      image: message.image || null,
      sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    if (message.image) {
      console.log("Image...");

      try {
        const res = await fetch("/api/image", {
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
        const res = await fetch("/api/chat", {
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
                  Hallo {session?.user?.name || ""}
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

      {/* Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 cursor-pointer animate-fade-in"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-[95vw] max-h-[95vh] p-4">
            {/* Close button */}
            <button
              className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors z-10 shadow-lg"
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
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
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
            ? "bg-gradient-to-b from-red-500 to-red-200 text-white"
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
          className={`inline-block rounded-2xl text-sm leading-relaxed max-w-full ${
            isUser
              ? "bg-gradient-to-b from-red-600 to-red-400 text-white rounded-br-md"
              : "bg-gray-100 text-gray-800 rounded-bl-md border border-gray-200"
          } ${message.image && !message.text ? "p-1" : "px-4 py-3"}`}
        >
          {/* Show image if exists */}
          {message.image && (
            <div className={message.text ? "mb-3" : ""}>
              <div className="relative group">
                <img
                  src={message.image}
                  alt="sent image"
                  className={`max-w-full max-h-80 object-cover shadow-lg transition-transform duration-200 group-hover:scale-[1.02] cursor-pointer ${
                    message.text ? "rounded-lg" : "rounded-xl"
                  }`}
                  onClick={() => setModalImage(message.image)}
                />
                {/* Image overlay for better visual feedback */}
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100"></div>
              </div>
              {/* Image info */}
            </div>
          )}
          {message.text && (
            <div className="whitespace-pre-wrap break-words">
              <FormattedText text={message.text} />
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div
          className={`text-xs text-gray-400 mt-1 px-1 ${
            isUser ? "text-right" : ""
          }`}
        >
          {new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
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

function FormattedText({ text }) {
  const formatText = (text) => {
    // Split by lines to handle line-based formatting
    const lines = text.split("\n");
    const formattedLines = [];

    lines.forEach((line, lineIndex) => {
      // Check for separator line (---)
      if (line.trim() === "---") {
        formattedLines.push(
          <div
            key={`separator-${lineIndex}`}
            className="my-3 border-t border-gray-300"
          ></div>
        );
        return;
      }

      // Check for heading (### text)
      const headingMatch = line.match(/^###\s+(.+)/);
      if (headingMatch) {
        // Apply inline formatting to heading content too
        const headingContent = formatInlineText(headingMatch[1], lineIndex);
        formattedLines.push(
          <h3
            key={`heading-${lineIndex}`}
            className="text-lg font-semibold text-gray-800 mt-4 mb-2"
          >
            {headingContent}
          </h3>
        );
        return;
      }

      // For regular lines, apply inline formatting
      const formattedLine = formatInlineText(line, lineIndex);
      if (line.trim() !== "") {
        formattedLines.push(
          <div key={`line-${lineIndex}`} className="mb-1">
            {formattedLine}
          </div>
        );
      } else {
        // Empty line
        formattedLines.push(<br key={`br-${lineIndex}`} />);
      }
    });

    return formattedLines;
  };

  const formatInlineText = (text, lineIndex) => {
    // Replace **text** with bold
    const boldRegex = /\*\*(.*?)\*\*/g;
    // Replace *text* with italic
    const italicRegex = /\*(.*?)\*/g;
    // Replace `code` with inline code
    const codeRegex = /`(.*?)`/g;

    let parts = [];
    let lastIndex = 0;

    // First handle bold text
    const boldMatches = [...text.matchAll(boldRegex)];
    const italicMatches = [...text.matchAll(italicRegex)];
    const codeMatches = [...text.matchAll(codeRegex)];

    // Combine all matches and sort by index
    const allMatches = [
      ...boldMatches.map((m) => ({ ...m, type: "bold" })),
      ...italicMatches.map((m) => ({ ...m, type: "italic" })),
      ...codeMatches.map((m) => ({ ...m, type: "code" })),
    ].sort((a, b) => a.index - b.index);

    // Remove overlapping matches (prioritize bold over italic)
    const filteredMatches = [];
    for (let i = 0; i < allMatches.length; i++) {
      const current = allMatches[i];
      const isOverlapping = filteredMatches.some(
        (existing) =>
          (current.index >= existing.index &&
            current.index < existing.index + existing[0].length) ||
          (existing.index >= current.index &&
            existing.index < current.index + current[0].length)
      );

      if (!isOverlapping) {
        filteredMatches.push(current);
      }
    }

    filteredMatches.forEach((match, index) => {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lineIndex}-${index}`}>
            {text.slice(lastIndex, match.index)}
          </span>
        );
      }

      // Add the formatted match
      const content = match[1];
      if (match.type === "bold") {
        parts.push(
          <strong key={`bold-${lineIndex}-${index}`} className="font-bold">
            {content}
          </strong>
        );
      } else if (match.type === "italic") {
        parts.push(
          <em key={`italic-${lineIndex}-${index}`} className="italic">
            {content}
          </em>
        );
      } else if (match.type === "code") {
        parts.push(
          <code
            key={`code-${lineIndex}-${index}`}
            className="bg-gray-200 px-1 py-0.5 rounded text-sm font-mono"
          >
            {content}
          </code>
        );
      }

      lastIndex = match.index + match[0].length;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(
        <span key={`text-end-${lineIndex}`}>{text.slice(lastIndex)}</span>
      );
    }

    return parts.length > 0 ? parts : [text];
  };

  return <div>{formatText(text)}</div>;
}
