import React, { useState } from 'react';
import { TicketInbox } from './TicketInbox';
import { TicketDetails } from '../support/TicketDetails';

const mockTickets = [
  {
    id: 1,
    title: 'Cannot access dashboard',
    description: 'I am unable to access the dashboard after logging in.',
    status: 'open',
    priority: 'high',
    category: 'Technical',
    createdAt: '2023-12-22T10:30:00Z',
    updatedAt: '2023-12-22T10:30:00Z',
    assignedTo: null,
    comments: []
  },
  {
    id: 2,
    title: 'Billing issue with subscription',
    description: 'My last payment was not processed correctly.',
    status: 'in_progress',
    priority: 'medium',
    category: 'Billing',
    createdAt: '2023-12-22T09:15:00Z',
    updatedAt: '2023-12-22T09:15:00Z',
    assignedTo: {
      id: 1,
      name: 'John Smith',
      avatar: 'https://cdn.usegalileo.ai/stability/e9fdb59b-64bb-4239-8e52-f71e0cfb538e.png',
      role: 'Support Agent'
    },
    comments: []
  }
];

export function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState(mockTickets);

  const handleUpdateTicketStatus = (status) => {
    if (selectedTicket) {
      const updatedTickets = tickets.map(ticket => 
        ticket.id === selectedTicket.id 
          ? { ...ticket, status, updatedAt: new Date().toISOString() }
          : ticket
      );
      setTickets(updatedTickets);
      setSelectedTicket({ ...selectedTicket, status, updatedAt: new Date().toISOString() });
    }
  };

  const handleAddComment = (content) => {
    if (selectedTicket) {
      const newComment = {
        author: {
          name: 'Support Agent',
          avatar: 'https://cdn.usegalileo.ai/stability/e9fdb59b-64bb-4239-8e52-f71e0cfb538e.png'
        },
        content,
        createdAt: new Date().toISOString()
      };

      const updatedTickets = tickets.map(ticket =>
        ticket.id === selectedTicket.id
          ? { 
              ...ticket, 
              comments: [...ticket.comments, newComment],
              updatedAt: new Date().toISOString()
            }
          : ticket
      );

      setTickets(updatedTickets);
      setSelectedTicket({
        ...selectedTicket,
        comments: [...selectedTicket.comments, newComment],
        updatedAt: new Date().toISOString()
      });
    }
  };

  const handleAssignTicket = (agentId) => {
    if (selectedTicket) {
      const agent = {
        id: agentId,
        name: agentId === 1 ? 'John Smith' : 'Sarah Johnson',
        avatar: agentId === 1 
          ? 'https://cdn.usegalileo.ai/stability/e9fdb59b-64bb-4239-8e52-f71e0cfb538e.png'
          : 'https://cdn.usegalileo.ai/stability/1af7ccee-eb75-4af5-b80e-ee2ec64a79ef.png',
        role: agentId === 1 ? 'Senior Support Agent' : 'Support Agent'
      };

      const updatedTickets = tickets.map(ticket =>
        ticket.id === selectedTicket.id
          ? { 
              ...ticket, 
              assignedTo: agent,
              updatedAt: new Date().toISOString()
            }
          : ticket
      );

      setTickets(updatedTickets);
      setSelectedTicket({
        ...selectedTicket,
        assignedTo: agent,
        updatedAt: new Date().toISOString()
      });
    }
  };

  return (
    <main className="flex-1 min-w-0 overflow-auto">
      <div className="max-w-[1440px] mx-auto p-4 animate-fade-in">
        {selectedTicket ? (
          <div className="space-y-4">
            <button
              onClick={() => setSelectedTicket(null)}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Inbox
            </button>
            <TicketDetails
              ticket={selectedTicket}
              onUpdateStatus={handleUpdateTicketStatus}
              onAddComment={handleAddComment}
              onAssign={handleAssignTicket}
            />
          </div>
        ) : (
          <TicketInbox
            tickets={tickets}
            onSelectTicket={setSelectedTicket}
          />
        )}
      </div>
    </main>
  );
}