import Sidebar from "../components/Sidebar";

export default function Home() {
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
              <h2 className="text-gray-400">Total Leads</h2>
              <p className="text-3xl font-bold">0</p>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6">
              <h2 className="text-gray-400">New Leads</h2>
              <p className="text-3xl font-bold">0</p>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6">
              <h2 className="text-gray-400">AI Calls</h2>
              <p className="text-3xl font-bold">0</p>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6">
              <h2 className="text-gray-400">Site Visits</h2>
              <p className="text-3xl font-bold">0</p>
            </div>

            <div className="bg-zinc-900 rounded-xl p-6 border border-yellow-500">
              <h2 className="text-yellow-500">Hot Leads</h2>
              <p className="text-3xl font-bold">0</p>
            </div>
          </div>

          <div className="mt-10 bg-zinc-900 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">
              Recent Activity
            </h2>

            <p className="text-gray-400">
              No activity yet.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}