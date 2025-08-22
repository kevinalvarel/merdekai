"use client";
import React, { useState } from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "../../components/chat/Sidebar";
import {
  IconBrain,
  IconImageInPicture,
  IconLogin,
  IconPencil,
  IconUserBolt,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import MerdekaiLogo from "@/public/logo.png";
import "../globals.css";
import { authClient } from "@/lib/auth-client";

export default function ChatLayout({ children }) {
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // redirect to login page
        },
      },
    });
  };

  const links = [
    {
      label: "Percakapan Baru",
      href: "/chat",
      icon: <IconPencil className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
    {
      label: "Quiz Nasional",
      href: "/chat/quiz",
      icon: <IconBrain className="h-5 w-5 shrink-0 text-neutral-700" />,
    },
    {
      label: "Generative AI",
      href: "/chat/generative",
      icon: (
        <IconImageInPicture className="h-5 w-5 shrink-0 text-neutral-700" />
      ),
    },
  ];

  return (
    <html>
      <body>
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
                  onClick={handleSignOut}
                  link={{
                    label: "Keluar",
                    icon: (
                      <IconLogin className="h-5 w-5 shrink-0 text-neutral-700" />
                    ),
                    href: "/",
                  }}
                />
              </div>
            </SidebarBody>
          </Sidebar>
          {/* MAIN CONTENT AREA */}
          {children}
        </div>
      </body>
    </html>
  );
}

const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="flex items-center space-x-2">
        <Image
          src={MerdekaiLogo}
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

const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal"
    >
      <div>
        <Image
          src={MerdekaiLogo}
          alt="MerdekAI Logo"
          width={32}
          height={32}
          className="h-8 w-8"
        />
      </div>
    </a>
  );
};
