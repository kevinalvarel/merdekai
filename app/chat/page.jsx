"use client";
import React from "react";
import ChatArea from "@/components/chat/ChatArea";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const ChatPage = () => {
  useDocumentTitle("Chat - MerdekAI");
  return <ChatArea />;
};

export default ChatPage;
