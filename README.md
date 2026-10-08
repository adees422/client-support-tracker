# Client Support Ticket Tracker

An internal client support ticket tracking application built with React and Tailwind CSS.

The application helps support teams manage client tickets across three business lines:

- CRM
- Hospitality PMS
- IT Service

## Features

### Dashboard
- Total ticket count
- Open/active ticket count
- Overdue ticket count
- Critical ticket count
- Tickets grouped by product line
- Tickets grouped by priority
- Tickets grouped by status
- Top critical tickets sorted by due date

### Ticket List
- 20 preloaded mock tickets
- Search by ticket ID, client name and ticket title
- Filter by product line
- Filter by priority
- Filter by status
- Filter by assigned person
- Combine multiple filters
- Sort by due date
- Sort by priority
- Overdue ticket highlighting
- Empty state when no tickets match

### Create & Edit Tickets
- Auto-generated ticket IDs
- Required field validation
- Due date validation
- Create new tickets
- Edit existing tickets
- Ticket status management
- Optional internal notes

### Ticket Details
- View complete ticket information
- Update ticket status
- Add timestamped internal notes
- Edit ticket
- Delete ticket with confirmation

### Persistence
- Tickets are stored in browser localStorage.
- Data remains available after refreshing the browser.

## Tech Stack

- React
- JavaScript
- React Router
- Tailwind CSS
- Recharts
- Vite
- Browser localStorage

## Setup

Prerequisites: Node.js and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To verify a production build or run the
linter, use `npm run build` and `npm run lint`.

## AI Tools

- GitHub Copilot in VS Code

## Project Structure

```text
client-support-tracker/
│
├── src/
│   ├── components/
│   │   └── Sidebar.jsx
│   │
│   ├── context/
│   │   └── TicketContext.jsx
│   │
│   ├── data/
│   │   └── mockTickets.js
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── TicketList.jsx
│   │   ├── CreateTicket.jsx
│   │   └── TicketDetail.jsx
│   ├── utils/
│   │   └── ticketDates.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md