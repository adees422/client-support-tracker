import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-5">

      <h1 className="text-xl font-bold mb-8">
        Client Support
      </h1>

      <nav className="space-y-2">

        <Link
          to="/dashboard"
          className="block w-full px-4 py-3 rounded-lg hover:bg-slate-800"
        >
          Dashboard
        </Link>

        <Link
          to="/tickets"
          className="block w-full px-4 py-3 rounded-lg hover:bg-slate-800"
        >
          Tickets
        </Link>

      </nav>

    </aside>
  );
}

export default Sidebar;