import { useTickets } from "../context/TicketContext";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Dashboard() {
  const { tickets } = useTickets();

  // Active tickets
  const activeTickets = tickets.filter(
    (ticket) =>
      ticket.status !== "Resolved" &&
      ticket.status !== "Closed"
  );

  // Open tickets
  const openTickets = activeTickets.length;

  // Overdue tickets
  const today = new Date();

  const overdueTickets = activeTickets.filter((ticket) => {
    const dueDate = new Date(ticket.dueDate);

    return dueDate < today;
  });

  // Critical tickets
  const criticalTickets = activeTickets
    .filter((ticket) => ticket.priority === "Critical")
    .sort(
      (a, b) =>
        new Date(a.dueDate) - new Date(b.dueDate)
    )
    .slice(0, 5);

  // Product line counts
  const productData = [
    {
      name: "CRM",
      count: tickets.filter(
        (ticket) => ticket.productLine === "CRM"
      ).length,
    },
    {
      name: "Hospitality PMS",
      count: tickets.filter(
        (ticket) => ticket.productLine === "Hospitality PMS"
      ).length,
    },
    {
      name: "IT Service",
      count: tickets.filter(
        (ticket) => ticket.productLine === "IT Service"
      ).length,
    },
  ];

  // Priority counts
  const priorityData = [
    {
      name: "Low",
      count: tickets.filter(
        (ticket) => ticket.priority === "Low"
      ).length,
    },
    {
      name: "Medium",
      count: tickets.filter(
        (ticket) => ticket.priority === "Medium"
      ).length,
    },
    {
      name: "High",
      count: tickets.filter(
        (ticket) => ticket.priority === "High"
      ).length,
    },
    {
      name: "Critical",
      count: tickets.filter(
        (ticket) => ticket.priority === "Critical"
      ).length,
    },
  ];

  // Status counts
  const statusData = [
    {
      name: "Open",
      count: tickets.filter(
        (ticket) => ticket.status === "Open"
      ).length,
    },
    {
      name: "In Progress",
      count: tickets.filter(
        (ticket) => ticket.status === "In Progress"
      ).length,
    },
    {
      name: "Waiting",
      count: tickets.filter(
        (ticket) => ticket.status === "Waiting on Client"
      ).length,
    },
    {
      name: "Resolved",
      count: tickets.filter(
        (ticket) => ticket.status === "Resolved"
      ).length,
    },
    {
      name: "Closed",
      count: tickets.filter(
        (ticket) => ticket.status === "Closed"
      ).length,
    },
  ];

  return (
    <div>

      {/* Dashboard Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-1 text-slate-500">
          Overview of client support tickets
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Open */}
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <p className="text-sm text-slate-500">
            Open Tickets
          </p>

          <h2 className="text-3xl font-bold mt-2 text-slate-800">
            {openTickets}
          </h2>
        </div>

        {/* Overdue */}
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <p className="text-sm text-slate-500">
            Overdue Tickets
          </p>

          <h2 className="text-3xl font-bold mt-2 text-red-600">
            {overdueTickets.length}
          </h2>
        </div>

        {/* Critical */}
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <p className="text-sm text-slate-500">
            Critical Tickets
          </p>

          <h2 className="text-3xl font-bold mt-2 text-orange-600">
            {criticalTickets.length}
          </h2>
        </div>

        {/* Total */}
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <p className="text-sm text-slate-500">
            Total Tickets
          </p>

          <h2 className="text-3xl font-bold mt-2 text-blue-600">
            {tickets.length}
          </h2>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

        {/* Product Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm border">

          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Tickets by Product Line
          </h2>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={productData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#2563eb"
                  radius={[5, 5, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Priority Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm border">

          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Tickets by Priority
          </h2>

          <div className="h-72">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={priorityData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#f97316"
                  radius={[5, 5, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* Status + Critical */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

        {/* Status Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm border">

          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Tickets by Status
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={statusData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >

                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                    />
                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Critical Tickets */}
        <div className="bg-white rounded-xl p-5 shadow-sm border">

          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Critical Tickets
          </h2>

          <div className="space-y-3">

            {criticalTickets.length === 0 ? (

              <p className="text-slate-500">
                No critical tickets.
              </p>

            ) : (

              criticalTickets.map((ticket) => (

                <div
                  key={ticket.id}
                  className="border rounded-lg p-4"
                >

                  <div className="flex justify-between gap-3">

                    <div>
                      <p className="font-semibold text-slate-800">
                        {ticket.id}
                      </p>

                      <p className="text-sm text-slate-600">
                        {ticket.clientName}
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        {ticket.title}
                      </p>
                    </div>

                    <span className="text-xs font-semibold text-red-600">
                      CRITICAL
                    </span>

                  </div>

                  <div className="mt-3 text-xs text-slate-500">
                    Due: {ticket.dueDate}
                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;