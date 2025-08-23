import { useRef, useState, useEffect } from "react";

const MessageInput = ({ onSend, isLoading }) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setInput(e.target.value);
    adjustTextareaHeight(e.target);
  };

  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 80); // Max 3 lines
    textarea.style.height = `${newHeight}px`;
  };

  useEffect(() => {
    if (textareaRef.current) {
      adjustTextareaHeight(textareaRef.current);
    }
  }, [input]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    if (onSend) onSend({ text: input.trim() });
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.focus();
    }
  };
  return (
    <div className="p-4">
      <div className="relative max-w-4xl mx-auto">
        {/* Input Container */}
        <div className="flex items-end gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
          {/* Text Input */}
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              placeholder="Ketik pesan Anda untuk membuat gambar..."
              className="w-full resize-none border-none outline-none text-sm bg-transparent placeholder-gray-500 max-h-20"
              rows={1}
              disabled={isLoading}
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-lg transition-all ${
              input.trim() && !isLoading
                ? "bg-blue-500 text-white hover:bg-blue-600 shadow-md"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            ) : (
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Help Text */}
        <p className="text-xs text-gray-500 mt-2 text-center">
          Tekan Enter untuk kirim • Shift+Enter untuk baris baru
        </p>
      </div>
    </div>
  );
};

export default MessageInput;
