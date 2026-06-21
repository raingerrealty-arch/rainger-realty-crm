"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ScheduleVisitPage() {
  const params = useParams();
  const router = useRouter();

  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [executive, setExecutive] = useState("");
  const [notes, setNotes] = useState("");

  async function scheduleVisit() {
    const response = await fetch("/api/site-visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leadId: params.id,
        visitDate,
        visitTime,
        executive,
        notes,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Site Visit Scheduled");
      router.push(`/leads/${params.id}`);
    } else {
      alert("Failed to schedule visit");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Schedule Site Visit
      </h1>

      <div className="max-w-xl bg-zinc-900 p-6 rounded-xl space-y-4">
        <div>
          <label className="block mb-2">
            Visit Date
          </label>

          <input
            type="date"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            className="w-full bg-zinc-800 p-3 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-2">
            Visit Time
          </label>

          <input
            type="time"
            value={visitTime}
            onChange={(e) => setVisitTime(e.target.value)}
            className="w-full bg-zinc-800 p-3 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-2">
            Executive
          </label>

          <input
            value={executive}
            onChange={(e) => setExecutive(e.target.value)}
            className="w-full bg-zinc-800 p-3 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-2">
            Notes
          </label>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-zinc-800 p-3 rounded-lg"
          />
        </div>

        <button
          onClick={scheduleVisit}
          className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg"
        >
          Schedule Visit
        </button>
      </div>
    </main>
  );
}