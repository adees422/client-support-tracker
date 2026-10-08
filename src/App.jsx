import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import TicketList from "./pages/TicketList";
import CreateTicket from "./pages/CreateTicket";
import TicketDetail from "./pages/TicketDetail";
function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-slate-100 md:flex-row">

        <Sidebar />

        <main className="min-w-0 flex-1">

          <header className="border-b bg-white px-4 py-4 sm:px-6">
            <h2 className="text-xl font-semibold text-slate-800">
              Client Support Ticket Tracker
            </h2>
          </header>

          <section className="p-4 sm:p-6">
            <Routes>

              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/tickets"
                element={<TicketList />}
              />

              <Route
                path="/tickets/create"
                element={<CreateTicket />}
              />

              <Route
                path="/tickets/:id/edit"
                element={<CreateTicket />}
              />

              {/* Ticket Detail */}
              <Route
                path="/tickets/:id"
                element={<TicketDetail />}
              />

              <Route
                path="*"
                element={<Navigate to="/dashboard" />}
              />

            </Routes>
          </section>

        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;