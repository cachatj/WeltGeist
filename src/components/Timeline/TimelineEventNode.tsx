import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { TimelineEvent } from '../../types';

interface TimelineEventNodeProps extends NodeProps {
  data: {
    event: TimelineEvent;
  };
}

const TimelineEventNode: React.FC<TimelineEventNodeProps> = ({ data }) => {
  const { event } = data;
  const formatDate = (date: Date | string) => {
    if (typeof date === 'string') {
      return new Date(date).toLocaleDateString();
    }
    return date.toLocaleDateString();
  };

  return (
    <div className="rounded-md shadow-md bg-white p-3 border-2 border-gray-200 min-w-[200px] max-w-sm">
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      
      <div className="mb-2">
        <div className="text-xs text-gray-500">{formatDate(event.date)}</div>
        <h3 className="font-bold text-lg truncate">{event.title}</h3>
      </div>
      
      <div className="text-sm mb-2 line-clamp-3">{event.description}</div>
      
      <div className="flex flex-wrap gap-1 mt-2">
        {event.tags.map((tag) => (
          <span key={tag} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
    </div>
  );
};

export default TimelineEventNode;
