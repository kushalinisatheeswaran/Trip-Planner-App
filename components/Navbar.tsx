"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { login, logout } from "@/lib/auth-actions";
import { Github, Mail } from "lucide-react";
import { Session } from "next-auth";

export default function Navbar({ session }: { session: Session | null }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto glass rounded-2xl flex items-center justify-between px-4 py-2 sm:px-6 shadow-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-secondary to-orange-400 p-2 shadow-sm">
             <Image src="/logo.png" alt="Logo" width={24} height={24} className="invert" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground hidden sm:block">
            TripPlanner
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-1 sm:gap-4">
          <Link
            href="/trips"
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-full transition-all"
          >
            My Trips
          </Link>

          <Link
            href="/globe"
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-full transition-all"
          >
            Globe
          </Link>

          {/* Auth Section */}
          <div className="relative ml-2">
            {!session ? (
              <div className="flex items-center gap-2">
                <Button
                  className="rounded-full px-5 bg-foreground text-background hover:bg-foreground/90 shadow-md transition-all active:scale-95"
                  onClick={() => setOpen(!open)}
                >
                  Sign In
                </Button>

                {open && (
                  <div className="absolute right-0 mt-3 w-64 glass rounded-2xl shadow-2xl p-2 border border-border/50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Connect with
                    </div>
                    <button
                      onClick={() => login()}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-foreground hover:bg-accent transition-all group"
                    >
                      <div className="p-1.5 bg-muted rounded-lg group-hover:bg-background transition-colors">
                        <Github size={16} />
                      </div>
                      <span className="text-sm font-medium">GitHub</span>
                    </button>

                    <button
                      onClick={() => login()}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-foreground hover:bg-accent transition-all group"
                    >
                      <div className="p-1.5 bg-muted rounded-lg group-hover:bg-background transition-colors">
                        <Mail size={16} />
                      </div>
                      <span className="text-sm font-medium">Google</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3 pl-2 border-l border-border/50">
                <div className="hidden md:flex flex-col items-end">
                   <span className="text-sm font-semibold truncate max-w-[100px]">
                     {session.user?.name?.split(" ")[0]}
                   </span>
                </div>
                
                {session.user?.image && (
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-tr from-secondary to-orange-400 rounded-full blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                    <Image
                      src={session.user.image}
                      alt="User"
                      width={38}
                      height={38}
                      className="relative rounded-full border-2 border-background ring-1 ring-border/50 shadow-sm"
                      unoptimized
                    />
                  </div>
                )}

                <Button
                  variant="ghost"
                  className="rounded-full w-9 h-9 p-0 hover:bg-destructive/10 hover:text-destructive group transition-colors"
                  onClick={() => logout()}
                >
                  <svg 
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}