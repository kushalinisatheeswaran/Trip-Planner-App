"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
import Link from "next/link";

export interface TransformedLocation {
  lat: number;
  lng: number;
  name: string;
  country: string;
}

export default function GlobePage() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  const [visitedCountries, setVisitedCountries] = useState<Set<string>>(
    new Set()
  );
  const [locations, setLocations] = useState<TransformedLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/trips");
        const data = await response.json();
        setLocations(data);
        const countries = new Set<string>(
          data.map((loc: TransformedLocation) => loc.country)
        );

        setVisitedCountries(countries);
      } catch (err) {
        console.error("error", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  return (
    <div className="min-h-screen bg-background py-12 animate-in fade-in duration-1000">
      <div className="container mx-auto px-4 max-w-7xl space-y-12">
        <div className="space-y-4 text-center relative">
          <Link href="/trips" className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors group">
             <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
             Back to Dashboard
          </Link>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-sm">
            Your World <span className="text-secondary font-black italic">Journey</span>
          </h1>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto italic">
            "We travel not to escape life, but for life not to escape us."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Globe Container */}
          <div className="lg:col-span-3 h-[70vh] glass rounded-[3rem] overflow-hidden border border-border/50 relative shadow-2xl bg-black/5">
             <div className="absolute top-8 left-8 z-10 space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Interactive Map</h2>
                <div className="flex items-center gap-2 text-muted-foreground text-sm font-bold uppercase tracking-widest">
                   <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                   <span>Live exploration</span>
                </div>
             </div>

             <div className="w-full h-full flex items-center justify-center">
               {isLoading ? (
                 <div className="flex flex-col items-center gap-4">
                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary" />
                   <p className="text-muted-foreground font-bold animate-pulse">Mapping your adventures...</p>
                 </div>
               ) : (
                 <Globe
                   ref={globeRef}
                   globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                   bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                   backgroundColor="rgba(0,0,0,0)"
                   pointColor={() => "#FF5733"}
                   pointLabel="name"
                   pointsData={locations}
                   pointRadius={0.5}
                   pointAltitude={0.1}
                   pointsMerge={true}
                   width={1000}
                   height={800}
                 />
               )}
             </div>
          </div>

          {/* Stats Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="rounded-[2.5rem] border-border/50 shadow-sm glass overflow-hidden sticky top-8">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl font-bold">Explorer Stats</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-8">
                {isLoading ? (
                   <div className="space-y-4">
                      {[1,2,3].map(i => (
                        <div key={i} className="h-12 bg-muted rounded-2xl animate-pulse" />
                      ))}
                   </div>
                ) : (
                  <>
                    <div className="p-6 rounded-3xl bg-secondary text-white shadow-xl shadow-secondary/20 space-y-1">
                      <p className="text-xs font-bold uppercase tracking-widest opacity-80">Countries Visited</p>
                      <div className="text-5xl font-black">{visitedCountries.size}</div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground px-1">Recent Locations</h3>
                      <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                        {Array.from(visitedCountries)
                          .sort()
                          .map((country, key) => (
                            <div
                              key={key}
                              className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-all border border-transparent hover:border-border group"
                            >
                              <div className="p-2 bg-background rounded-xl text-secondary shadow-sm group-hover:scale-110 transition-transform">
                                <MapPin className="h-4 w-4" />
                              </div>
                              <span className="font-bold text-sm"> {country}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}