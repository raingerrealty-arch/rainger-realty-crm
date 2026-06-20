import Sidebar from "../../components/Sidebar";

export default function LeadsPage() {
  return (
    <main className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Leads
        </h1>

        <div className="bg-zinc-900 rounded-xl p-6">
          <p>No leads yet.</p>
        </div>
      </div>
    </main>
  );
}