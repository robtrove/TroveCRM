import React, { useState } from 'react';
import { TicketList } from './TicketList';
import { TicketDetails } from './TicketDetails';
import { KnowledgeBase } from './KnowledgeBase';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

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
    comments: [
      {
        author: {
          name: 'Support Agent',
          avatar: 'https://cdn.usegalileo.ai/stability/e9fdb59b-64bb-4239-8e52-f71e0cfb538e.png'
        },
        content: 'Could you please clear your browser cache and try again?',
        createdAt: '2023-12-22T10:35:00Z'
      }
    ]
  }
];

const mockArticles = [
  {
    id: 1,
    title: 'Getting Started Guide',
    content: 'Welcome to our platform! This guide will help you get started...',
    category: 'Getting Started',
    views: 1250,
    createdAt: '2023-12-01T00:00:00Z'
  }
];

export function SupportPage() {
  const [view, setView] = useState('tickets');
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

      if (status === 'closed') {
        toast.success('Ticket closed successfully');
        setSelectedTicket(null); // Return to ticket list
      } else {
        setSelectedTicket({ ...selectedTicket, status, updatedAt: new Date().toISOString() });
      }
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
      // In a real app, you would fetch the agent details from your backend
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
      <div className="max-w-[1440px] mx-auto animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4">
          <h1 className="text-2xl md:text-3xl font-bold">Support</h1>
          <div className="flex items-center gap-2">
            <Button
              variant={view === 'tickets' ? 'primary' : 'secondary'}
              onClick={() => setView('tickets')}
            >
              Tickets
            </Button>
            <Button
              variant={view === 'knowledge' ? 'primary' : 'secondary'}
              onClick={() => setView('knowledge')}
            >
              Knowledge Base
            </Button>
          </div>
        </div>

        <div className="p-4">
          {view === 'tickets' ? (
            selectedTicket ? (
              <div className="space-y-4">
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Tickets
                </button>
                <TicketDetails
                  ticket={selectedTicket}
                  onUpdateStatus={handleUpdateTicketStatus}
                  onAddComment={handleAddComment}
                  onAssign={handleAssignTicket}
                />
              </div>
            ) : (
              <TicketList
                tickets={tickets}
                onSelectTicket={setSelectedTicket}
              />
            )
          ) : (
            <KnowledgeBase
              articles={mockArticles}
              onSelectArticle={(article) => console.log('Selected article:', article)}
            />
          )}
        </div>
      </div>
    </main>
  );
}