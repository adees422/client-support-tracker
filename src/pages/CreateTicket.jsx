import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTickets } from "../context/TicketContext";

function CreateTicket() {
  const { tickets, setTickets } = useTickets();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const existingTicket = tickets.find(
    (ticket) => ticket.id === id
  );

  const getToday = () => {
    return new Date().toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState(() => {
    if (isEditMode && existingTicket) {
      return {
        clientName: existingTicket.clientName,
        productLine: existingTicket.productLine,
        title: existingTicket.title,
        description: existingTicket.description,
        priority: existingTicket.priority,
        status: existingTicket.status,
        assignedTo: existingTicket.assignedTo,
        createdDate: existingTicket.createdDate,
        dueDate: existingTicket.dueDate,
        internalNotes:
          existingTicket.internalNotes?.length > 0
            ? existingTicket.internalNotes[0].text
            : "",
      };
    }

    return {
      clientName: "",
      productLine: "",
      title: "",
      description: "",
      priority: "",
      status: "",
      assignedTo: "",
      createdDate: getToday(),
      dueDate: "",
      internalNotes: "",
    };
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = "Client name is required";
    }

    if (!formData.productLine) {
      newErrors.productLine = "Product line is required";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.priority) {
      newErrors.priority = "Priority is required";
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    if (!formData.assignedTo) {
      newErrors.assignedTo = "Assigned person is required";
    }

    if (!formData.createdDate) {
      newErrors.createdDate = "Created date is required";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    if (
      formData.createdDate &&
      formData.dueDate &&
      formData.dueDate < formData.createdDate
    ) {
      newErrors.dueDate =
        "Due date cannot be before created date";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isEditMode && existingTicket) {
      setTickets((previousTickets) =>
        previousTickets.map((ticket) =>
          ticket.id === id
            ? {
                ...ticket,
                clientName: formData.clientName.trim(),
                productLine: formData.productLine,
                title: formData.title.trim(),
                description: formData.description.trim(),
                priority: formData.priority,
                status: formData.status,
                assignedTo: formData.assignedTo,
                createdDate: formData.createdDate,
                dueDate: formData.dueDate,
              }
            : ticket
        )
      );

      navigate(`/tickets/${id}`);
      return;
    }

    const nextNumber =
      tickets.reduce((max, ticket) => {
        const number = Number(
          ticket.id.replace("TKT-", "")
        );

        return number > max ? number : max;
      }, 0) + 1;

    const newTicket = {
      id: `TKT-${String(nextNumber).padStart(3, "0")}`,
      clientName: formData.clientName.trim(),
      productLine: formData.productLine,
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: formData.status,
      assignedTo: formData.assignedTo,
      createdDate: formData.createdDate,
      dueDate: formData.dueDate,
      internalNotes: formData.internalNotes.trim()
        ? [
            {
              text: formData.internalNotes.trim(),
              timestamp: new Date().toISOString(),
            },
          ]
        : [],
    };

    setTickets((previousTickets) => [
      ...previousTickets,
      newTicket,
    ]);

    navigate("/tickets");
  };

  if (isEditMode && !existingTicket) {
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

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          {isEditMode ? "Edit Ticket" : "Create Ticket"}
        </h1>

        <p className="mt-1 text-slate-500">
          {isEditMode
            ? "Update ticket information"
            : "Create a new client support ticket"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Ticket ID */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Ticket ID
            </label>

            <input
              type="text"
              value={
                isEditMode ? existingTicket.id : "Auto Generated"
              }
              disabled
              className="w-full px-4 py-3 border rounded-lg bg-slate-100 text-slate-500"
            />
          </div>

          {/* Client */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Client Name *
            </label>

            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="Enter client name"
              className="w-full px-4 py-3 border rounded-lg"
            />

            {errors.clientName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.clientName}
              </p>
            )}
          </div>

          {/* Product */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Product Line *
            </label>

            <select
              name="productLine"
              value={formData.productLine}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg bg-white"
            >
              <option value="">Select product</option>
              <option value="CRM">CRM</option>
              <option value="Hospitality PMS">
                Hospitality PMS
              </option>
              <option value="IT Service">
                IT Service
              </option>
            </select>

            {errors.productLine && (
              <p className="mt-1 text-sm text-red-600">
                {errors.productLine}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Title *
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter ticket title"
              className="w-full px-4 py-3 border rounded-lg"
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title}
              </p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Priority *
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg bg-white"
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>

            {errors.priority && (
              <p className="mt-1 text-sm text-red-600">
                {errors.priority}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Status *
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg bg-white"
            >
              <option value="">Select status</option>
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

            {errors.status && (
              <p className="mt-1 text-sm text-red-600">
                {errors.status}
              </p>
            )}
          </div>

          {/* Assigned */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Assigned To *
            </label>

            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg bg-white"
            >
              <option value="">Select person</option>
              <option value="Rahul">Rahul</option>
              <option value="Amit">Amit</option>
              <option value="Priya">Priya</option>
              <option value="Neha">Neha</option>
            </select>

            {errors.assignedTo && (
              <p className="mt-1 text-sm text-red-600">
                {errors.assignedTo}
              </p>
            )}
          </div>

          {/* Created Date */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Created Date *
            </label>

            <input
              type="date"
              name="createdDate"
              value={formData.createdDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            />

            {errors.createdDate && (
              <p className="mt-1 text-sm text-red-600">
                {errors.createdDate}
              </p>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Due Date *
            </label>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            />

            {errors.dueDate && (
              <p className="mt-1 text-sm text-red-600">
                {errors.dueDate}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium text-slate-700">
              Description *
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe the issue..."
              className="w-full px-4 py-3 border rounded-lg"
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description}
              </p>
            )}
          </div>

          {/* Notes */}
          {!isEditMode && (
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium text-slate-700">
                Internal Notes
              </label>

              <textarea
                name="internalNotes"
                value={formData.internalNotes}
                onChange={handleChange}
                rows="4"
                placeholder="Optional internal notes..."
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-3">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            {isEditMode ? "Save Changes" : "Create Ticket"}
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                isEditMode
                  ? `/tickets/${id}`
                  : "/tickets"
              )
            }
            className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTicket;