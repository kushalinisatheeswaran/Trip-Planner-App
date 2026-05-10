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
    <nav className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 border-b border-white/10 sticky top-0 z-50 backdrop-blur">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/logo.png" alt="Logo" width={38} height={38} />
          <span className="text-lg font-semibold text-white tracking-wide group-hover:text-indigo-300 transition">
            Travel Planner
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            href="/trips"
            className="text-sm font-medium text-gray-300 hover:text-white transition"
          >
            My Trips
          </Link>

          <Link
            href="/globe"
            className="text-sm font-medium text-gray-300 hover:text-white transition"
          >
            Globe
          </Link>

          {/* Auth Section */}
          <div className="relative">

            {!session ? (
              <>
                <Button
                  className="rounded-full px-5 bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={() => setOpen(!open)}
                >
                  Sign In
                </Button>

                {open && (
                  <div className="absolute right-0 mt-3 w-60 bg-slate-900 border border-white/10 rounded-xl shadow-2xl p-2 backdrop-blur">

                    <button
                      onClick={() => login("github")}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white transition"
                    >
                      <Github size={18} />
                      Continue with GitHub
                    </button>

                    <button
                      onClick={() => login("google")}
                      className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white transition"
                    >
                      <Mail size={18} />
                      Continue with Google
                    </button>

                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center gap-3">

                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt="User"
                    width={34}
                    height={34}
                    className="rounded-full border border-white/20"
                    unoptimized
                  />
                )}

                <Button
                  className="rounded-full px-4 bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => logout()}
                >
                  Sign Out
                </Button>

              </div>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}