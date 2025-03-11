import { create } from 'zustand';
import { Node, Edge, addEdge, Connection } from 'reactflow';
import { TimelineState, TimelineEvent, TimelineCategory, TimelineNode, TimelineEdge } from '../types';

const initialCategories: TimelineCategory[] = [
  { id: 'politics', name: 'Politics', color: '#FF5733', description: 'Political events and movements' },
  { id: 'science', name: 'Science', color: '#33A1FF', description: 'Scientific discoveries and advancements' },
  { id: 'culture', name: 'Culture', color: '#9333FF', description: 'Cultural and artistic developments' },
  { id: 'technology', name: 'Technology', color: '#33FF57', description: 'Technological innovations' },
  { id: 'economics', name: 'Economics', color: '#FFDD33', description: 'Economic events and trends' },
];

// Initial sample events (can be replaced with actual data later)
const initialEvents: TimelineEvent[] = [
  {
    id: '1',
    title: 'Sample Event 1',
    description: 'This is a sample event',
    date: '2020-01-01',
    category: 'science',
    tags: ['sample', 'initial'],
  },
  // Add more sample events as needed
];

// Convert events to nodes
const eventsToNodes = (events: TimelineEvent[]): TimelineNode[] => {
  return events.map((event) => ({
    id: event.id,
    type: 'timelineEvent',
    position: { x: 0, y: 0 }, // Will be positioned by layout algorithm
    data: { event },
  }));
};

interface TimelineStore extends TimelineState {
  // Node and edge operations
  addNode: (node: TimelineNode) => void;
  updateNode: (nodeId: string, data: Partial<TimelineEvent>) => void;
  removeNode: (nodeId: string) => void;
  onNodesChange: (changes: any) => void;
  
  // Connection operations
  addEdge: (connection: Connection) => void;
  updateEdge: (edgeId: string, data: Partial<TimelineEdge['data']>) => void;
  removeEdge: (edgeId: string) => void;
  onEdgesChange: (changes: any) => void;
  
  // Category operations
  addCategory: (category: TimelineCategory) => void;
  updateCategory: (categoryId: string, data: Partial<TimelineCategory>) => void;
  removeCategory: (categoryId: string) => void;
  
  // Timeline operations
  filterByCategory: (categoryIds: string[]) => void;
  filterByDateRange: (startDate: Date, endDate: Date) => void;
  searchEvents: (query: string) => TimelineNode[];
  
  // Layout operations
  resetLayout: () => void;
}

const useTimelineStore = create<TimelineStore>((set, get) => ({
  nodes: eventsToNodes(initialEvents),
  edges: [],
  categories: initialCategories,
  
  // Node operations
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  updateNode: (nodeId, eventData) => 
    set((state) => ({
      nodes: state.nodes.map((node) => 
        node.id === nodeId 
          ? { ...node, data: { ...node.data, event: { ...node.data.event, ...eventData } } } 
          : node
      ),
    })),
  removeNode: (nodeId) => 
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
    })),
  onNodesChange: (changes) => {
    // Implementation will depend on the specific reactflow API
    // This is a placeholder
    console.log('Nodes changed:', changes);
  },
  
  // Edge operations
  addEdge: (connection) => 
    set((state) => ({
      edges: addEdge(
        { 
          ...connection, 
          data: { relationship: 'correlative', strength: 50 } 
        } as TimelineEdge, 
        state.edges as Edge[]
      ) as TimelineEdge[],
    })),
  updateEdge: (edgeId, data) => 
    set((state) => ({
      edges: state.edges.map((edge) => 
        edge.id === edgeId 
          ? { ...edge, data: { ...edge.data, ...data } } 
          : edge
      ),
    })),
  removeEdge: (edgeId) => 
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== edgeId),
    })),
  onEdgesChange: (changes) => {
    // Implementation will depend on the specific reactflow API
    // This is a placeholder
    console.log('Edges changed:', changes);
  },
  
  // Category operations
  addCategory: (category) => 
    set((state) => ({ categories: [...state.categories, category] })),
  updateCategory: (categoryId, data) => 
    set((state) => ({
      categories: state.categories.map((category) => 
        category.id === categoryId 
          ? { ...category, ...data } 
          : category
      ),
    })),
  removeCategory: (categoryId) => 
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== categoryId),
      // Optionally remove or reassign nodes in this category
    })),
  
  // Timeline operations
  filterByCategory: (categoryIds) => {
    // This is a simple implementation - in a real app you might want to
    // keep the original nodes and just filter what's displayed
    const { nodes } = get();
    const filteredNodes = nodes.filter((node) => 
      categoryIds.includes(node.data.event.category)
    );
    console.log('Filtered nodes by categories:', categoryIds, filteredNodes);
  },
  filterByDateRange: (startDate, endDate) => {
    const { nodes } = get();
    const filteredNodes = nodes.filter((node) => {
      const eventDate = new Date(node.data.event.date);
      return eventDate >= startDate && eventDate <= endDate;
    });
    console.log('Filtered nodes by date range:', startDate, endDate, filteredNodes);
  },
  searchEvents: (query) => {
    const { nodes } = get();
    const lowercaseQuery = query.toLowerCase();
    return nodes.filter((node) => 
      node.data.event.title.toLowerCase().includes(lowercaseQuery) || 
      node.data.event.description.toLowerCase().includes(lowercaseQuery) ||
      node.data.event.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    );
  },
  
  // Layout operations
  resetLayout: () => {
    // Implementation depends on your layout strategy
    console.log('Resetting layout');
  },
}));

export default useTimelineStore;
