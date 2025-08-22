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
        const res = await fetch("http://localhost:3001/chat", {
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
    <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-hidden relative z-10">
        <div className="h-full overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full p-8">
              <div className="text-center max-w-4xl mx-auto">
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl">
                    <svg
                      className="w-12 h-12 text-white"
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
                </div>

                <h1 className="text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Halo, {session?.user?.name || "Creator"}
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Siap menciptakan sesuatu yang luar biasa?
                  <br />
                  <span className="text-purple-600 font-medium">
                    AI generatif terdepan
                  </span>{" "}
                  siap membantu ide kreatif Anda
                </p>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="group p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">
                      Lightning Fast
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Respons AI super cepat dengan teknologi neural network
                      terbaru
                    </p>
                  </div>

                  <div className="group p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">Vision AI</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Analisis gambar mendalam dengan computer vision canggih
                    </p>
                  </div>

                  <div className="group p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">
                      Creative Genius
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Model generatif yang menghasilkan konten kreatif dan
                      inovatif
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-12 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-6">
                    ✨ Mulai dengan prompt ini:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200/50 cursor-pointer hover:shadow-md transition-all">
                      <p className="text-sm text-gray-700">
                        "Buatkan ide kreatif untuk..."
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 cursor-pointer hover:shadow-md transition-all">
                      <p className="text-sm text-gray-700">
                        "Analisis gambar ini dan jelaskan..."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-6 py-8 space-y-8 w-full max-w-6xl mx-auto">
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
      <div className="relative z-10 border-t border-purple-100 bg-white/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          <MessageInput onSend={handleSend} isLoading={isLoading} />
        </div>
      </div>

      {/* Enhanced Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center z-50 cursor-pointer animate-fade-in"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] p-6">
            {/* Close button */}
            <button
              className="absolute -top-3 -right-3 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all z-10 shadow-2xl border border-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                setModalImage(null);
              }}
            >
              <svg
                className="w-6 h-6"
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
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-white/20"
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
      className={`flex items-start gap-6 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-medium shadow-lg ${
          isUser
            ? "bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 text-white"
            : "bg-white border-2 border-purple-200 text-gray-600"
        }`}
      >
        {isUser ? (
          <span className="font-bold">U</span>
        ) : (
          <div className="relative">
            <Image
              src={Profil}
              height={32}
              width={32}
              alt="AI"
              className="rounded-xl"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-4xl ${isUser ? "text-right" : ""}`}>
        {/* Message Header */}
        {!isUser && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Assistant
            </span>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              Neural
            </div>
          </div>
        )}

        <div
          className={`inline-block rounded-2xl text-sm leading-relaxed shadow-xl ${
            isUser
              ? "bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 text-white rounded-br-lg"
              : "bg-white text-gray-800 rounded-bl-lg border border-purple-100"
          } ${message.image && !message.text ? "p-3" : "px-6 py-5"}`}
        >
          {/* Show image if exists */}
          {message.image && (
            <div className={message.text ? "mb-5" : ""}>
              <div className="relative group">
                <img
                  src={message.image}
                  alt="uploaded image"
                  className={`max-w-full max-h-96 object-cover shadow-xl transition-all duration-300 group-hover:scale-[1.02] cursor-pointer ${
                    message.text ? "rounded-xl" : "rounded-2xl"
                  }`}
                  onClick={() => setModalImage(message.image)}
                />
                {/* Enhanced Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 13l6 6"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {message.text && (
            <div className="whitespace-pre-wrap break-words">
              <FormattedText text={message.text} />
            </div>
          )}
        </div>

        {/* Enhanced Timestamp */}
        <div
          className={`flex items-center gap-2 mt-3 px-2 ${
            isUser ? "justify-end" : "justify-start"
          }`}
        >
          <div className="text-xs text-gray-400">
            {new Date().toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </div>
          {!isUser && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Generated
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-6">
      {/* AI Avatar */}
      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white border-2 border-purple-200 text-gray-600 flex items-center justify-center text-sm font-medium shadow-lg">
        <div className="relative">
          <Image
            src={Profil}
            height={32}
            width={32}
            alt="AI"
            className="rounded-xl"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-400 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Typing Animation */}
      <div className="flex-1 max-w-4xl">
        {/* AI Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Assistant
          </span>
          <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
            Thinking
          </div>
        </div>

        <div className="bg-white border border-purple-100 rounded-2xl rounded-bl-lg px-6 py-5 shadow-xl">
          <div className="flex items-center space-x-3">
            {/* Advanced typing animation */}
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
              <div
                className="w-3 h-3 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.15s" }}
              ></div>
              <div
                className="w-3 h-3 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.3s" }}
              ></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">
                AI sedang memproses neural networks...
              </span>
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-purple-400 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
            </div>
          </div>
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
