"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createTrip } from "@/lib/actions/create-trip";
import { UploadButton } from "@/lib/upload-thing";
import { Label } from "@/components/ui/label";
import { useState, useTransition } from "react";
import Image from "next/image";

export default function NewTrip() {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center px-4 py-10">

      <Card className="w-full max-w-xl shadow-xl border border-gray-200 rounded-2xl bg-white">

        {/* Header */}
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-slate-800">
            Create New Trip ✈️
          </CardTitle>
          <CardDescription className="text-gray-500">
            Plan your next adventure in minutes
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            className="space-y-5"
            action={(formData: FormData) => {
              if (imageUrl) {
                formData.append("imageUrl", imageUrl);
              }

              startTransition(() => {
                createTrip(formData);
              });
            }}
          >

            {/* Title */}
            <div className="space-y-1">
              <Label className="text-gray-700">Trip Title</Label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Japan Adventure"
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <Label className="text-gray-700">Description</Label>
              <textarea
                name="description"
                placeholder="Describe your trip plans..."
                className="w-full border border-gray-200 rounded-lg p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                required
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">

              <div className="space-y-1">
                <Label className="text-gray-700">Start Date</Label>
                <input
                  type="date"
                  name="startDate"
                  className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label className="text-gray-700">End Date</Label>
                <input
                  type="date"
                  name="endDate"
                  className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

            </div>

            {/* Image Upload */}
            <div className="space-y-2 pt-2">

              <Label className="text-gray-700">Trip Image</Label>

              {imageUrl && (
                <div className="overflow-hidden rounded-xl border">
                  <Image
                    src={imageUrl}
                    alt="Trip Image"
                    width={500}
                    height={200}
                    className="w-full h-48 object-cover"
                    unoptimized
                  />
                </div>
              )}

              <div className="pt-2">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]?.ufsUrl) {
                      setImageUrl(res[0].ufsUrl);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    console.error("Upload error:", error);
                  }}
                />
              </div>

            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition"
            >
              {isPending ? "Creating Trip..." : "Create Trip"}
            </Button>

          </form>
        </CardContent>

      </Card>
    </div>
  );
}