// src/types/index.ts
import { Node, Edge } from 'reactflow';

// Hierarchy levels from the PDF
export type HierarchyLevel = 'weltgeist' | 'zeitgeist' | 'geist' | 'biology' | 'dna';

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: Date | string;
  category: string; // Primary category
  secondaryCategories?: string[]; // Related categories
  level: HierarchyLevel; // Hierarchy level
  tags: string[];
  impact?: number; // Measure of event's historical impact (1-100)
  connections?: string[]; // IDs of connected events
  customData?: Record<string, any>;
}

export interface TimelineCategory {
  id: string;
  name: string;
  color: string;
  description: string;
  level: HierarchyLevel;
  position: number; // Position within its level for layout
  parent?: string; // Parent category ID
  children?: string[]; // Child category IDs
}

export interface TimelineNode extends Node {
  data: {
    event: TimelineEvent;
  };
}

export type RelationshipType = 'causal' | 'correlative' | 'influential' | 'reference';
export type RelationshipPolarity = 'positive' | 'negative' | 'neutral';

export interface TimelineEdgeData {
  relationship: RelationshipType;
  strength: number; // 0-100
  polarity: RelationshipPolarity; // Whether the relationship strengthens or weakens
  description?: string;
}

export type TimelineEdge = Edge<TimelineEdgeData>;

export interface TimelineState {
  nodes: TimelineNode[];
  edges: TimelineEdge[];
  categories: TimelineCategory[];
  visibleLevels: HierarchyLevel[];
  visibleCategories: string[];
}