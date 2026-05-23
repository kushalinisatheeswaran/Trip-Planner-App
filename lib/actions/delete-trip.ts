"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function deleteTrip(tripId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authenticated.");
  }

  // Verify ownership
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
  });

  if (!trip || trip.userId !== session.user.id) {
    throw new Error("Unauthorized or trip not found.");
  }

  // Delete locations first (if not handled by cascade)
  await prisma.location.deleteMany({
    where: { tripId },
  });

  // Delete trip
  await prisma.trip.delete({
    where: { id: tripId },
  });

  revalidatePath("/trips");
  redirect("/trips");
}
