import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FeedbackButtons } from './FeedbackButtons';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = { type: 'user', text: newMessage };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        type: 'bot',
        text: "Thanks for your message! I will help you with that.",
        showFeedback: true
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleFeedback = (messageIndex, feedback) => {
    setMessages(prev => prev.map((msg, i) => {
      if (i === messageIndex) {
        return { ...msg, feedback, showFeedback: false };
      }
      return msg;
    }));
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-4 bg-black text-white rounded-full shadow-lg hover:bg-gray-900 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Chat Dialog */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="fixed inset-0" aria-hidden="true" />
        
        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <Dialog.Panel className="w-screen max-w-md transform transition-all">
            <div className="h-full flex flex-col bg-white dark:bg-dark-card shadow-xl rounded-l-2xl">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-lg font-semibold">
                    Chat Support
                  </Dialog.Title>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="space-y-2">
                        <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.type === 'user'
                            ? 'bg-black text-white'
                            : 'bg-gray-100 dark:bg-dark-hover'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        </div>
                        {message.type === 'bot' && message.showFeedback && (
                          <FeedbackButtons onFeedback={(feedback) => handleFeedback(index, feedback)} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-hover"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-900 disabled:opacity-50 disabled:hover:bg-black transition-colors"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}