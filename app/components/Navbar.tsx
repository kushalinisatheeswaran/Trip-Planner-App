"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/auth-actions";
import { Github, Mail } from "lucide-react";
import { Session } from "next-auth";

export default function Navbar({session}:{session:Session | null}) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-4 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <span className="text-2xl font-bold text-gray-800">
            Travel Planner
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-6 relative">

          <Link href="/trips" className="text-gray-600 hover:text-blue-500">
            My Trips
          </Link>

          <Link href="/globe" className="text-gray-600 hover:text-blue-500">
            Globe
          </Link>

          {/* Sign In Button */}
          <div className="relative">

            <Button
              variant="outline"
              onClick={() => setOpen(!open)}
            >
              Sign In
            </Button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-2 space-y-2 z-50">

                {/* GitHub */}
                <button
                  onClick={() => login("github")}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md"
                >
                  <Github size={18} />
                  GitHub
                </button>

                {/* Google */}
                <button
                  onClick={() => login("google")}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md"
                >
                  <Mail size={18} />
                  Google
                </button>

              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}