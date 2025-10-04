"use client";

import BrewingLog from "@/components/BrewingLog";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <BrewingLog />
    </div>
  );
}
