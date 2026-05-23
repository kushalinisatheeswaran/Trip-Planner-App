import React from "react";
import { Map as MapIcon } from "lucide-react";
import { auth } from "@/auth";
import AuthButton from "@/components/auth-button";
import Image from "next/image";

export default async function LandingPage() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <div className="flex flex-col min-h-screen selection:bg-secondary/30">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[92vh] w-full overflow-hidden">
          {/* Background Image with Parallax-like feel */}
          <div className="absolute inset-0">
            <Image
              src="/hero.png"
              alt="Travel Hero"
              fill
              className="object-cover scale-105 animate-out fade-out zoom-in-110 duration-1000"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />
          </div>

          <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center">
            <div className="space-y-6 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
                Your next <span className="text-secondary drop-shadow-sm">adventure</span> <br className="hidden md:block" />
                starts here
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto drop-shadow-md">
                Plan, organize, and share your perfect trip with the ultimate 
                travel companion for the modern explorer.
              </p>
              
              {/* Floating CTA / Search Bar Vibe */}
              <div className="pt-8 w-full max-w-2xl mx-auto">
                <div className="glass p-2 rounded-3xl shadow-2xl flex flex-col sm:flex-row gap-2 items-center">
                  <div className="flex-1 flex items-center gap-4 px-6 py-3 w-full border-b sm:border-b-0 sm:border-r border-border/50">
                    <MapIcon className="h-5 w-5 text-secondary shrink-0" />
                    <div className="text-left overflow-hidden">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Destination</p>
                      <p className="text-sm font-medium text-foreground truncate">Where are you going?</p>
                    </div>
                  </div>
                  <div className="px-2 w-full sm:w-auto">
                    <AuthButton
                      isLoggedIn={isLoggedIn}
                      className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 group"
                    >
                      {isLoggedIn ? (
                        <>
                          Go to Dashboard
                          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      ) : (
                        "Get Started Free"
                      )}
                    </AuthButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-1">
                <div className="w-1 h-2 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 md:py-32 bg-background relative overflow-hidden">
          {/* Subtle Background Elements */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />

          <div className="container mx-auto px-4 relative">
            <div className="max-w-2xl mx-auto text-center mb-20 space-y-4">
              <h2 className="text-sm font-bold text-secondary uppercase tracking-[0.2em]">The Experience</h2>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Plan with confidence</h3>
              <p className="text-lg text-muted-foreground">
                Everything you need to craft the perfect itinerary, all in one place.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="group p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 transition-colors group-hover:bg-secondary/20">
                  <MapIcon className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Interactive Maps</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Visualize your entire journey with high-fidelity interactive maps. Find the best routes and stops.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 transition-colors group-hover:bg-primary/10">
                  <svg className="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Itineraries</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Organize your days with precision. Our smart system helps you optimize your time and energy.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 transition-colors group-hover:bg-emerald-100">
                  <svg className="h-7 w-7 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-6.5L12 7" />
                    <path d="M15 5v4h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Drag & Drop Flow</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Easily rearrange destinations and activities with a seamless drag-and-drop interface.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-24 container mx-auto px-4">
          <div className="relative rounded-[3rem] overflow-hidden bg-foreground text-background p-12 md:p-24 text-center">
            {/* CTA Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
            
            <div className="relative space-y-8 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to plan your next adventure?</h2>
              <p className="text-lg text-background/70 font-medium">
                Join thousands of travelers who plan better, stress less, and explore more.
              </p>
              <div className="pt-4">
                <AuthButton
                  isLoggedIn={isLoggedIn}
                  className="bg-white text-foreground hover:bg-white/90 px-10 py-5 rounded-2xl font-bold transition-all shadow-xl active:scale-95"
                >
                  {isLoggedIn ? "Plan a New Trip" : "Start Planning Now — It's Free"}
                </AuthButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground font-medium">
            © 2026 TripPlanner. Built for explorers.
          </p>
        </div>
      </footer>
    </div>
  );
}