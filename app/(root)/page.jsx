"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/chat/Sidebar";
import {
  IconArrowLeft,
  IconLogin,
  IconPencil,
  IconUserBolt,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import ChatArea from "@/components/chat/ChatArea";
import Image from "next/image";

const SidebarChat = () => {
  const links = [
    {
      label: "Percakapan Baru",
      href: "#",
      icon: <IconPencil className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
    {
      label: "Profil",
      href: "#",
      icon: <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row ",
        "h-screen"
      )}
    >
      {/* SIDEBAR AREA */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Login",
                icon: (
                  <IconLogin className="h-5 w-5 shrink-0 text-neutral-700" />
                ),
                href: "/login",
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {/* CHAT AREA */}
      <ChatArea />
    </div>
  );
};
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="flex items-center space-x-2">
        <Image
          src="/Logo.png"
          alt="MerdekAI Logo"
          width={32}
          height={32}
          className="h-8 w-8"
        />
        <p className="text-lg font-semibold">
          Merdek<span className="font-semibold text-red-400">AI</span>
        </p>
      </div>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
    >
      <div>
        <Image
          src="/Logo.png"
          alt="MerdekAI Logo"
          width={32}
          height={32}
          className="h-8 w-8"
        />
      </div>
    </a>
  );
};

export default SidebarChat;
