"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { addLocation } from "@/lib/actions/add-location";
import { cn } from "@/lib/utils";
import { MapPin, Plus } from "lucide-react";
import Link from "next/link";

export default function NewLocationClient({ tripId }: { tripId: string }) {
  const [isPending, startTransation] = useTransition();

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="w-full max-w-xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">Add Destination</h1>
          <p className="text-muted-foreground font-medium italic">
            "Every stop is a new chapter in your story."
          </p>
        </div>

        <div className="glass rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-border/50">
          <form
            className="space-y-8"
            action={(formData: FormData) => {
              startTransation(() => {
                addLocation(formData, tripId);
              });
            }}
          >
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground/80 uppercase tracking-widest pl-1">
                Destination Address
              </label>
              <div className="relative group">
                <input
                  name="address"
                  type="text"
                  placeholder="e.g. Eiffel Tower, Paris"
                  required
                  className={cn(
                    "w-full bg-background border border-border/50 px-5 py-4 pl-12",
                    "rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all",
                    "placeholder:text-muted-foreground/50 font-medium"
                  )}
                />
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 group-focus-within:text-secondary transition-colors" />
              </div>
              <p className="text-[10px] text-muted-foreground/70 font-bold uppercase tracking-tighter pl-1">
                We'll automatically geocode this to show on your map.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Button 
                type="submit" 
                disabled={isPending} 
                className="w-full py-8 rounded-[1.5rem] bg-foreground text-background hover:bg-foreground/90 shadow-xl shadow-foreground/5 transition-all active:scale-[0.98] font-bold text-lg group"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                    Adding Stop...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Save Destination
                    <Plus className="w-6 h-6 transition-transform group-hover:rotate-90" />
                  </span>
                )}
              </Button>
              
              <Link href={`/trips/${tripId}`} className="text-center">
                 <button type="button" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
                   Cancel and Go Back
                 </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}