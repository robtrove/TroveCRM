import React, { useState, useCallback, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { DealCard } from './DealCard';
import { AIAssistant } from './AIAssistant';
import { NewDealModal } from './NewDealModal';
import { dealService } from '../../services/supabase';
import toast from 'react-hot-toast';

const stages = {
  qualified: {
    id: 'qualified',
    title: 'Qualified',
    color: 'bg-blue-500'
  },
  contact_made: {
    id: 'contact_made',
    title: 'Contact Made',
    color: 'bg-purple-500'
  },
  demo_scheduled: {
    id: 'demo_scheduled',
    title: 'Demo Scheduled',
    color: 'bg-yellow-500'
  },
  proposal: {
    id: 'proposal',
    title: 'Proposal',
    color: 'bg-orange-500'
  },
  negotiation: {
    id: 'negotiation',
    title: 'Negotiation',
    color: 'bg-pink-500'
  },
  closed: {
    id: 'closed',
    title: 'Closed',
    color: 'bg-green-500'
  }
};

export function PipelinePage() {
  const [deals, setDeals] = useState([]);
  const [isNewDealModalOpen, setIsNewDealModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [isAICollapsed, setIsAICollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch deals on component mount
  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const data = await dealService.getDeals();
      setDeals(data);
    } catch (error) {
      console.error('Error fetching deals:', error);
      toast.error('Failed to load pipeline deals');
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = useCallback(async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const deal = deals.find(d => d.id.toString() === result.draggableId);
    
    if (deal && source.droppableId !== destination.droppableId) {
      // Update progress based on stage
      const stageProgress = {
        qualified: 20,
        contact_made: 40,
        demo_scheduled: 60,
        proposal: 75,
        negotiation: 85,
        closed: 100
      };

      try {
        // Update the deal in the database
        const updates = {
          stage: destination.droppableId,
          progress: stageProgress[destination.droppableId] || deal.progress,
          updated_at: new Date().toISOString()
        };

        await dealService.updateDeal(deal.id, updates);

        // Update local state
        const updatedDeals = deals.map(d => {
          if (d.id.toString() === result.draggableId) {
            return { 
              ...d, 
              stage: destination.droppableId,
              progress: stageProgress[destination.droppableId] || d.progress
            };
          }
          return d;
        });
        setDeals(updatedDeals);
        
        // Update selected deal if it's the one being dragged
        if (selectedDeal && selectedDeal.id.toString() === result.draggableId) {
          setSelectedDeal({ 
            ...selectedDeal, 
            stage: destination.droppableId,
            progress: stageProgress[destination.droppableId] || selectedDeal.progress
          });
        }

        toast.success('Deal moved successfully');
      } catch (error) {
        console.error('Error updating deal stage:', error);
        toast.error('Failed to move deal');
      }
    }
  }, [deals, selectedDeal]);

  const handleCreateDeal = async (newDeal) => {
    try {
      // Map the deal data to match the database schema
      const dealData = {
        title: newDeal.title,
        company: newDeal.company,
        value: newDeal.value,
        stage: 'qualified',
        progress: 20,
        due_date: newDeal.dueDate,
        assigned_to: newDeal.assignedTo
      };

      // Create deal in the database
      const savedDeal = await dealService.createDeal(dealData);

      // Format the returned deal object to match the app's format
      const formattedDeal = {
        ...savedDeal,
        dueDate: savedDeal.due_date
      };

      setDeals([...deals, formattedDeal]);
      toast.success('Deal created successfully');
    } catch (error) {
      console.error('Error creating deal:', error);
      toast.error('Failed to create deal');
    }
  };

  const handleSelectDeal = useCallback((deal) => {
    setSelectedDeal(deal);
  }, []);

  const getTotalValue = useCallback((stageId) => {
    return deals
      .filter(deal => deal.stage === stageId)
      .reduce((sum, deal) => sum + (Number(deal.value) || 0), 0);
  }, [deals]);

  return (
    <main className="flex-1 min-w-0 overflow-auto">
      <div className="max-w-[1440px] mx-auto p-4 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Pipeline</h1>
          <Button onClick={() => setIsNewDealModalOpen(true)}>New Deal</Button>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <p>Loading pipeline...</p>
          </div>
        ) : (
          <div className="flex gap-6">
            {/* Pipeline Stages */}
            <div className="flex-1 overflow-x-auto">
              <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex gap-4 min-w-[1000px]">
                  {Object.values(stages).map(stage => (
                    <div key={stage.id} className="flex-1 min-w-[300px]">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                          <h3 className="font-medium">{stage.title}</h3>
                          <span className="text-sm text-gray-500">
                            ${getTotalValue(stage.id).toLocaleString()}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {deals.filter(d => d.stage === stage.id).length}
                        </span>
                      </div>

                      <Droppable droppableId={stage.id}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="space-y-4"
                          >
                            {deals
                              .filter(deal => deal.stage === stage.id)
                              .map((deal, index) => (
                                <DealCard
                                  key={deal.id}
                                  deal={deal}
                                  index={index}
                                  onClick={() => handleSelectDeal(deal)}
                                />
                              ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  ))}
                </div>
              </DragDropContext>
            </div>

            {/* AI Assistant Sidebar */}
            <div className={`transition-all duration-300 ${
              isAICollapsed ? 'w-12' : 'w-80'
            }`}>
              <div className="relative">
                <button
                  onClick={() => setIsAICollapsed(!isAICollapsed)}
                  className="absolute -left-3 top-4 p-1.5 bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-full shadow-sm z-10"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    fill="currentColor" 
                    viewBox="0 0 256 256"
                    className={`transform transition-transform ${isAICollapsed ? 'rotate-180' : ''}`}
                  >
                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/>
                  </svg>
                </button>
                {!isAICollapsed && <AIAssistant deal={selectedDeal} />}
              </div>
            </div>
          </div>
        )}
      </div>

      <NewDealModal
        isOpen={isNewDealModalOpen}
        onClose={() => setIsNewDealModalOpen(false)}
        onSubmit={handleCreateDeal 
}
      />
    </main>
  );
}