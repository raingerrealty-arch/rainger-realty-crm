import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-yellow-500 mb-8">
        Rainger Realty
      </h1>

      <nav className="space-y-4">
        <Link href="/" className="block hover:text-yellow-500">
          Dashboard
        </Link>

        <Link href="/leads" className="block hover:text-yellow-500">
          Leads
        </Link>

        <Link href="#" className="block hover:text-yellow-500">
          AI Calls
        </Link>

        <Link href="#" className="block hover:text-yellow-500">
          Site Visits
        </Link>

        <Link href="#" className="block hover:text-yellow-500">
          Settings
        </Link>
      </nav>
    </aside>
  );
}