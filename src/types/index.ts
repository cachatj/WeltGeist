import { Node, Edge } from 'reactflow';

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: Date | string;
  category: string;
  tags: string[];
  connections?: string[]; // IDs of connected events
  customData?: Record<string, any>;
}

export interface TimelineCategory {
  id: string;
  name: string;
  color: string;
  description: string;
}

export interface TimelineNode extends Node {
  data: {
    event: TimelineEvent;
  };
}

export type TimelineEdge = Edge<{
  relationship: 'causal' | 'correlative' | 'influential' | 'reference';
  strength: number; // 0-100
  description?: string;
}>;

export interface TimelineState {
  nodes: TimelineNode[];
  edges: TimelineEdge[];
  categories: TimelineCategory[];
}
