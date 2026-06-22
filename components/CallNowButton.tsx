"use client";

import { useRouter } from "next/navigation";

export default function CallNowButton({
  leadId,
}: {
  leadId: string;
}) {
  const router = useRouter();

  async function startCall() {
    const response = await fetch("/api/call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leadId,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("AI Call Completed");

      router.refresh();
    } else {
      alert("Call Failed");
    }
  }

  return (
    <button
      onClick={startCall}
      className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg"
    >
      Call Now
    </button>
  );
}