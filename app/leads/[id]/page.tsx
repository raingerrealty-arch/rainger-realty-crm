import Sidebar from "../../../components/Sidebar";
import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";

export default async function LeadDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const lead = await prisma.lead.findUnique({
    where: {
      id,
    },
  });

  if (!lead) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Lead Details
        </h1>

        <div className="bg-zinc-900 rounded-xl p-6 space-y-4">

          <div>
            <p className="text-gray-400">Lead ID</p>
            <p className="text-yellow-400 font-mono">
              {lead.leadId}
            </p>
          </div>

          <div>
            <p className="text-gray-400">Full Name</p>
            <p className="text-xl font-semibold">
              {lead.fullName}
            </p>
          </div>

          <div>
            <p className="text-gray-400">Phone</p>
            <p>{lead.phone}</p>
          </div>

          <div>
            <p className="text-gray-400">Email</p>
            <p>{lead.email || "Not Provided"}</p>
          </div>

          <div>
            <p className="text-gray-400">Project</p>
            <p>{lead.project}</p>
          </div>

          <div>
            <p className="text-gray-400">Source</p>
            <p>{lead.source}</p>
          </div>

          <div>
            <p className="text-gray-400">Status</p>
            <p>{lead.status}</p>
          </div>

          <div>
            <p className="text-gray-400">Temperature</p>
            <p>{lead.temperature}</p>
          </div>

          <div>
            <p className="text-gray-400">Notes</p>
            <p>{lead.notes || "No notes available"}</p>
          </div>

          <div className="pt-6 flex gap-4">
            <button className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg">
              Call Now
            </button>

            <button className="bg-yellow-600 hover:bg-yellow-700 px-5 py-3 rounded-lg">
              Schedule Visit
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}