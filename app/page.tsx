import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function TripsPage() {
  const session =await auth();
  if(!session){
    return (<div className="flex justify-center items-center h-screen" text-gray-700 text-xl>
      Please sign in to view your trips.
    </div>);
  }

}
