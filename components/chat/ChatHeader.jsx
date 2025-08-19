import React from "react";

const ChatHeader = () => {
  return (
    <div className="hidden border-b border-gray-200 bg-neutral-100 w-full sticky top-0 z-10 md:flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-4 py-3 sm:px-6 sm:py-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">MerdekAI</h2>
        <p className="text-sm text-gray-600">Ask me anything!</p>
      </div>
      {/* Tambahkan info user, status, atau aksi di sini jika diperlukan */}
    </div>
  );
};

export default ChatHeader;
