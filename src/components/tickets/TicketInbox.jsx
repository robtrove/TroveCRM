import React, { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

export function TicketInbox({ tickets, onSelectTicket }) {
  const [view, setView] = useState('inbox');
  const [filter, setFilter] = useState('all');

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'all') return true;
    if (filter === 'unassigned') return !ticket.assignedTo;
    if (filter === 'assigned') return ticket.assignedTo;
    return ticket.status === filter;
  });

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant={view === 'inbox' ? 'primary' : 'secondary'}
            onClick={() => setView('inbox')}
          >
            Inbox
          </Button>
          <Button
            variant={view === 'my-tickets' ? 'primary' : 'secondary'}
            onClick={() => setView('my-tickets')}
          >
            My Tickets
          </Button>
        </div>
        <Button>New Ticket</Button>
      </div>

      <Card className="flex-1">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-sm"
            >
              <option value="all">All Tickets</option>
              <option value="unassigned">Unassigned</option>
              <option value="assigned">Assigned</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <div className="flex-1" />
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{filteredTickets.length} tickets</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredTickets.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => onSelectTicket(ticket)}
                className="w-full flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${
                      ticket.priority === 'urgent' ? 'bg-red-500' :
                      ticket.priority === 'high' ? 'bg-orange-500' :
                      ticket.priority === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`} />
                    <h3 className="font-medium truncate">{ticket.title}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-lg ${
                      ticket.status === 'open' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                      ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{ticket.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm text-gray-500">
                    {format(new Date(ticket.createdAt), 'MMM d, HH:mm')}
                  </span>
                  {ticket.assignedTo && (
                    <div className="flex items-center gap-2">
                      <img
                        src={ticket.assignedTo.avatar}
                        alt={ticket.assignedTo.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {ticket.assignedTo.name}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}