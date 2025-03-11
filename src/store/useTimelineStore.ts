// src/store/useTimelineStore.ts
import { create } from 'zustand';
import { addEdge, Connection } from 'reactflow';
import {
  TimelineState,
  TimelineEvent,
  TimelineCategory,
  TimelineNode,
  TimelineEdge,
  HierarchyLevel,
  RelationshipType,
  RelationshipPolarity
} from '../types';

// Define hierarchical categories based on the PDF
const hierarchicalCategories: TimelineCategory[] = [
  // Top Level - Weltgeist
  {
    id: 'weltgeist',
    name: 'Weltgeist',
    color: '#6B7280', // Gray
    description: 'Storehouse of human experience',
    level: 'weltgeist',
    position: 0,
    children: ['politics', 'economics', 'language']
  },
  
  // Politics
  {
    id: 'politics',
    name: 'Politics',
    color: '#EF4444', // Red
    description: 'Rules of authority that regulate and elicit social organization',
    level: 'weltgeist',
    position: 1,
    parent: 'weltgeist',
  },
  
  // Economics
  {
    id: 'economics',
    name: 'Economics',
    color: '#F59E0B', // Amber
    description: 'Rules of exchange that regulate and elicit social interaction',
    level: 'weltgeist',
    position: 2,
    parent: 'weltgeist',
  },
  
  // Language
  {
    id: 'language',
    name: 'Language',
    color: '#10B981', // Emerald
    description: 'Vocal and symbolic transmission of experience',
    level: 'weltgeist',
    position: 3,
    parent: 'weltgeist',
  },
  
  // Middle Level - Zeitgeist
  {
    id: 'zeitgeist',
    name: 'Zeitgeist',
    color: '#6B7280', // Gray
    description: 'Ontogenic enculturation',
    level: 'zeitgeist',
    position: 0,
    parent: 'weltgeist',
    children: ['technology', 'religion', 'science']
  },
  
  // Technology
  {
    id: 'technology',
    name: 'Technology',
    color: '#3B82F6', // Blue
    description: 'Production',
    level: 'zeitgeist',
    position: 1,
    parent: 'zeitgeist',
  },
  
  // Religion
  {
    id: 'religion',
    name: 'Religion',
    color: '#8B5CF6', // Violet
    description: 'Faith',
    level: 'zeitgeist',
    position: 2,
    parent: 'zeitgeist',
  },
  
  // Science
  {
    id: 'science',
    name: 'Science',
    color: '#EC4899', // Pink
    description: 'Knowledge',
    level: 'zeitgeist',
    position: 3,
    parent: 'zeitgeist',
  },
  
  // Bottom Level - Geist
  {
    id: 'geist',
    name: 'Geist',
    color: '#6B7280', // Gray
    description: 'Logic',
    level: 'geist',
    position: 0,
    parent: 'zeitgeist',
  },
  
  // Biology
  {
    id: 'biology',
    name: 'Biology',
    color: '#065F46', // Green
    description: 'Regulation of physiology',
    level: 'biology',
    position: 0,
    parent: 'geist',
  },
  
  // DNA
  {
    id: 'dna',
    name: 'DNA',
    color: '#1F2937', // Dark Gray
    description: 'Genetic foundation',
    level: 'dna',
    position: 0,
    parent: 'biology'
  }
];

