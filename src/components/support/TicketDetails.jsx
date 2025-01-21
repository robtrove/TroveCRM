import React, { useState, useRef } from 'react';
import { format } from 'date-fns';
import { Dialog } from '@headlessui/react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { ArticleEditor } from './ArticleEditor';
import toast from 'react-hot-toast';

const priorityOptions = [
  { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' }
];

const supportAgents = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    avatar: 'https://cdn.usegalileo.ai/stability/e9fdb59b-64bb-4239-8e52-f71e0cfb538e.png',
    role: 'Senior Support Agent'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://cdn.usegalileo.ai/stability/1af7ccee-eb75-4af5-b80e-ee2ec64a79ef.png',
    role: 'Support Agent'
  }
];

export function TicketDetails({ ticket, onUpdateStatus, onAddComment, onAssign, onUpdatePriority }) {
  const [comment, setComment] = useState('');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const fileInputRef = useRef(null);
  const [attachments, setAttachments] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(comment, attachments);
      setComment('');
      setAttachments([]);
      setPreviewUrl(null);
    }
  };

  const handleAssign = (agentId) => {
    onAssign(agentId);
    setIsAssignModalOpen(false);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(files);

    // Preview for images
    if (files[0]?.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleGenerateAIResponse = async () => {
    setIsGeneratingAI(true);
    try {
      // Simulate AI response generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      const aiResponse = "Based on similar tickets and our knowledge base, here's a suggested response...";
      setComment(aiResponse);
      toast.success('AI response generated');
    } catch (error) {
      toast.error('Failed to generate AI response');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">{ticket.title}</h2>
              <p className="text-sm text-gray-500">Ticket #{ticket.id}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 sm:flex-none min-w-[140px]">
                <select
                  value={ticket.status}
                  onChange={(e) => onUpdateStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover text-sm"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <Button 
                variant="secondary"
                onClick={() => setIsAssignModalOpen(true)}
              >
                Assign
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Ticket Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-gray-50 dark:bg-dark-hover">
              <div>
                <p className="text-sm text-gray-500">Priority</p>
                <select
                  value={ticket.priority}
                  onChange={(e) => onUpdatePriority(e.target.value)}
                  className={`mt-1 px-3 py-1 rounded-lg text-sm font-medium ${
                    priorityOptions.find(opt => opt.value === ticket.priority)?.color
                  }`}
                >
                  {priorityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{ticket.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="font-medium">{format(new Date(ticket.createdAt), 'MMM d, yyyy')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium">{format(new Date(ticket.updatedAt), 'MMM d, yyyy')}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-medium mb-2">Description</h3>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{ticket.description}</p>
            </div>

            {/* Assigned To */}
            {ticket.assignedTo && (
              <div>
                <h3 className="text-sm font-medium mb-2">Assigned To</h3>
                <div className="flex items-center gap-3">
                  <img
                    src={ticket.assignedTo.avatar}
                    alt={ticket.assignedTo.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{ticket.assignedTo.name}</p>
                    <p className="text-sm text-gray-500">{ticket.assignedTo.role}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Comments */}
            <div>
              <h3 className="text-sm font-medium mb-4">Comments</h3>
              <div className="space-y-4">
                {ticket.comments.map((comment, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={comment.author.avatar}
                      alt={comment.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-medium">{comment.author.name}</span>
                        <span className="text-sm text-gray-500">
                          {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <div 
                        className="text-gray-700 dark:text-gray-300 mt-1"
                        dangerouslySetInnerHTML={{ __html: comment.content }}
                      />
                      {comment.attachments?.map((attachment, i) => (
                        <div key={i} className="mt-2">
                          <a 
                            href={attachment.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm"
                          >
                            {attachment.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Comment */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleGenerateAIResponse}
                    disabled={isGeneratingAI}
                  >
                    {isGeneratingAI ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      'Generate AI Response'
                    )}
                  </Button>
                </div>

                <ArticleEditor
                  content={comment}
                  onChange={setComment}
                />

                {/* File Upload */}
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                  />
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Attach Files
                    </Button>
                    {attachments.length > 0 && (
                      <span className="text-sm text-gray-500">
                        {attachments.length} file(s) selected
                      </span>
                    )}
                  </div>
                  {previewUrl && (
                    <div className="mt-2">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-w-xs rounded-lg border border-gray-200 dark:border-gray-700"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={!comment.trim()}>
                    Add Comment
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>

      {/* Assignment Modal */}
      <Dialog
        open={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/20 dark:bg-black/40" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white dark:bg-dark-card rounded-2xl shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <Dialog.Title className="text-lg font-semibold">
                Assign Ticket
              </Dialog.Title>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-2">
                {supportAgents.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No support agents available</p>
                ) : (
                  supportAgents.map((agent) => (
                    <button
                      key={agent.id}
                      onClick={() => handleAssign(agent.id)}
                      className="flex items-center gap-4 w-full p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
                    >
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1 text-left">
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-gray-500">{agent.role}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}