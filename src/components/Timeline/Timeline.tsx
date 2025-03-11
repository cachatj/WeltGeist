// src/components/Timeline/Timeline.tsx
import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  EdgeTypes,
  useNodesState,
  useEdgesState,
  Connection,
  BackgroundVariant
} from 'reactflow';
import 'reactflow/dist/style.css';

import useTimelineStore from '../../store/useTimelineStore';
import { TimelineNode, TimelineEdge as TimelineEdgeType } from '../../types';
import TimelineEventNode from './TimelineEventNode';
import TimelineEdge from './TimelineEdge';

// Define custom node and edge types
const nodeTypes: NodeTypes = {
  timelineEvent: TimelineEventNode,
};

const edgeTypes: EdgeTypes = {
  timeline: TimelineEdge,
};

const Timeline: React.FC = () => {
  const {
    nodes: storeNodes,
    edges: storeEdges,
    addEdge: storeAddEdge,
    onNodesChange,
    onEdgesChange,
    visibleCategories,
    visibleLevels,
    categories
  } = useTimelineStore();

  // Filter nodes based on visible categories and levels
  const filteredNodes = useMemo(() => {
    return storeNodes.filter((node: TimelineNode) => {
      const event = node.data.event;
      return visibleCategories.includes(event.category) && visibleLevels.includes(event.level);
    });
  }, [storeNodes, visibleCategories, visibleLevels]);

  // Filter edges based on visible nodes
  const filteredEdges = useMemo(() => {
    const visibleNodeIds = new Set(filteredNodes.map((node: TimelineNode) => node.id));
    return storeEdges.filter((edge: TimelineEdgeType) => 
      visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
    ).map((edge: TimelineEdgeType) => ({
      ...edge,
      type: 'timeline', // Use our custom edge type
    }));
  }, [storeEdges, filteredNodes]);

  const [nodes, setNodes, onNodesChangeInternal] = useNodesState(filteredNodes);
  const [edges, setEdges, onEdgesChangeInternal] = useEdgesState(filteredEdges);

  // Sync ReactFlow's internal state with our filtered store nodes/edges
  React.useEffect(() => {
    setNodes(filteredNodes);
    setEdges(filteredEdges);
  }, [filteredNodes, filteredEdges, setNodes, setEdges]);

  // Handle node changes
  const handleNodesChange = useCallback((changes: any) => {
    onNodesChangeInternal(changes);
    onNodesChange(changes);
  }, [onNodesChangeInternal, onNodesChange]);

  // Handle edge changes
  const handleEdgesChange = useCallback((changes: any) => {
    onEdgesChangeInternal(changes);
    onEdgesChange(changes);
  }, [onEdgesChangeInternal, onEdgesChange]);

  // Handle edge connections
  const onConnect = useCallback(
    (connection: Connection) => {
      storeAddEdge(connection);
    },
    [storeAddEdge]
  );

  // Create a minimap node color function based on category
  const nodeColor = useCallback((node: any) => {
    const category = categories.find((c: { id: string }) => c.id === node.data.event.category);
    return category?.color || '#6B7280';
  }, [categories]);

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        minZoom={0.1}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
        attributionPosition="bottom-right"
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls />
        <MiniMap nodeColor={nodeColor} zoomable pannable />
      </ReactFlow>
    </div>
  );
};

export default Timeline;
