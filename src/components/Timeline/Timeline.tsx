import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

import useTimelineStore from '../../store/useTimelineStore';
import TimelineEventNode from './TimelineEventNode';

// Define custom node types
const nodeTypes: NodeTypes = {
  timelineEvent: TimelineEventNode,
};

const Timeline: React.FC = () => {
  const {
    nodes: storeNodes,
    edges: storeEdges,
    addEdge: storeAddEdge,
    onNodesChange,
    onEdgesChange,
  } = useTimelineStore();

  const [nodes, setNodes, onNodesChangeInternal] = useNodesState(storeNodes);
  const [edges, setEdges, onEdgesChangeInternal] = useEdgesState(storeEdges);

  // Sync ReactFlow's internal state with our store
  React.useEffect(() => {
    setNodes(storeNodes);
    setEdges(storeEdges);
  }, [storeNodes, storeEdges, setNodes, setEdges]);

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

  return (
    <div className="h-screen w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default Timeline;
