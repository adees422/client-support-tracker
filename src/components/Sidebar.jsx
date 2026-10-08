import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-full shrink-0 bg-slate-900 p-4 text-white md:min-h-screen md:w-64 md:p-5">

      <h1 className="mb-3 text-xl font-bold md:mb-8">
        Client Support
      </h1>

      <nav className="flex gap-2 md:block md:space-y-2">

        <Link
          to="/dashboard"
          className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-800 sm:px-4 sm:py-3 sm:text-base"
        >
          Dashboard
        </Link>

        <Link
          to="/tickets"
          className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-800 sm:px-4 sm:py-3 sm:text-base"
        >
          Tickets
        </Link>

      </nav>

    </aside>
  );
}

export default Sidebar;