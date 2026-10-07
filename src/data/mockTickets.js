const mockTickets = [
  {
    id: "TKT-001",
    clientName: "ABC Technologies",
    productLine: "CRM",
    title: "Unable to login",
    description: "Users are unable to login to the CRM system.",
    priority: "High",
    status: "Open",
    assignedTo: "Rahul",
    createdDate: "2026-10-01",
    dueDate: "2026-10-08",
    internalNotes: []
  },

  {
    id: "TKT-002",
    clientName: "Grand Palace Hotel",
    productLine: "Hospitality PMS",
    title: "Room booking sync issue",
    description: "Room bookings are not syncing correctly.",
    priority: "Critical",
    status: "In Progress",
    assignedTo: "Amit",
    createdDate: "2026-10-02",
    dueDate: "2026-10-06",
    internalNotes: []
  },

  {
    id: "TKT-003",
    clientName: "TechNova Ltd",
    productLine: "IT Service",
    title: "Server connectivity issue",
    description: "Client is experiencing intermittent server connectivity.",
    priority: "Critical",
    status: "Open",
    assignedTo: "Priya",
    createdDate: "2026-10-03",
    dueDate: "2026-10-07",
    internalNotes: []
  },

  {
    id: "TKT-004",
    clientName: "Bright Solutions",
    productLine: "CRM",
    title: "Lead import failing",
    description: "CSV lead import is failing for large files.",
    priority: "Medium",
    status: "Open",
    assignedTo: "Rahul",
    createdDate: "2026-10-04",
    dueDate: "2026-10-10",
    internalNotes: []
  },

  {
    id: "TKT-005",
    clientName: "Sunrise Hotel",
    productLine: "Hospitality PMS",
    title: "Invoice generation problem",
    description: "Invoices are not being generated after checkout.",
    priority: "High",
    status: "Waiting on Client",
    assignedTo: "Neha",
    createdDate: "2026-10-01",
    dueDate: "2026-10-05",
    internalNotes: []
  },

  {
    id: "TKT-006",
    clientName: "Global Mart",
    productLine: "CRM",
    title: "Email notification not received",
    description: "Users are not receiving CRM email notifications.",
    priority: "Medium",
    status: "Resolved",
    assignedTo: "Amit",
    createdDate: "2026-09-28",
    dueDate: "2026-10-02",
    internalNotes: []
  },

  {
    id: "TKT-007",
    clientName: "Royal Stay",
    productLine: "Hospitality PMS",
    title: "Guest profile issue",
    description: "Guest profile information is not updating correctly.",
    priority: "Low",
    status: "Open",
    assignedTo: "Priya",
    createdDate: "2026-10-05",
    dueDate: "2026-10-12",
    internalNotes: []
  },

  {
    id: "TKT-008",
    clientName: "DataWorks",
    productLine: "IT Service",
    title: "VPN connection issue",
    description: "Employees are unable to connect to the corporate VPN.",
    priority: "High",
    status: "In Progress",
    assignedTo: "Rahul",
    createdDate: "2026-10-03",
    dueDate: "2026-10-09",
    internalNotes: []
  },

  {
    id: "TKT-009",
    clientName: "Metro Retail",
    productLine: "CRM",
    title: "Dashboard loading slowly",
    description: "CRM dashboard takes too long to load.",
    priority: "Medium",
    status: "Open",
    assignedTo: "Neha",
    createdDate: "2026-10-04",
    dueDate: "2026-10-11",
    internalNotes: []
  },

  {
    id: "TKT-010",
    clientName: "Ocean View Hotel",
    productLine: "Hospitality PMS",
    title: "Payment gateway failure",
    description: "Payments are failing during checkout.",
    priority: "Critical",
    status: "Open",
    assignedTo: "Amit",
    createdDate: "2026-10-02",
    dueDate: "2026-10-04",
    internalNotes: []
  },

  {
    id: "TKT-011",
    clientName: "CloudNet",
    productLine: "IT Service",
    title: "Database backup failure",
    description: "Scheduled database backups are failing.",
    priority: "Critical",
    status: "In Progress",
    assignedTo: "Priya",
    createdDate: "2026-10-01",
    dueDate: "2026-10-05",
    internalNotes: []
  },

  {
    id: "TKT-012",
    clientName: "Alpha Corp",
    productLine: "CRM",
    title: "Contact deletion issue",
    description: "Users cannot delete duplicate contacts.",
    priority: "Low",
    status: "Closed",
    assignedTo: "Rahul",
    createdDate: "2026-09-25",
    dueDate: "2026-09-30",
    internalNotes: []
  },

  {
    id: "TKT-013",
    clientName: "Lake View Resort",
    productLine: "Hospitality PMS",
    title: "Room availability incorrect",
    description: "Room availability is showing incorrect values.",
    priority: "High",
    status: "In Progress",
    assignedTo: "Neha",
    createdDate: "2026-10-03",
    dueDate: "2026-10-08",
    internalNotes: []
  },

  {
    id: "TKT-014",
    clientName: "SecureIT",
    productLine: "IT Service",
    title: "Firewall configuration issue",
    description: "Firewall configuration needs to be updated.",
    priority: "High",
    status: "Waiting on Client",
    assignedTo: "Amit",
    createdDate: "2026-10-02",
    dueDate: "2026-10-09",
    internalNotes: []
  },

  {
    id: "TKT-015",
    clientName: "NextGen Solutions",
    productLine: "CRM",
    title: "Report export failure",
    description: "Users cannot export reports to Excel.",
    priority: "Medium",
    status: "Open",
    assignedTo: "Priya",
    createdDate: "2026-10-05",
    dueDate: "2026-10-12",
    internalNotes: []
  },

  {
    id: "TKT-016",
    clientName: "Heritage Hotel",
    productLine: "Hospitality PMS",
    title: "Check-in issue",
    description: "Reception staff are unable to complete guest check-in.",
    priority: "High",
    status: "Resolved",
    assignedTo: "Rahul",
    createdDate: "2026-09-29",
    dueDate: "2026-10-03",
    internalNotes: []
  },

  {
    id: "TKT-017",
    clientName: "InfoTech",
    productLine: "IT Service",
    title: "Email server issue",
    description: "Company email delivery is delayed.",
    priority: "Medium",
    status: "Open",
    assignedTo: "Neha",
    createdDate: "2026-10-04",
    dueDate: "2026-10-08",
    internalNotes: []
  },

  {
    id: "TKT-018",
    clientName: "Elite Traders",
    productLine: "CRM",
    title: "Customer search issue",
    description: "Customer search returns incomplete results.",
    priority: "Low",
    status: "Open",
    assignedTo: "Amit",
    createdDate: "2026-10-06",
    dueDate: "2026-10-13",
    internalNotes: []
  },

  {
    id: "TKT-019",
    clientName: "Green Valley Resort",
    productLine: "Hospitality PMS",
    title: "Booking cancellation issue",
    description: "Cancelled bookings are still appearing as active.",
    priority: "High",
    status: "Waiting on Client",
    assignedTo: "Priya",
    createdDate: "2026-10-04",
    dueDate: "2026-10-07",
    internalNotes: []
  },

  {
    id: "TKT-020",
    clientName: "Digital Works",
    productLine: "IT Service",
    title: "Office network outage",
    description: "Network connectivity is unavailable in the office.",
    priority: "Critical",
    status: "Open",
    assignedTo: "Rahul",
    createdDate: "2026-10-06",
    dueDate: "2026-10-07",
    internalNotes: []
  }
];

export default mockTickets;