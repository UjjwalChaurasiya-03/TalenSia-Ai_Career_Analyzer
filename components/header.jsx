"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Dynamic background that responds to scroll */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ${
          scrolled 
            ? 'bg-background/80 backdrop-blur-xl border-b border-white/20' 
            : 'bg-background/40 backdrop-blur-md border-b border-white/5'
        }`}
      />

      {/* Animated mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-purple-500/3 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(147,51,234,0.08),transparent_50%)]" />
      </div>

      {/* Shimmer effect on top edge */}
      <div className="absolute top-0 inset-x-0 h-px overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-shimmer" />
      </div>

      <nav className="relative container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="group relative z-10 flex items-center">
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/0 via-primary/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
          <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg group-hover:bg-white/5 transition-all duration-300">
            <Image
              src="/name11.png"
              alt="TalenSia Logo"
              width={140}
              height={40}
              className="h-8 w-auto object-contain relative transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <SignedIn>
          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            <Link href="/dashboard" className="group relative">
              <Button
                variant="ghost"
                className="relative px-4 h-9 rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                <LayoutDashboard className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                <span className="relative font-medium text-sm">Industry Insights</span>
              </Button>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-500 group-hover:w-3/4 transition-all duration-300 rounded-full" />
            </Link>
          </div>
        </SignedIn>

        {/* Right Actions */}
        <div className="flex items-center gap-2 relative z-10">
          <SignedIn>
            {/* Mobile Dashboard Link */}
            <Link href="/dashboard" className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="group relative overflow-hidden rounded-lg h-9 px-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-primary/25 transition-all duration-300 border-0">
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <Sparkles className="h-3.5 w-3.5 mr-2 relative z-10" />
                  <span className="hidden sm:inline text-sm font-medium relative z-10">Growth Tools</span>
                  <span className="sm:hidden text-sm font-medium relative z-10">Tools</span>
                  <ChevronDown className="h-3.5 w-3.5 ml-1 relative z-10 transition-transform duration-300 group-hover:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 mt-2 border border-white/10 bg-background/95 backdrop-blur-xl shadow-xl rounded-xl p-1.5"
              >
                <div className="px-3 py-2 mb-1">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Career Growth</p>
                </div>

                <DropdownMenuItem asChild className="group cursor-pointer rounded-lg p-0 mb-0.5">
                  <Link href="/resume" className="flex items-center gap-3 py-2.5 px-2.5 hover:bg-blue-500/5 transition-all duration-200">
                    <div className="p-1.5 rounded-md bg-blue-500/10 border border-blue-500/20 group-hover:border-blue-500/40 group-hover:bg-blue-500/15 transition-all duration-200">
                      <FileText className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Build Resume</p>
                      <p className="text-[11px] text-muted-foreground">AI-powered builder</p>
                    </div>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="group cursor-pointer rounded-lg p-0 mb-0.5">
                  <Link href="/ai-cover-letter" className="flex items-center gap-3 py-2.5 px-2.5 hover:bg-purple-500/5 transition-all duration-200">
                    <div className="p-1.5 rounded-md bg-purple-500/10 border border-purple-500/20 group-hover:border-purple-500/40 group-hover:bg-purple-500/15 transition-all duration-200">
                      <PenBox className="h-3.5 w-3.5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Cover Letter</p>
                      <p className="text-[11px] text-muted-foreground">Personalized letters</p>
                    </div>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="group cursor-pointer rounded-lg p-0">
                  <Link href="/interview" className="flex items-center gap-3 py-2.5 px-2.5 hover:bg-green-500/5 transition-all duration-200">
                    <div className="p-1.5 rounded-md bg-green-500/10 border border-green-500/20 group-hover:border-green-500/40 group-hover:bg-green-500/15 transition-all duration-200">
                      <GraduationCap className="h-3.5 w-3.5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Interview Prep</p>
                      <p className="text-[11px] text-muted-foreground">Practice with AI</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button
                className="relative overflow-hidden rounded-lg h-9 px-5 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-primary/25 transition-all duration-300 border-0"
              >
                <span className="relative z-10 text-sm font-medium">Sign In</span>
                <div className="absolute inset-0 bg-white/10 translate-x-full hover:translate-x-0 transition-transform duration-300" />
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-500 rounded-full opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 ring-2 ring-white/10 hover:ring-primary/30 transition-all duration-300",
                    userButtonPopoverCard: "shadow-xl border border-white/10 backdrop-blur-xl rounded-xl",
                    userPreviewMainIdentifier: "font-semibold text-sm",
                    userButtonPopoverActionButton: "hover:bg-primary/5 rounded-lg transition-colors duration-200 text-sm",
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
          </SignedIn>
        </div>
      </nav>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
}