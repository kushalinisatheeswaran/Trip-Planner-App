"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

export async function deleteLocation(locationId: string, tripId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authenticated.");
  }

  // Verify trip ownership
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
  });

  if (!trip || trip.userId !== session.user.id) {
    throw new Error("Unauthorized.");
  }

  await prisma.location.delete({
    where: { id: locationId },
  });

  revalidatePath(`/trips/${tripId}`);
}
