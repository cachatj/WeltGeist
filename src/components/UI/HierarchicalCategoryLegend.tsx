// src/components/UI/HierarchicalCategoryLegend.tsx
import React, { useState } from 'react';
import { TimelineCategory, HierarchyLevel } from '../../types';
import useTimelineStore from '../../store/useTimelineStore';

interface HierarchicalCategoryLegendProps {
  categories: TimelineCategory[];
}

const HierarchicalCategoryLegend: React.FC<HierarchicalCategoryLegendProps> = ({ categories }) => {
  const { visibleCategories, visibleLevels, filterByCategory, filterByLevel } = useTimelineStore();
  
  // Group categories by level
  const categoriesByLevel: Record<HierarchyLevel, TimelineCategory[]> = {
    weltgeist: categories.filter(c => c.level === 'weltgeist'),
    zeitgeist: categories.filter(c => c.level === 'zeitgeist'),
    geist: categories.filter(c => c.level === 'geist'),
    biology: categories.filter(c => c.level === 'biology'),
    dna: categories.filter(c => c.level === 'dna'),
  };
  
  // State for expanded/collapsed sections
  const [expandedLevels, setExpandedLevels] = useState<HierarchyLevel[]>([
    'weltgeist', 'zeitgeist', 'geist', 'biology', 'dna'
  ]);
  
  // Toggle level expansion
  const toggleLevel = (level: HierarchyLevel) => {
    setExpandedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };
  
  // Toggle category visibility
  const toggleCategory = (categoryId: string) => {
    const newVisibleCategories = visibleCategories.includes(categoryId)
      ? visibleCategories.filter(id => id !== categoryId)
      : [...visibleCategories, categoryId];
    
    filterByCategory(newVisibleCategories);
  };
  
  // Toggle level visibility
  const toggleLevelVisibility = (level: HierarchyLevel) => {
    const newVisibleLevels = visibleLevels.includes(level)
      ? visibleLevels.filter(l => l !== level)
      : [...visibleLevels, level];
    
    filterByLevel(newVisibleLevels);
  };
  
  // Select/deselect all categories within a level
  const toggleAllInLevel = (level: HierarchyLevel, select: boolean) => {
    const levelCategoryIds = categoriesByLevel[level].map(c => c.id);
    
    const newVisibleCategories = select
      ? [...new Set([...visibleCategories, ...levelCategoryIds])]
      : visibleCategories.filter(id => !levelCategoryIds.includes(id));
    
    filterByCategory(newVisibleCategories);
  };
  
  // Select all categories
  const selectAllCategories = () => {
    filterByCategory(categories.map(c => c.id));
  };
  
  // Deselect all categories
  const deselectAllCategories = () => {
    filterByCategory([]);
  };
  
  // Get child categories of a parent category
  const getChildCategories = (parentId: string): TimelineCategory[] => {
    const parent = categories.find(c => c.id === parentId);
    if (!parent || !parent.children) return [];
    
    return categories.filter(c => parent.children?.includes(c.id));
  };
  
  // Render categories for a specific level, with proper hierarchy
  const renderLevelCategories = (level: HierarchyLevel) => {
    // Get root categories at this level (those without parents or with parents outside this level)
    const rootCategories = categoriesByLevel[level].filter(
      c => !c.parent || !categoriesByLevel[level].some(pc => pc.id === c.parent)
    );
    
    return rootCategories.map(category => (
      <div key={category.id} className="ml-2">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={`category-${category.id}`}
            checked={visibleCategories.includes(category.id)}
            onChange={() => toggleCategory(category.id)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div 
            className="w-4 h-4 rounded" 
            style={{ backgroundColor: category.color }}
          />
          <label htmlFor={`category-${category.id}`} className="text-sm font-medium">
            {category.name}
          </label>
          <span className="text-xs text-gray-500">{category.description}</span>
        </div>
        
        {/* Render child categories if any */}
        {category.children && category.children.length > 0 && (
          <div className="ml-6 mt-1 border-l-2 border-gray-200 pl-2">
            {getChildCategories(category.id).map(childCategory => (
              <div key={childCategory.id} className="flex items-center space-x-2 mt-1">
                <input
                  type="checkbox"
                  id={`category-${childCategory.id}`}
                  checked={visibleCategories.includes(childCategory.id)}
                  onChange={() => toggleCategory(childCategory.id)}
                  className="h-3 w-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div 
                  className="w-3 h-3 rounded" 
                  style={{ backgroundColor: childCategory.color }}
                />
                <label htmlFor={`category-${childCategory.id}`} className="text-xs">
                  {childCategory.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    ));
  };
  
  // Map level to display name
  const levelDisplayNames: Record<HierarchyLevel, string> = {
    weltgeist: 'Weltgeist (Storehouse of Human Experience)',
    zeitgeist: 'Zeitgeist (Ontogenic Enculturation)',
    geist: 'Geist (Logic)',
    biology: 'Biology (Regulation of Physiology)',
    dna: 'DNA (Genetic Foundation)'
  };
  
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Hierarchical Categories</h3>
        <div className="space-x-2">
          <button 
            onClick={selectAllCategories}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            All
          </button>
          <span className="text-gray-300">|</span>
          <button 
            onClick={deselectAllCategories}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            None
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {/* Render each level with its categories in hierarchical order */}
        {(Object.keys(categoriesByLevel) as HierarchyLevel[]).map(level => (
          <div key={level} className="border border-gray-200 rounded-md p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => toggleLevel(level)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {expandedLevels.includes(level) ? '▼' : '►'}
                </button>
                <input
                  type="checkbox"
                  id={`level-${level}`}
                  checked={visibleLevels.includes(level)}
                  onChange={() => toggleLevelVisibility(level)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`level-${level}`} className="font-medium">
                  {levelDisplayNames[level]}
                </label>
              </div>
              
              <div className="space-x-2">
                <button 
                  onClick={() => toggleAllInLevel(level, true)}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  All
                </button>
                <span className="text-gray-300">|</span>
                <button 
                  onClick={() => toggleAllInLevel(level, false)}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  None
                </button>
              </div>
            </div>
            
            {/* Show categories if level is expanded */}
            {expandedLevels.includes(level) && (
              <div className="mt-2 ml-4 space-y-2">
                {renderLevelCategories(level)}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium mb-2">Relationship Types</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-1 bg-red-500" />
            <span className="text-xs">Causal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-1 bg-blue-500" />
            <span className="text-xs">Correlative</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-1 bg-green-500" />
            <span className="text-xs">Influential</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-1 bg-gray-500 border-dashed" />
            <span className="text-xs">Reference</span>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium mb-2">Relationship Polarity</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-1 bg-green-600" />
            <span className="text-xs">Positive (Strengthening)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-1 bg-red-600" />
            <span className="text-xs">Negative (Weakening)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-1 bg-gray-600" />
            <span className="text-xs">Neutral</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HierarchicalCategoryLegend;