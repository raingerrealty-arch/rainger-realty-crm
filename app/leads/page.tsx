import Sidebar from "../../components/Sidebar";
import { prisma } from "../../lib/prisma";
import Link from "next/link";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Leads
        </h1>

        <div className="bg-zinc-900 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="text-left p-4">Lead ID</th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Phone</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Source</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-t border-zinc-800 hover:bg-zinc-800"
                >
                  <td className="p-4 text-yellow-400 font-mono">
                    {lead.leadId}
                  </td>

                  <td className="p-4">
                    <Link
                      href={`/leads/${lead.id}`}
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      {lead.fullName}
                    </Link>
                  </td>

                  <td className="p-4">{lead.phone}</td>
                  <td className="p-4">{lead.email}</td>
                  <td className="p-4">{lead.status}</td>
                  <td className="p-4">{lead.source}</td>
                </tr>
              ))}

              {leads.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-6 text-center text-gray-400"
                  >
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}