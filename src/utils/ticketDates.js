export function isOverdue(ticket) {
  if (ticket.status === "Resolved" || ticket.status === "Closed") {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(ticket.dueDate);
  dueDate.setHours(0, 0, 0, 0);

  return dueDate < today;
}
