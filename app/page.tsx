import Sidebar from "../components/Sidebar";
import { prisma } from "../lib/prisma";

export default async function Home() {
  const totalLeads = await prisma.lead.count();

  const newLeads = await prisma.lead.count({
    where: {
      status: "New",
    },
  });

  const hotLeads = await prisma.lead.count({
    where: {
      temperature: "Hot",
    },
  });

  return (
    <main className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">
            Rainger Realty CRM
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

            <div className="bg-zinc-900 rounded-xl p-6">
              <h2 className="text-gray-400">
                Total Leads
              </h2>
              <p className="text-3xl font-bold">
                {totalLeads}
              </p>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6">
              <h2 className="text-gray-400">
                New Leads
              </h2>
              <p className="text-3xl font-bold">
                {newLeads}
              </p>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6">
              <h2 className="text-gray-400">
                Site Visits
              </h2>
              <p className="text-3xl font-bold">
                0
              </p>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6 border border-yellow-500">
              <h2 className="text-yellow-500">
                Hot Leads
              </h2>
              <p className="text-3xl font-bold">
                {hotLeads}
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}