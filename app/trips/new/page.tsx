"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { createTrip } from "@/lib/actions/create-trip";
import { cn } from "@/lib/utils";
import { UploadButton } from "@/lib/upload-thing";
import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NewTrip() {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  return (
    <div className="max-w-xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Plan a New Journey</h1>
          <p className="text-muted-foreground font-medium italic">
            "The journey of a thousand miles begins with a single step."
          </p>
        </div>

        <div className="glass rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-border/50">
          <form
            className="space-y-8"
            action={(formData: FormData) => {
              if (imageUrl) {
                formData.append("imageUrl", imageUrl);
              }
              startTransition(() => {
                createTrip(formData);
              });
            }}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground/80 uppercase tracking-widest pl-1">
                  Trip Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Summer in Santorini"
                  className={cn(
                    "w-full bg-background border border-border/50 px-5 py-4",
                    "rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all",
                    "placeholder:text-muted-foreground/50 font-medium"
                  )}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground/80 uppercase tracking-widest pl-1">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="What's the vibe of this trip?"
                  rows={4}
                  className={cn(
                    "w-full bg-background border border-border/50 px-5 py-4",
                    "rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all",
                    "placeholder:text-muted-foreground/50 font-medium resize-none"
                  )}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/80 uppercase tracking-widest pl-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    className={cn(
                      "w-full bg-background border border-border/50 px-5 py-4",
                      "rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all",
                      "font-medium"
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/80 uppercase tracking-widest pl-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    className={cn(
                      "w-full bg-background border border-border/50 px-5 py-4",
                      "rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all",
                      "font-medium"
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-foreground/80 uppercase tracking-widest pl-1">
                  Cover Image
                </label>
                
                <div className="relative group">
                  {imageUrl ? (
                    <div className="relative w-full h-56 rounded-3xl overflow-hidden shadow-inner border border-border/50 mb-4 transition-transform group-hover:scale-[1.01]">
                       <Image
                          src={imageUrl}
                          alt="Trip Preview"
                          fill
                          className="object-cover"
                       />
                       <button 
                          type="button"
                          onClick={() => setImageUrl(null)}
                          className="absolute top-4 right-4 glass p-2 rounded-xl hover:bg-destructive hover:text-white transition-colors"
                       >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                       </button>
                    </div>
                  ) : (
                    <div className="w-full py-12 rounded-3xl bg-muted/30 border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 transition-colors hover:bg-muted/50">
                       <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            if (res && res[0].ufsUrl) {
                              setImageUrl(res[0].ufsUrl);
                            }
                          }}
                          onUploadError={(error: Error) => {
                            console.error("Upload error: ", error);
                          }}
                        />
                        <p className="text-xs text-muted-foreground font-bold tracking-tight">PNG, JPG or WEBP max 4MB</p>
                    </div>
                  )}
                </div>
              </div>
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
                     Creating Journey...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                     Begin Adventure
                     <Plus className="w-6 h-6 transition-transform group-hover:rotate-90" />
                  </span>
                )}
              </Button>

              <Link href="/trips" className="text-center">
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