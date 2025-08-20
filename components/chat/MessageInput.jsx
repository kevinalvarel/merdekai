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
    const newHeight = Math.min(textarea.scrollHeight, 120); // Max 5 lines
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
    if (onSend) onSend(input);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.focus();
    }
  };

  return (
    <div className="p-4">
      <div className="relative">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative"
        >
          <div className="relative flex items-end bg-white border border-red-500 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 focus-within:border-red-500 focus-within:shadow-md">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Ketikkan pesan Anda di sini..."
              className="flex-1 resize-none bg-transparent px-4 py-3 pr-12 focus:outline-none text-sm leading-6 placeholder-gray-400 min-h-[48px] max-h-[120px]"
              rows="1"
              disabled={isLoading}
              style={{ height: "auto" }}
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 bottom-2 p-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-gray-100 group"
            >
              {isLoading ? (
                <div className="w-5 h-5">
                  <svg
                    className="animate-spin w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              ) : (
                <svg
                  className={`w-5 h-5 transition-colors duration-200 ${
                    input.trim()
                      ? "text-red-500 group-hover:text-red-600"
                      : "text-gray-400"
                  }`}
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
        </form>

        {/* Character count or status */}
        <div className="flex justify-between items-center mt-2 px-1">
          <div className="text-xs text-gray-400">
            {isLoading
              ? "AI sedang memproses..."
              : "Tekan Enter untuk mengirim, Shift+Enter untuk baris baru"}
          </div>
          {input.length > 0 && (
            <div className="text-xs text-gray-400">{input.length} karakter</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
