"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createTrip } from "@/lib/actions/create-trip"
import { UploadButton } from "@/lib/upload-thing";
import { Label } from "@/components/ui/label";
import { useState, useTransition } from "react";
import Image from "next/image";

export default function NewTrip(){
    const [isPending,startTransition] = useTransition();
    const [imageUrl,setImageUrl] = useState<string | null>(null);

    return <div className="max-w-lg mx-auto mt-10">
        <Card>
            <CardHeader>
                <CardTitle>New Trip</CardTitle>
                <CardDescription>Plan your next adventure</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4" action={(formData:FormData)=>{
                    if(imageUrl){
                        formData.append("imageUrl",imageUrl);
                    }
                    startTransition(()=>{
                    createTrip(formData);
                });
                }}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {" "} 
                           Trip Title
                        </label>
                        <input type="text" name="title" placeholder="japan trip..." className="w-full border border-gray-300 rounded-md p-2 hover:border-blue-500 
                        focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required/>
                        
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {" "} 
                           Description
                        </label>
                        <textarea
                          name="description"
                          placeholder="Describe your trip..."
                          className="w-full border border-gray-300 rounded-md p-2 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {" "} 
                           Start Date
                        </label>
                        <input type="date" name="startDate" className="w-full border border-gray-300 rounded-md p-2 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required/>
                        
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {" "} 
                           End Date
                        </label>
                        <input type="date" name="endDate" className="w-full border border-gray-300 rounded-md p-2 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required/>
                       </div> 
                    </div>
                    <div><Label>Trip Image</Label>
                    {imageUrl && (<Image src={imageUrl} 
                    alt="Trip Image" className="w-full h-auto rounded-md object-cover mb-2" width={300} height={100} unoptimized
                      />)
                        }

                    <UploadButton 
                    endpoint="imageUploader"
                    onClientUploadComplete={(res)=>{
                        if(res && res[0].ufsUrl){
                            setImageUrl(res[0].ufsUrl);
                        }
                    }}
                    onUploadError={(error:Error)=>{
                        console.error("Upload error: ",error);
                    }}
                    /></div>
                    <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition 
                    disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={isPending}>
                       {isPending ? "Creating..." : "Create Trip"}
                    </Button>

                </form>
            </CardContent>
        </Card>
        </div>
}