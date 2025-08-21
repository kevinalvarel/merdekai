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
    <div className="p-4">
      <div className="relative">
        {/* Image Preview */}
        {selectedImage && (
          <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3">
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-xs max-h-40 rounded-lg border border-gray-300 object-cover shadow-sm"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="flex-shrink-0 p-1 rounded-full hover:bg-gray-200 transition-colors"
                type="button"
              >
                <svg
                  className="w-4 h-4 text-gray-500"
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
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Gambar akan dikirim bersama pesan
            </p>
          </div>
        )}

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
              className="flex-1 resize-none bg-transparent px-4 py-3 pl-12 pr-12 focus:outline-none text-sm leading-6 placeholder-gray-400 min-h-[48px] max-h-[120px]"
              rows="1"
              disabled={isLoading}
              style={{ height: "auto" }}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                // Fungsi resize langsung di sini
                const resizeImage = (file, maxWidth = 800, maxHeight = 800) => {
                  return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const img = new Image();
                      img.onload = () => {
                        let canvas = document.createElement("canvas");
                        let ctx = canvas.getContext("2d");

                        let width = img.width;
                        let height = img.height;

                        if (width > maxWidth) {
                          height *= maxWidth / width;
                          width = maxWidth;
                        }
                        if (height > maxHeight) {
                          width *= maxHeight / height;
                          height = maxHeight;
                        }

                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0, width, height);

                        // Hasil base64 (jpeg, kualitas 70%)
                        resolve(canvas.toDataURL("image/jpeg", 0.7));
                      };
                      img.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                  });
                };

                // Resize gambar lalu set ke state
                resizeImage(file).then((resizedBase64) => {
                  console.log("Resized base64 length:", resizedBase64.length);
                  setSelectedImage(resizedBase64); // ini sudah lebih kecil
                });
              }}
              className="hidden"
              id="image-upload"
            />

            <label
              htmlFor="image-upload"
              className="absolute left-2 bottom-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <svg
                className={`w-5 h-5 transition-colors ${
                  selectedImage
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
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
            </label>

            <button
              type="submit"
              disabled={(!input.trim() && !selectedImage) || isLoading}
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
                    input.trim() || selectedImage
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
