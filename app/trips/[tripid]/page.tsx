import TripDetailClient from "@/app/components/trip-detail";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";


export default async function TripDetail({params}: {params: Promise<{tripid: string}>;}) {
    
    const  {tripid} = await params

    const session = await auth();
    if(!session) {
        return (
            <div>
                <p>Please sign in.</p>
            </div>
        );
    }

    const trip = await prisma.trip.findFirst({
        where: {
            id: tripid ,userId: session.user?.id
        },

    })
    if(!trip) {
        return (
            <div>
                <p>Trip not found.</p>
            </div>
        );
    }

    return <TripDetailClient trip={trip}/>
    
}