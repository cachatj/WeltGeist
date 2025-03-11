// src/components/UI/Toolbar.tsx
import React, { useState } from 'react';
import useTimelineStore from '../../store/useTimelineStore';

interface ToolbarProps {
  onToggleLegend: () => void;
  showLegend: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ onToggleLegend, showLegend }) => {
  const { resetLayout, recalculateLayout } = useTimelineStore();
  const [timeRangeStart, setTimeRangeStart] = useState<string>('1400');
  const [timeRangeEnd, setTimeRangeEnd] = useState<string>('2025');
  
  const handleAddEvent = () => {
    // In a real app, this would open a modal or form
    alert('Add event functionality would go here');
  };
  
  const handleResetLayout = () => {
    resetLayout();
  };
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('searchQuery') as string;
    
    if (query) {
      // This would be connected to your search functionality
      console.log('Searching for:', query);
    }
  };
  
  const handleTimeRangeChange = () => {
    // This would filter the timeline by date range
    console.log('Time range:', timeRangeStart, 'to', timeRangeEnd);
    // Implementation would go here
  };
  
  const handleAddConnection = () => {
    // In a real app, this would enable connection mode
    alert('Add connection functionality would go here');
  };

  return (
    <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold">Weltgeist</h1>
        <span className="text-sm text-gray-500">Timeline Explorer</span>
      </div>
      
      <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
        <div className="relative">
          <input
            type="text"
            name="searchQuery"
            placeholder="Search events..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            🔍
          </button>
        </div>
      </form>
      
      <div className="flex items-center space-x-3">
        {/* Time range control */}
        <div className="flex items-center space-x-2 border-r border-gray-200 pr-3">
          <div className="text-sm">Time Range:</div>
          <input
            type="text"
            value={timeRangeStart}
            onChange={e => setTimeRangeStart(e.target.value)}
            className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
            placeholder="Start"
          />
          <span>to</span>
          <input
            type="text"
            value={timeRangeEnd}
            onChange={e => setTimeRangeEnd(e.target.value)}
            className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm"
            placeholder="End"
          />
          <button
            onClick={handleTimeRangeChange}
            className="p-1 text-blue-500 hover:text-blue-700"
          >
            Apply
          </button>
        </div>
        
        {/* Main action buttons */}
        <button
          onClick={onToggleLegend}
          className="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm"
        >
          {showLegend ? 'Hide Legend' : 'Show Legend'}
        </button>
        
        <button
          onClick={handleAddEvent}
          className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
        >
          Add Event
        </button>
        
        <button
          onClick={handleAddConnection}
          className="px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm"
        >
          Add Connection
        </button>
        
        <button
          onClick={handleResetLayout}
          className="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm"
        >
          Reset Layout
        </button>
      </div>
    </div>
  );
};

export default Toolbar;