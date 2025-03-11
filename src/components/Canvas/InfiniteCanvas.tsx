// src/components/Canvas/InfiniteCanvas.tsx
import React, { useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import Timeline from '../Timeline/Timeline';
import Toolbar from '../UI/Toolbar';
import HierarchicalCategoryLegend from '../UI/HierarchicalCategoryLegend';
import useTimelineStore from '../../store/useTimelineStore';

const InfiniteCanvas: React.FC = () => {
  const { categories } = useTimelineStore();
  const [showLegend, setShowLegend] = useState(true);
  
  const toggleLegend = () => {
    setShowLegend(prev => !prev);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Toolbar onToggleLegend={toggleLegend} showLegend={showLegend} />
      
      <div className="flex flex-1 overflow-hidden">
        {showLegend && (
          <div className="w-72 p-4 border-r border-gray-200 bg-white overflow-y-auto">
            <HierarchicalCategoryLegend categories={categories} />
          </div>
        )}
        
        <div className="flex-1 h-full">
          <ReactFlowProvider>
            <Timeline />
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
};

export default InfiniteCanvas;