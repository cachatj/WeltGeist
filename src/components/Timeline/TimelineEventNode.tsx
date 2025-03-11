// src/components/Timeline/TimelineEventNode.tsx
import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { TimelineEvent } from '../../types';
import useTimelineStore from '../../store/useTimelineStore';

interface TimelineEventNodeProps extends NodeProps {
  data: {
    event: TimelineEvent;
  };
}

const TimelineEventNode: React.FC<TimelineEventNodeProps> = ({ data }) => {
  const { event } = data;
  const { categories } = useTimelineStore();
  
  // Find the category info
  const category = categories.find((c: { id: string }) => c.id === event.category);
  
  // Format date for display
  const formatDate = (date: Date | string): string => {
    if (typeof date === 'string') {
      // Handle year-only or year-month dates
      if (date.length === 4 || date.match(/^\d{4}-\d{2}$/)) {
        return date;
      }
      return new Date(date).toLocaleDateString();
    }
    return date.toLocaleDateString();
  };
  
  // Calculate impact indicator width
  const impactWidth = event.impact ? `${event.impact}%` : '50%';
  
  // Get level display name
  const getLevelName = (level: string): string => {
    switch(level) {
      case 'weltgeist': return 'Weltgeist';
      case 'zeitgeist': return 'Zeitgeist';
      case 'geist': return 'Geist';
      case 'biology': return 'Biology';
      case 'dna': return 'DNA';
      default: return level;
    }
  };
  
  return (
    <div 
      className="rounded-md shadow-md bg-white p-3 border-2 min-w-[220px] max-w-sm"
      style={{ 
        borderColor: category?.color || '#e2e8f0',
        borderLeftWidth: '4px',
      }}
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      
      <div className="mb-2">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">{formatDate(event.date)}</div>
          <div 
            className="text-xs px-2 py-0.5 rounded-full" 
            style={{ 
              backgroundColor: category?.color || '#e2e8f0',
              color: '#ffffff'
            }}
          >
            {category?.name || event.category}
          </div>
        </div>
        <h3 className="font-bold text-lg truncate mt-1">{event.title}</h3>
      </div>
      
      <div className="text-sm mb-2 line-clamp-3">{event.description}</div>
      
      {/* Impact indicator */}
      {event.impact !== undefined && (
        <div className="mt-2 mb-2">
          <div className="text-xs text-gray-500 mb-1">Historical Impact</div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="h-1.5 rounded-full" 
              style={{ 
                width: impactWidth,
                backgroundColor: category?.color || '#3B82F6'
              }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Level indicator */}
      <div className="flex items-center mt-2 mb-2">
        <div className="text-xs text-gray-500 mr-1">Level:</div>
        <div 
          className="text-xs px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: '#f3f4f6',
            borderLeft: `3px solid ${category?.color || '#6B7280'}`
          }}
        >
          {getLevelName(event.level)}
        </div>
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-2">
        {event.tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">
            #{tag}
          </span>
        ))}
      </div>
      
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </div>
  );
};

export default TimelineEventNode;
