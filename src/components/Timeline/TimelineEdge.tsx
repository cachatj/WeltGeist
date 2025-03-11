// src/components/Timeline/TimelineEdge.tsx
import React from 'react';
import { EdgeProps, getBezierPath, EdgeLabelRenderer } from 'reactflow';
import { TimelineEdgeData, RelationshipType, RelationshipPolarity } from '../../types';

interface TimelineEdgeProps extends EdgeProps {
  data?: TimelineEdgeData;
}

const TimelineEdge: React.FC<TimelineEdgeProps> = ({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}) => {
  const relationship = data?.relationship || 'correlative';
  const strength = data?.strength || 50;
  const polarity = data?.polarity || 'neutral';
  
  // Get color based on relationship type
  const getEdgeColor = (type: RelationshipType): string => {
    switch(type) {
      case 'causal':
        return '#EF4444'; // Red
      case 'correlative':
        return '#3B82F6'; // Blue
      case 'influential':
        return '#10B981'; // Green
      case 'reference':
        return '#6B7280'; // Gray
      default:
        return '#6B7280';
    }
  };
  
  // Get stroke dash array based on relationship type
  const getEdgeDash = (type: RelationshipType): string => {
    return type === 'reference' ? '5,5' : 'none';
  };
  
  // Get edge width based on strength
  const getEdgeWidth = (strength: number): number => {
    return 1 + (strength / 25);
  };
  
  // Get edge style based on polarity
  const getEdgeStyle = (polarity: RelationshipPolarity) => {
    switch(polarity) {
      case 'positive':
        return {
          filter: 'none',
          opacity: 1
        };
      case 'negative':
        return {
          filter: 'none',
          opacity: 0.7,
          // Add a second line to indicate negativity
          backgroundImage: `linear-gradient(to right, ${getEdgeColor(relationship)} 50%, transparent 50%)`,
          backgroundSize: '10px 1px',
          backgroundRepeat: 'repeat-x'
        };
      case 'neutral':
      default:
        return {
          filter: 'none',
          opacity: 0.8
        };
    }
  };
  
  // Calculate path
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  
  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        strokeWidth={getEdgeWidth(strength)}
        stroke={getEdgeColor(relationship)}
        strokeDasharray={getEdgeDash(relationship)}
        style={getEdgeStyle(polarity)}
        markerEnd={markerEnd}
      />
      
      {/* Edge label for relationship description */}
      {data?.description && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              background: '#ffffff',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '10px',
              fontWeight: 500,
              pointerEvents: 'all',
              border: '1px solid #e2e8f0',
            }}
            className="nodrag nopan"
          >
            {data.description}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default TimelineEdge;