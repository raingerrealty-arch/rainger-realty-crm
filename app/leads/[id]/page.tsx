import Sidebar from "../../../components/Sidebar";
import CallNowButton from "../../../components/CallNowButton";
import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import LeadEditor from "../../../components/LeadEditor";

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
    include: {
      callLogs: {
        orderBy: {
          createdAt: "desc",
        },
      },
      siteVisits: {
        orderBy: {
          visitDate: "desc",
        },
      },
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

          <LeadEditor lead={lead} />

          <div>
  <p className="text-gray-400">Notes</p>
  <p>{lead.notes || "No notes available"}</p>
</div>

<div>
  <p className="text-gray-400">City</p>
  <p>{lead.city || "Not Provided"}</p>
</div>

<div>
  <p className="text-gray-400">Country</p>
  <p>{lead.country || "Not Provided"}</p>
</div>

<div>
  <p className="text-gray-400">Property Type</p>
  <p>{lead.propertyType || "Not Provided"}</p>
</div>

<div>
  <p className="text-gray-400">Property Interested</p>
  <p>{lead.propertyInterested || "Not Provided"}</p>
</div>

<div>
  <p className="text-gray-400">Budget</p>
  <p>{lead.budget || "Not Provided"}</p>
</div>

<div>
  <p className="text-gray-400">Quoted Price</p>
  <p>{lead.quotedPrice || "Not Provided"}</p>
</div>

<div>
  <p className="text-gray-400">Unit Price</p>
  <p>{lead.unitPrice || "Not Provided"}</p>
</div>

<div>
  <p className="text-gray-400">Purpose</p>
  <p>{lead.purpose || "Not Provided"}</p>
</div>

<div>
  <p className="text-gray-400">Next Follow Up</p>
  <p>
    {lead.nextFollowUpDate
      ? new Date(lead.nextFollowUpDate).toLocaleDateString()
      : "Not Scheduled"}
  </p>
</div>
          

          <div className="border-t border-zinc-700 pt-6">
            <h2 className="text-xl font-bold mb-4">
              Call History
            </h2>

            {lead.callLogs.length === 0 ? (
              <p className="text-gray-400">
                No call logs yet
              </p>
            ) : (
              <div className="space-y-4">
                {lead.callLogs.map((log) => (
                  <div
                    key={log.id}
                    className="bg-zinc-800 p-4 rounded-lg"
                  >
                    <p>
                      <strong>Outcome:</strong> {log.outcome}
                    </p>

                    <p>
                      <strong>Summary:</strong> {log.summary}
                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-zinc-700 pt-6">
            <h2 className="text-xl font-bold mb-4">
              Site Visits
            </h2>

            {lead.siteVisits.length === 0 ? (
              <p className="text-gray-400">
                No site visits scheduled
              </p>
            ) : (
              <div className="space-y-4">
                {lead.siteVisits.map((visit) => (
                  <div
                    key={visit.id}
                    className="bg-zinc-800 p-4 rounded-lg"
                  >
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(
                        visit.visitDate
                      ).toLocaleDateString()}
                    </p>

                    <p>
                      <strong>Time:</strong>{" "}
                      {visit.visitTime}
                    </p>

                    <p>
                      <strong>Executive:</strong>{" "}
                      {visit.executive}
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}
                      {visit.status}
                    </p>

                    {visit.notes && (
                      <p>
                        <strong>Notes:</strong>{" "}
                        {visit.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
<div className="border-t border-zinc-700 pt-6">
  <h2 className="text-xl font-bold mb-4">
    Edit Lead
  </h2>

  <LeadEditor lead={lead} />
</div>
          <div className="pt-6 flex gap-4">
            <CallNowButton leadId={lead.id} />

            <a
              href={`/leads/${lead.id}/schedule`}
              className="bg-yellow-600 hover:bg-yellow-700 px-5 py-3 rounded-lg"
            >
              Schedule Visit
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}