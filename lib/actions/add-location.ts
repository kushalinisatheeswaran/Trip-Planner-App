"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function geocodeAddress(address: string) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error("Google Maps API key is missing");
  }

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  );

  const data = await response.json();

  // ❗ Check API response status
  if (data.status !== "OK") {
    console.error("Google Geocoding Error:", data.status, data.error_message);
    throw new Error("Geocoding failed: " + data.status);
  }

  // ❗ Check results exist
  if (!data.results || data.results.length === 0) {
    throw new Error("No location found for: " + address);
  }

  const location = data.results[0]?.geometry?.location;

  if (!location) {
    throw new Error("Invalid geocoding response structure");
  }

  return {
    lat: location.lat,
    lng: location.lng,
  };
}

export async function addLocation(formData: FormData, tripId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const address = formData.get("address")?.toString();

  if (!address || address.trim().length < 2) {
    throw new Error("Invalid or missing address");
  }

  // 🔥 Get coordinates safely
  const { lat, lng } = await geocodeAddress(address);

  // Get order index
  const count = await prisma.location.count({
    where: { tripId },
  });

  // Save location
  await prisma.location.create({
    data: {
      locationTitle: address,
      lat,
      lng,
      tripId,
      order: count,
    },
  });

  // Redirect back to trip page
  redirect(`/trips/${tripId}`);
}