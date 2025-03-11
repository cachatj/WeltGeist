import React from 'react';
import useTimelineStore from '../../store/useTimelineStore';

const Toolbar: React.FC = () => {
  const { resetLayout } = useTimelineStore();
  
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

  return (
    <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
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
      
      <div className="flex items-center space-x-2">
        <button
          onClick={handleAddEvent}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Event
        </button>
        
        <button
          onClick={handleResetLayout}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Reset Layout
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