// Initial sample events
const sampleEvents: TimelineEvent[] = [
  // Weltgeist level - Politics
  {
    id: 'event-politics-1',
    title: 'French Revolution',
    description: 'A period of radical social and political upheaval in France that transformed society and government.',
    date: '1789-07-14',
    category: 'politics',
    level: 'weltgeist',
    tags: ['revolution', 'democracy', 'france'],
    impact: 90
  },
  {
    id: 'event-politics-2',
    title: 'US Constitution Ratified',
    description: 'The United States Constitution is ratified, establishing the federal government and fundamental laws.',
    date: '1788-06-21',
    category: 'politics',
    level: 'weltgeist',
    tags: ['constitution', 'democracy', 'usa'],
    impact: 85
  },
  
  // Weltgeist level - Economics
  {
    id: 'event-economics-1',
    title: 'Industrial Revolution',
    description: 'The transition to new manufacturing processes in Europe and the United States.',
    date: '1760-01-01',
    category: 'economics',
    level: 'weltgeist',
    tags: ['industry', 'manufacturing', 'capitalism'],
    impact: 95
  },
  {
    id: 'event-economics-2',
    title: 'Great Depression',
    description: 'A severe worldwide economic depression that began in the US.',
    date: '1929-10-29',
    category: 'economics',
    level: 'weltgeist',
    tags: ['depression', 'crash', 'economy'],
    impact: 85
  },
  
  // Weltgeist level - Language
  {
    id: 'event-language-1',
    title: 'Gutenberg Printing Press',
    description: 'The introduction of the movable-type printing press in Europe.',
    date: '1440-01-01',
    category: 'language',
    level: 'weltgeist',
    tags: ['printing', 'communication', 'literature'],
    impact: 90
  },
  {
    id: 'event-language-2',
    title: 'Internet Becomes Public',
    description: 'The World Wide Web is made available to the public, revolutionizing communication.',
    date: '1991-08-06',
    category: 'language',
    level: 'weltgeist',
    tags: ['internet', 'communication', 'technology'],
    impact: 95
  },
  
  // Zeitgeist level - Technology
  {
    id: 'event-technology-1',
    title: 'Steam Engine Invention',
    description: 'James Watt improves the Newcomen steam engine, revolutionizing industry.',
    date: '1776-01-01',
    category: 'technology',
    level: 'zeitgeist',
    tags: ['steam', 'engine', 'industry'],
    impact: 85
  },
  {
    id: 'event-technology-2',
    title: 'First Programmable Computer',
    description: 'The Z3, the first working programmable, fully automatic computer, is created by Konrad Zuse.',
    date: '1941-05-12',
    category: 'technology',
    level: 'zeitgeist',
    tags: ['computer', 'programming', 'digital'],
    impact: 90
  },
  
  // Zeitgeist level - Religion
  {
    id: 'event-religion-1',
    title: 'Protestant Reformation',
    description: 'A religious reform movement that divided Western Christianity.',
    date: '1517-10-31',
    category: 'religion',
    level: 'zeitgeist',
    tags: ['christianity', 'protestant', 'reformation'],
    impact: 85
  },
  {
    id: 'event-religion-2',
    title: 'Secularization Movement',
    description: 'The transition from religious to secular society in many Western nations.',
    date: '1850-01-01',
    category: 'religion',
    level: 'zeitgeist',
    tags: ['secular', 'religion', 'society'],
    impact: 75
  },
  
  // Zeitgeist level - Science
  {
    id: 'event-science-1',
    title: 'Newton\'s Principia Published',
    description: 'Isaac Newton publishes his laws of motion and universal gravitation.',
    date: '1687-07-05',
    category: 'science',
    level: 'zeitgeist',
    tags: ['physics', 'gravity', 'mechanics'],
    impact: 90
  },
  {
    id: 'event-science-2',
    title: 'Darwin\'s Origin of Species',
    description: 'Charles Darwin publishes his theory of evolution by natural selection.',
    date: '1859-11-24',
    category: 'science',
    level: 'zeitgeist',
    tags: ['evolution', 'biology', 'natural selection'],
    impact: 95
  },
  
  // Geist level
  {
    id: 'event-geist-1',
    title: 'Descartes\' Cogito Ergo Sum',
    description: 'René Descartes formulates his philosophical proposition "I think, therefore I am".',
    date: '1637-01-01',
    category: 'geist',
    level: 'geist',
    tags: ['philosophy', 'consciousness', 'existence'],
    impact: 80
  },
  
  // Biology level
  {
    id: 'event-biology-1',
    title: 'Discovery of DNA Structure',
    description: 'Watson and Crick discover the double helix structure of DNA.',
    date: '1953-04-25',
    category: 'biology',
    level: 'biology',
    tags: ['dna', 'genetics', 'molecular biology'],
    impact: 95
  },
  
  // DNA level
  {
    id: 'event-dna-1',
    title: 'Human Genome Project Completed',
    description: 'Scientists complete the mapping of the human genome.',
    date: '2003-04-14',
    category: 'dna',
    level: 'dna',
    tags: ['genome', 'genetics', 'mapping'],
    impact: 90
  }
];

// Sample connections between events
const sampleEdges: TimelineEdge[] = [
  // Causal: French Revolution influenced political systems
  {
    id: 'edge-1',
    source: 'event-politics-1', // French Revolution
    target: 'event-politics-2', // US Constitution
    data: {
      relationship: 'influential',
      strength: 70,
      polarity: 'positive',
      description: 'Revolutionary ideals influenced democratic movements'
    }
  },
  // Correlative: Industrial Revolution and printing technology
  {
    id: 'edge-2',
    source: 'event-economics-1', // Industrial Revolution
    target: 'event-technology-1', // Steam Engine
    data: {
      relationship: 'causal',
      strength: 90,
      polarity: 'positive',
      description: 'Steam power enabled industrial scale manufacturing'
    }
  },
  // Reference: Darwin's work references earlier scientific thought
  {
    id: 'edge-3',
    source: 'event-science-2', // Darwin's Origin of Species
    target: 'event-geist-1', // Descartes' Philosophy
    data: {
      relationship: 'reference',
      strength: 50,
      polarity: 'neutral',
      description: 'Evolution theory challenged philosophical views of human origins'
    }
  },
];

// Calculate node positions based on hierarchy level and category
const calculateNodePositions = (events: TimelineEvent[]): TimelineNode[] => {
  // Base positions for different levels
  const levelYPositions = {
    weltgeist: 100,
    zeitgeist: 300,
    geist: 500,
    biology: 700,
    dna: 900
  };
  
  // Category offsets within levels (to avoid overlapping)
  const categoryOffsets: Record<string, number> = {};
  hierarchicalCategories.forEach(cat => {
    if (cat.parent) {
      categoryOffsets[cat.id] = cat.position * 50;
    }
  });
};
  
  // Parse dates to organize events chronologically
  const timelineStart = new Date('1400-01-01').getTime();
  const timelineEnd = new Date('2025-01-01').getTime();
  const timelineRange = timelineEnd - timelineStart;
  
  // Convert events to nodes with calculated positions
  return events.map(event => {
    const eventDate = new Date(event.date).getTime();
    // Calculate x position based on date (scaled to fit in the canvas)
    const xPosition = 100 + ((eventDate - timelineStart) / timelineRange) * 3000;
    
    // Calculate y position based on level and category
    const yPosition = levelYPositions[event.level] + (categoryOffsets[event.category] || 0);
    
    return {
      id: event.id,
      type: 'timelineEvent',
      position: { x: xPosition, y: yPosition },
      data: { event }
    };
  });