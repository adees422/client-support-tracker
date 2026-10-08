import { useState } from "react";
import { Link } from "react-router-dom";
import { useTickets } from "../context/TicketContext";
import { isOverdue } from "../utils/ticketDates";

function TicketList() {
  const { tickets } = useTickets();

  const [search, setSearch] = useState("");

  const [productFilter, setProductFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [assignedFilter, setAssignedFilter] = useState("");

  const [sortBy, setSortBy] = useState("");

  const filteredTickets = tickets.filter((ticket) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      ticket.id.toLowerCase().includes(searchText) ||
      ticket.clientName.toLowerCase().includes(searchText) ||
      ticket.title.toLowerCase().includes(searchText);

    const matchesProduct =
      productFilter === "" ||
      ticket.productLine === productFilter;

    const matchesPriority =
      priorityFilter === "" ||
      ticket.priority === priorityFilter;

    const matchesStatus =
      statusFilter === "" ||
      ticket.status === statusFilter;

    const matchesAssigned =
      assignedFilter === "" ||
      ticket.assignedTo === assignedFilter;

    return (
      matchesSearch &&
      matchesProduct &&
      matchesPriority &&
      matchesStatus &&
      matchesAssigned
    );
  });

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortBy === "due-oldest") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }

    if (sortBy === "due-newest") {
      return new Date(b.dueDate) - new Date(a.dueDate);
    }

    if (sortBy === "priority") {
      const priorityOrder = {
        Critical: 1,
        High: 2,
        Medium: 3,
        Low: 4,
      };

      return (
        priorityOrder[a.priority] -
        priorityOrder[b.priority]
      );
    }

    const aOverdue = isOverdue(a);
    const bOverdue = isOverdue(b);

    if (aOverdue && !bOverdue) {
      return -1;
    }

    if (!aOverdue && bOverdue) {
      return 1;
    }

    return (
      new Date(a.dueDate) -
      new Date(b.dueDate)
    );
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Tickets
          </h1>

          <p className="mt-1 text-slate-500">
            Manage all client support tickets
          </p>
        </div>

        <Link
          to="/tickets/create"
          className="inline-block px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
        >
          + Create Ticket
        </Link>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Ticket ID, Client name or Title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filters */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <select
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
          className="px-4 py-3 border rounded-lg bg-white"
        >
          <option value="">All Products</option>
          <option value="CRM">CRM</option>
          <option value="Hospitality PMS">
            Hospitality PMS
          </option>
          <option value="IT Service">
            IT Service
          </option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-4 py-3 border rounded-lg bg-white"
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border rounded-lg bg-white"
        >
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Waiting on Client">
            Waiting on Client
          </option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          value={assignedFilter}
          onChange={(e) => setAssignedFilter(e.target.value)}
          className="px-4 py-3 border rounded-lg bg-white"
        >
          <option value="">All Assignees</option>
          <option value="Rahul">Rahul</option>
          <option value="Amit">Amit</option>
          <option value="Priya">Priya</option>
          <option value="Neha">Neha</option>
        </select>
      </div>

      {/* Sorting */}
      <div className="mb-6">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 border rounded-lg bg-white"
        >
          <option value="">
            Smart Sort: Overdue First
          </option>

          <option value="due-oldest">
            Due Date: Oldest First
          </option>

          <option value="due-newest">
            Due Date: Newest First
          </option>

          <option value="priority">
            Priority: Critical to Low
          </option>
        </select>
      </div>

      {/* Ticket Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  Ticket ID
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  Client
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  Product
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  Priority
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  Assigned To
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                  Due Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {sortedTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className={
                    isOverdue(ticket)
                      ? "bg-red-50 hover:bg-red-100"
                      : "hover:bg-slate-50"
                  }
                >
                  {/* Clickable Ticket ID */}
                  <td className="px-5 py-4">
                    <Link
                      to={`/tickets/${ticket.id}`}
                      className={`font-semibold hover:underline ${
                        isOverdue(ticket)
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {ticket.id}
                    </Link>
                  </td>

                  <td className="px-5 py-4 text-slate-700">
                    {ticket.clientName}
                  </td>

                  <td className="px-5 py-4 text-slate-700">
                    {ticket.productLine}
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-medium">
                      {ticket.priority}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="font-medium">
                      {ticket.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-slate-700">
                    {ticket.assignedTo}
                  </td>

                  <td
                    className={`px-5 py-4 font-medium ${
                      isOverdue(ticket)
                        ? "text-red-600"
                        : "text-slate-700"
                    }`}
                  >
                    {ticket.dueDate}

                    {isOverdue(ticket) && (
                      <span className="ml-2 text-xs font-bold">
                        OVERDUE
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {sortedTickets.length === 0 && (
          <div className="p-10 text-center text-slate-500">
            No tickets found.
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketList;