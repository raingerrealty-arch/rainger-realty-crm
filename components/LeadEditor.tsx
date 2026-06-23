"use client";

import { useState } from "react";

export default function LeadEditor({
  lead,
}: {
  lead: any;
}) {
  const [status, setStatus] = useState(lead.status || "");
  const [temperature, setTemperature] = useState(lead.temperature || "");

  async function saveChanges() {
    const response = await fetch(
      `/api/leads/${lead.id}/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: lead.id,
          status,
          temperature,
        }),
      }
    );

    const result = await response.json();

    if (result.success) {
      alert("Lead Updated");
      location.reload();
    } else {
      alert("Update Failed");
    }
  }

  return (
    <div className="space-y-4 mt-6">
      <div>
        <p>Status</p>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-zinc-800 p-2 rounded w-full"
        >
          <option>New</option>
          <option>Contacted</option>
          <option>Interested</option>
          <option>Follow Up</option>
          <option>Site Visit</option>
          <option>Closed</option>
        </select>
      </div>

      <div>
        <p>Temperature</p>

        <select
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          className="bg-zinc-800 p-2 rounded w-full"
        >
          <option>Hot</option>
          <option>Warm</option>
          <option>Cold</option>
        </select>
      </div>

      <button
        onClick={saveChanges}
        className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg"
      >
        Save Changes
      </button>
    </div>
  );
}