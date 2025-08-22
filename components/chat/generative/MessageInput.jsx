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
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSend = () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;
    if (onSend) onSend({ text: input.trim(), image: selectedImage });
    setInput("");
    setSelectedImage(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.focus();
    }
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6">
      <div className="relative max-w-4xl mx-auto">
        {/* Enhanced Image Preview */}
        {selectedImage && (
          <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
              <div className="relative w-full sm:w-auto">
                <img
                  src={selectedImage}
                  alt="Selected for AI analysis"
                  className="w-full sm:max-w-xs max-h-24 sm:max-h-32 rounded-lg border-2 border-purple-200 object-cover shadow-lg"
                />
                <div className="absolute top-1 right-1 px-1 py-0.5 bg-purple-600 text-white text-xs rounded font-medium">
                  Ready for AI
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600"
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
                  <h4 className="font-semibold text-purple-700 text-sm sm:text-base">
                    Vision AI Ready
                  </h4>
                </div>
                <p className="text-xs text-purple-600 mb-2">
                  Gambar akan dianalisis menggunakan computer vision canggih
                  untuk memberikan insight mendalam
                </p>
              </div>
            </div>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative"
        >
          {/* Enhanced Input Container */}
          <div className="relative flex items-end bg-white border-2 border-purple-200 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 focus-within:border-purple-400 focus-within:shadow-2xl focus-within:bg-gradient-to-r focus-within:from-white focus-within:to-purple-50/30">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Describe your creative vision or ask anything..."
              className="flex-1 resize-none bg-transparent px-3 sm:px-6 py-3 sm:py-4 pt-4 sm:pt-6 pr-12 sm:pr-16 focus:outline-none text-sm leading-5 sm:leading-6 placeholder-gray-400 min-h-[50px] sm:min-h-[60px] max-h-[80px] sm:max-h-[100px]"
              rows="1"
              disabled={isLoading}
              style={{ height: "auto" }}
            />

            <button
              type="submit"
              disabled={(!input.trim() && !selectedImage) || isLoading}
              className="absolute right-2 sm:right-3 bottom-2 sm:bottom-3 p-2 rounded-lg sm:rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:scale-105 group bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 text-white shadow-lg enabled:hover:shadow-xl"
            >
              {isLoading ? (
                <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  <svg
                    className="animate-spin w-3 h-3 sm:w-4 sm:h-4 text-white"
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
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5"
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

        {/* Enhanced Status Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 sm:mt-3 px-1 sm:px-2 gap-1 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-xs sm:text-sm text-gray-500 flex items-center gap-1 sm:gap-2">
              {isLoading ? (
                <>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 animate-spin"
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
                    <span className="font-medium text-purple-600">
                      Neural networks processing...
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-green-500"
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
                  <span className="hidden sm:inline">
                    Press Enter to generate • Shift+Enter for new line
                  </span>
                  <span className="sm:hidden">Enter to send</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {input.length > 0 && (
              <div className="text-xs sm:text-sm text-gray-400 font-medium flex items-center gap-1">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {input.length} Karakter
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
