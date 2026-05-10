import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function TripsPage() {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-700 text-lg">
        <p className="bg-white px-6 py-3 rounded-xl shadow">
          Please sign in to view your trips.
        </p>
      </div>
    );
  }

  const trips = await prisma.trip.findMany({
    where: { userId: session.userId },
  });

  const sortedTrips = [...trips].sort(
    (a, b) =>
      new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTrips = sortedTrips.filter(
    (trip) => new Date(trip.startDate) >= today
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-10">
      <div className="container mx-auto px-6 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Dashboard
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your travel plans
            </p>
          </div>

          <Link href="/trips/new">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 rounded-lg">
              + New Trip
            </Button>
          </Link>
        </div>

        {/* Welcome Card */}
        <Card className="rounded-2xl shadow-sm border bg-white">
          <CardHeader>
            <CardTitle className="text-lg">
              Welcome back, {session.user?.name} 👋
            </CardTitle>
          </CardHeader>

          <CardContent className="text-gray-600">
            <p>
              {trips.length === 0
                ? "Start planning your first trip!"
                : `You have ${trips.length} ${
                    trips.length === 1 ? "trip" : "trips"
                  } planned.
                  ${
                    upcomingTrips.length > 0
                      ? ` You have ${upcomingTrips.length} upcoming trip${
                          upcomingTrips.length === 1 ? "" : "s"
                        }.`
                      : ""
                  }`}
            </p>
          </CardContent>
        </Card>

        {/* Trips Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">
            Your Recent Trips
          </h2>

          {trips.length === 0 ? (
            <Card className="text-center p-10 border-dashed border-2 bg-white">
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  No trips yet
                </h3>
                <p className="text-gray-500">
                  Start your journey by creating your first trip.
                </p>

                <Link href="/trips/new">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Create Trip
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sortedTrips.slice(0, 6).map((trip) => (
                <Link
                  key={trip.id}
                  href={`/trips/${trip.id}`}
                  className="group"
                >
                  <Card className="hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden border bg-white">

                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg group-hover:text-indigo-600 transition">
                        {trip.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-2 text-sm text-gray-600">

                      <p className="line-clamp-2">
                        {trip.description}
                      </p>

                      <div className="text-xs text-gray-500">
                        {new Date(trip.startDate).toLocaleDateString()} -{" "}
                        {new Date(trip.endDate).toLocaleDateString()}
                      </div>

                    </CardContent>

                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}