import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTickets } from "../context/TicketContext";

function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { tickets, setTickets } = useTickets();

  const ticket = tickets.find((item) => item.id === id);

  const [status, setStatus] = useState(
    ticket?.status || ""
  );

  const [note, setNote] = useState("");

  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);

  if (!ticket) {
    return (
      <div className="bg-white rounded-xl border p-10 text-center">
        <h2 className="text-xl font-semibold text-slate-800">
          Ticket not found
        </h2>

        <button
          onClick={() => navigate("/tickets")}
          className="mt-4 px-5 py-3 bg-blue-600 text-white rounded-lg"
        >
          Back to Tickets
        </button>
      </div>
    );
  }

  const handleStatusUpdate = () => {
    setTickets((previousTickets) =>
      previousTickets.map((item) =>
        item.id === ticket.id
          ? {
              ...item,
              status,
            }
          : item
      )
    );
  };

  const handleAddNote = () => {
    if (!note.trim()) {
      return;
    }

    const newNote = {
      text: note.trim(),
      timestamp: new Date().toISOString(),
    };

    setTickets((previousTickets) =>
      previousTickets.map((item) =>
        item.id === ticket.id
          ? {
              ...item,
              internalNotes: [
                ...(item.internalNotes || []),
                newNote,
              ],
            }
          : item
      )
    );

    setNote("");
  };

  const handleDelete = () => {
    setTickets((previousTickets) =>
      previousTickets.filter(
        (item) => item.id !== ticket.id
      )
    );

    navigate("/tickets");
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            {ticket.id}
          </h1>

          <p className="mt-1 text-slate-500">
            Ticket details and internal activity
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() =>
              navigate(`/tickets/${ticket.id}/edit`)
            }
            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit Ticket
          </button>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>

          <button
            onClick={() => navigate("/tickets")}
            className="px-5 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
          >
            Back
          </button>
        </div>
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-5">
          <h3 className="font-semibold text-red-800">
            Delete this ticket?
          </h3>

          <p className="mt-1 text-sm text-red-700">
            This action cannot be undone.
          </p>

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Yes, Delete
            </button>

            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 bg-white border rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Ticket Information */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">
          Ticket Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-slate-500">
              Client Name
            </p>
            <p className="mt-1 font-medium text-slate-800">
              {ticket.clientName}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Product Line
            </p>
            <p className="mt-1 font-medium text-slate-800">
              {ticket.productLine}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Title
            </p>
            <p className="mt-1 font-medium text-slate-800">
              {ticket.title}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Priority
            </p>
            <p className="mt-1 font-medium text-slate-800">
              {ticket.priority}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Assigned To
            </p>
            <p className="mt-1 font-medium text-slate-800">
              {ticket.assignedTo}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Created Date
            </p>
            <p className="mt-1 font-medium text-slate-800">
              {ticket.createdDate}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Due Date
            </p>
            <p className="mt-1 font-medium text-slate-800">
              {ticket.dueDate}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Current Status
            </p>
            <p className="mt-1 font-medium text-slate-800">
              {ticket.status}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-slate-500">
              Description
            </p>

            <p className="mt-1 text-slate-700">
              {ticket.description}
            </p>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="mt-6 bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Update Status
        </h2>

        <div className="flex flex-col md:flex-row gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-3 border rounded-lg bg-white"
          >
            <option value="Open">Open</option>
            <option value="In Progress">
              In Progress
            </option>
            <option value="Waiting on Client">
              Waiting on Client
            </option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>

          <button
            onClick={handleStatusUpdate}
            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Update Status
          </button>
        </div>
      </div>

      {/* Internal Notes */}
      <div className="mt-6 bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Internal Notes
        </h2>

        <div className="flex flex-col gap-3">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows="4"
            placeholder="Add an internal note..."
            className="w-full px-4 py-3 border rounded-lg"
          />

          <button
            onClick={handleAddNote}
            className="self-start px-5 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-900"
          >
            Add Note
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {ticket.internalNotes?.length > 0 ? (
            ticket.internalNotes
              .slice()
              .reverse()
              .map((item, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 bg-slate-50"
                >
                  <p className="text-slate-700">
                    {item.text}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    {new Date(
                      item.timestamp
                    ).toLocaleString()}
                  </p>
                </div>
              ))
          ) : (
            <p className="text-slate-500">
              No internal notes yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketDetail;