"use client";

import { Location, Trip } from "@prisma/client";
import Image from "next/image";
import { Calendar, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import Map from "@/components/maps";
import SortableItinerary from "./SortableItinerary";
import { deleteTrip } from "@/lib/actions/delete-trip";

export type TripWithLocation = Trip & {
  locations: Location[];
};

interface TripDetailClientProps {
  trip: TripWithLocation;
}

export default function TripDetailClient({ trip }: TripDetailClientProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        {trip.imageUrl ? (
          <Image
            src={trip.imageUrl}
            alt={trip.title}
            className="object-cover"
            fill
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-secondary/40 to-orange-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Sticky Header Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-foreground/80">
                   <Calendar className="w-3.5 h-3.5 text-secondary" />
                   <span>
                     {trip.startDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })} - {trip.endDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                   </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight drop-shadow-sm">
                  {trip.title}
                </h1>
              </div>
              
              <Link href={`/trips/${trip.id}/itinerary/new`}>
                <Button size="lg" className="rounded-2xl px-8 bg-foreground text-background hover:bg-foreground/90 transition-all shadow-xl active:scale-95 group font-bold">
                  <Plus className="mr-2 h-5 w-5 transition-transform group-hover:rotate-90" />
                  Add Destination
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="glass rounded-[3rem] p-4 md:p-8 shadow-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-8 overflow-x-auto">
              <TabsList className="bg-muted p-1.5 rounded-2xl">
                <TabsTrigger value="overview" className="px-8 py-2.5 rounded-xl text-sm font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="itinerary" className="px-8 py-2.5 rounded-xl text-sm font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
                  Itinerary
                </TabsTrigger>
                <TabsTrigger value="map" className="px-8 py-2.5 rounded-xl text-sm font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all">
                  Full Map
                </TabsTrigger>
              </TabsList>
              
              <div className="hidden md:flex items-center gap-2 text-muted-foreground bg-accent/30 px-4 py-2 rounded-xl">
                 <MapPin className="w-4 h-4 text-secondary" />
                 <span className="text-sm font-bold uppercase tracking-wider">
                   {trip.locations.length} {trip.locations.length === 1 ? "Stop" : "Stops"}
                 </span>
              </div>
            </div>

            <TabsContent value="overview" className="animate-in fade-in slide-in-from-top-4 duration-500 outline-none">
              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">The Story</h2>
                    <p className="text-xl text-muted-foreground leading-relaxed font-normal italic border-l-4 border-secondary/20 pl-8">
                      {trip.description || "Every trip has a story to tell. Begin yours by adding a description or itinerary stops."}
                    </p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                     <div className="p-8 rounded-3xl bg-secondary/5 border border-secondary/10 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center">
                           <Calendar className="w-6 h-6 text-secondary" />
                        </div>
                        <h3 className="text-xl font-bold">Duration</h3>
                        <p className="text-muted-foreground font-medium">
                          {`${Math.round((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24))} Days of exploration`}
                        </p>
                     </div>
                     <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                           <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Scope</h3>
                        <p className="text-muted-foreground font-medium">
                           Exploring {trip.locations.length} unique destinations.
                        </p>
                     </div>
                  </div>
                </div>

                <div className="space-y-8">
                   <div className="h-96 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-background ring-1 ring-border/50">
                     <Map itineraries={trip.locations} />
                   </div>
                   <div className="p-8 rounded-[2.5rem] bg-foreground text-background space-y-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 blur-[50px] rounded-full" />
                      <h3 className="text-xl font-bold relative">Quick Access</h3>
                      <div className="space-y-4 relative">
                        <Link href={`/trips/${trip.id}/itinerary/new`} className="flex items-center justify-between p-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors">
                           <span className="font-bold text-sm">Add Location</span>
                           <Plus className="w-4 h-4" />
                        </Link>
                        <Link href={`/trips`} className="flex items-center justify-between p-3 px-4 rounded-2xl border border-white/20 hover:bg-white/5 transition-colors">
                           <span className="font-bold text-sm">Back to All Trips</span>
                           <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </Link>
                        
                        <form action={() => deleteTrip(trip.id)} className="pt-2">
                           <button 
                             type="submit" 
                             className="flex items-center justify-between w-full p-3 px-4 rounded-2xl bg-destructive/10 hover:bg-destructive text-destructive hover:text-white transition-all group/del"
                             onClick={(e) => {
                               if (!confirm("Are you sure you want to delete this entire trip? This cannot be undone.")) {
                                 e.preventDefault();
                               }
                             }}
                           >
                              <span className="font-bold text-sm">Delete Trip</span>
                              <svg className="w-4 h-4 transition-transform group-hover/del:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                           </button>
                        </form>
                      </div>
                   </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="itinerary" className="animate-in fade-in slide-in-from-top-4 duration-500 outline-none">
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-border/50 pb-6">
                  <h2 className="text-3xl font-bold tracking-tight">Full Itinerary</h2>
                </div>

                {trip.locations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-[2.5rem] border-2 border-dashed border-border/50 gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-background flex items-center justify-center">
                       <Plus className="w-8 h-8 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground font-medium text-lg">Your itinerary is empty. Start adding places!</p>
                    <Link href={`/trips/${trip.id}/itinerary/new`}>
                      <Button className="rounded-2xl px-10 bg-secondary text-white hover:bg-secondary/90 transition-all font-bold">
                        Add My First Stop
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <SortableItinerary locations={trip.locations} tripId={trip.id} />
                )}
              </div>
            </TabsContent>

            <TabsContent value="map" className="animate-in fade-in slide-in-from-top-4 duration-500 outline-none">
              <div className="space-y-8">
                <div className="h-[60vh] rounded-[3rem] overflow-hidden shadow-2xl border border-border/50">
                  <Map itineraries={trip.locations} />
                </div>
                {trip.locations.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <p className="text-muted-foreground font-medium">Add locations to see them on the map.</p>
                    <Link href={`/trips/${trip.id}/itinerary/new`}>
                      <Button size="sm" variant="outline" className="rounded-xl border-secondary text-secondary hover:bg-secondary hover:text-white transition-all font-bold">
                        Add Location
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}