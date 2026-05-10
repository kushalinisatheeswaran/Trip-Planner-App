"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { login ,logout} from "@/lib/auth-actions";
import { Github, Mail } from "lucide-react";
import { Session } from "next-auth";

export default function Navbar({ session }: { session: Session | null }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={45} height={45} />
          <span className="text-2xl font-bold text-gray-900 tracking-tight">
            Travel Planner
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-6 relative">

          <Link href="/trips" className="text-gray-600 hover:text-black transition">
            My Trips
          </Link>

          <Link href="/globe" className="text-gray-600 hover:text-black transition">
            Globe
          </Link>

          {/* Sign In Button + Dropdown */}
          <div className="relative">

            <div className="relative">

  {!session ? (
    <Button
      variant="outline"
      className="rounded-full px-5 hover:bg-gray-900 hover:text-white transition"
      onClick={() => setOpen(!open)}
    >
      Sign In
    </Button>
  ) : (
    <Button
      variant="outline"
      className="rounded-full px-5 hover:bg-red-600 hover:text-white transition"
      onClick={() => logout()}
    >
      Sign Out
    </Button>
  )}

  {/* Dropdown only when NOT logged in */}
  {!session && open && (
    <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-200 rounded-xl shadow-xl p-2 animate-in fade-in zoom-in-95">

      <button
        onClick={() => login("github")}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        <Github size={18} />
        <span className="text-sm font-medium">Continue with GitHub</span>
      </button>

      <button
        onClick={() => login("google")}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        <Mail size={18} />
        <span className="text-sm font-medium">Continue with Google</span>
      </button>

    </div>
  )}

</div>
            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-200 rounded-xl shadow-xl p-2 animate-in fade-in zoom-in-95">

                {/* GitHub */}
                <button
                  onClick={() => login("github")}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <Github size={18} />
                  <span className="text-sm font-medium">Continue with GitHub</span>
                </button>

                {/* Google */}
                <button
                  onClick={() => login("google")}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <Mail size={18} />
                  <span className="text-sm font-medium">Continue with Google</span>
                </button>

              </div>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}