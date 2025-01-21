import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { format } from 'date-fns';

export function DealCard({ deal, index, onClick }) {
  return (
    <Draggable draggableId={deal.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-gray-800 p-4 cursor-pointer transition-shadow hover:shadow-md ${
            snapshot.isDragging ? 'shadow-lg' : ''
          }`}
          onClick={onClick}
        >
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">{deal.title}</h4>
              <p className="text-sm text-gray-500">{deal.company}</p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                ${deal.value.toLocaleString()}
              </span>
              <div className="flex items-center gap-2">
                <img
                  src={deal.assignedTo.avatar}
                  alt={deal.assignedTo.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-gray-500">{format(new Date(deal.dueDate), 'MMM d')}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                <span>Progress</span>
                <span>{deal.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${deal.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}