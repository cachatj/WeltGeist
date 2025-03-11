import { useCallback, useEffect } from 'react';
import { Node, useReactFlow } from 'reactflow';
import useTimelineStore from '../store/useTimelineStore';
import { TimelineNode } from '../types';

const TIMELINE_VERTICAL_SPACING = 100;
const TIMELINE_HORIZONTAL_SPACING = 250;
const NODE_WIDTH = 200;
const NODE_HEIGHT = 100;

/**
 * Custom hook to handle timeline layout
 */
const useTimelineLayout = () => {
  const { getNodes, setNodes } = useReactFlow();
  const { categories } = useTimelineStore();
  
  // Function to organize nodes into a timeline layout
  const organizeTimeline = useCallback(() => {
    const nodes = getNodes() as TimelineNode[];
    if (!nodes.length) return;

    // Create category lanes
    const categoryLanes = new Map<string, number>();
    categories.forEach((category: { id: string }, index: number) => {
      categoryLanes.set(category.id, index);
    });

    // Sort nodes by date
    const sortedNodes = [...nodes].sort((a, b) => {
      const dateA = new Date(a.data.event.date).getTime();
      const dateB = new Date(b.data.event.date).getTime();
      return dateA - dateB;
    });

    // Group by category
    const nodesByCategory = new Map<string, TimelineNode[]>();
    
    sortedNodes.forEach((node) => {
      const category = node.data.event.category;
      if (!nodesByCategory.has(category)) {
        nodesByCategory.set(category, []);
      }
      nodesByCategory.get(category)?.push(node);
    });

    // Position nodes in their lanes
    const positionedNodes = sortedNodes.map((node) => {
      const category = node.data.event.category;
      const laneIndex = categoryLanes.get(category) || 0;
      const nodesInCategory = nodesByCategory.get(category) || [];
      const nodeIndexInCategory = nodesInCategory.findIndex(n => n.id === node.id);
      
      // Calculate position
      const x = nodeIndexInCategory * TIMELINE_HORIZONTAL_SPACING;
      const y = laneIndex * TIMELINE_VERTICAL_SPACING;
      
      return {
        ...node,
        position: { x, y },
      };
    });

    setNodes(positionedNodes);
  }, [getNodes, setNodes, categories]);

  // Apply layout on initial render
  useEffect(() => {
    organizeTimeline();
  }, [organizeTimeline]);

  return {
    organizeTimeline,
  };
};

export default useTimelineLayout;
