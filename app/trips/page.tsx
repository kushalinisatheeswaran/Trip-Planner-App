import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function TripsPage() {
  const session = await auth();

  const trips = await prisma.trip.findMany({
    where: { userId: session?.user?.id },
  });

  const sortedTrips = [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) >= today
  );

  if (!session) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] gap-6">
        <div className="w-20 h-20 rounded-3xl bg-secondary/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold">Please Sign In</h1>
        <p className="text-muted-foreground">You need to be authenticated to view your trips.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Your Journeys</h1>
          <p className="text-muted-foreground font-medium">
            Manage your itineraries and plan your next big adventure.
          </p>
        </div>
        <Link href="/trips/new">
          <Button size="lg" className="rounded-2xl px-8 bg-foreground text-background hover:bg-foreground/90 transition-all shadow-lg active:scale-95 group">
            <Plus className="mr-2 h-5 w-5 transition-transform group-hover:rotate-90" />
            Plan New Trip
          </Button>
        </Link>
      </div>

      {/* Welcome / Stats Card */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-card border border-border/50 p-8 md:p-10 shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 blur-[80px] rounded-full -mr-20 -mt-20" />
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-tr from-secondary to-orange-400 flex items-center justify-center shadow-xl shadow-secondary/20">
            <span className="text-3xl font-bold text-white">
              {session.user?.name?.[0]}
            </span>
          </div>
          <div className="text-center md:text-left flex-1 space-y-2">
            <h2 className="text-3xl font-bold">Welcome back, {session.user?.name?.split(" ")[0]}!</h2>
            <p className="text-muted-foreground font-medium text-lg">
              {trips.length === 0
                ? "Ready to start your first exploration? The world is waiting."
                : `You've planned ${trips.length} ${trips.length === 1 ? "trip" : "trips"} so far. ${upcomingTrips.length > 0 ? `${upcomingTrips.length} are coming up soon!` : "Time for another one?"}`}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Recent Trips</h2>
          <div className="h-px flex-1 bg-border/50" />
        </div>

        {trips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-border rounded-[3rem] bg-muted/30 gap-6">
            <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center shadow-sm">
              <svg className="w-12 h-12 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2 2 2 0 012 2v.5m3.935-3.935V11a2.5 2.5 0 01-2.5 2.5H18a2 2 0 00-2 2 2 2 0 01-2 2v2.945M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold">No trips discovered yet</h3>
              <p className="text-muted-foreground max-w-sm mx-auto font-medium">
                Your future adventures will appear here. Start your journey today!
              </p>
            </div>
            <Link href="/trips/new">
              <Button size="lg" className="rounded-2xl px-10 bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/20 font-bold transition-all active:scale-95">
                Create First Trip
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTrips.slice(0, 6).map((trip, key) => (
              <Link key={key} href={`/trips/${trip.id}`} className="group">
                <div className="h-full bg-card border border-border/50 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  {/* Trip Card Image Placeholder / Color Block */}
                  <div className="relative h-48 overflow-hidden">
                    {trip.imageUrl ? (
                      <Image
                        src={trip.imageUrl}
                        alt={trip.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-secondary/40 to-orange-200" />
                    )}
                    <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-foreground/80">
                      {new Date(trip.startDate) > today ? 'Upcoming' : 'Past'}
                    </div>
                  </div>

                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-bold line-clamp-1 group-hover:text-secondary transition-colors leading-tight">
                      {trip.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed font-medium">
                      {trip.description || "No description set for this journey."}
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="p-2 bg-accent/50 rounded-lg text-secondary">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div className="text-sm font-bold text-foreground/80">
                        {new Date(trip.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}