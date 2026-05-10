"use client";

import { Button } from "@/components/ui/button";
import { Trip } from "@prisma/client";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import { Calendar, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface TripDetailClientProps {
  trip: Trip;
}

export default function TripDetailClient({ trip }: TripDetailClientProps) {

    const [activeTab,setActiveTab]= useState("overview");
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">

      {/* HERO IMAGE */}
      {trip.imageUrl && (
        <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={trip.imageUrl}
            alt={trip.title}
            fill
            priority
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      {/* HEADER CARD */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {trip.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-500 mt-2">
            <Calendar className="h-5 w-5" />
            <span className="text-sm md:text-base">
              {new Date(trip.startDate).toISOString().split("T")[0]} -{" "}
              {new Date(trip.endDate).toISOString().split("T")[0]}
            </span>
          </div>
        </div>

        <Link href={`/trips/${trip.id}/itineray/new`}>
          <Button className="flex items-center gap-2 px-5">
            <Plus className="h-5 w-5" />
            Add Location
          </Button>
        </Link>

      </div>

      {/* TABS SECTION */}
      <div className="bg-white rounded-xl shadow p-6">

        <Tabs value={activeTab} onValueChange={setActiveTab} >

          <TabsList className="mb-6 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="overview" className="rounded-md">
              Overview
            </TabsTrigger>
            <TabsTrigger value="itinerary" className="rounded-md">
              Itinerary
            </TabsTrigger>
            <TabsTrigger value="map" className="rounded-md">
              Map
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="text-gray-600 text-sm leading-relaxed">
              <h2>Trip Summary</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                    <Calendar className="h-6 w-6 mr-3 text-gray-500 "/>
                    <div>
                        <p className="font-medium text-gray-700">Dates</p>
                        <p className="text-sm text-gray-500">
                           {new Date(trip.startDate).toISOString().split("T")[0]} -{" "}
              {new Date(trip.endDate).toISOString().split("T")[0]}
              <br/>
              {`${Math.round((trip.endDate.getTime()- trip.startDate.getTime())/(1000*60*60*24))}day(s)`} </p></div> 
                </div>
                <div className="flex items-start "> </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="itinerary">
            <div className="text-gray-600 text-sm leading-relaxed">
              Your trip schedule will be shown here.
            </div>
          </TabsContent>

          <TabsContent value="map">
            <div className="text-gray-600 text-sm leading-relaxed">
              Map view will be displayed here.
            </div>
          </TabsContent>

        </Tabs>

      </div>

    </div>
  );
}