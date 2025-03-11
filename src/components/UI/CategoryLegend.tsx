import React, { useState } from 'react';
import { TimelineCategory } from '../../types';

interface CategoryLegendProps {
  categories: TimelineCategory[];
}

const CategoryLegend: React.FC<CategoryLegendProps> = ({ categories }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categories.map(cat => cat.id)
  );

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedCategories(categories.map(cat => cat.id));
  };

  const handleSelectNone = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Categories</h3>
        <div className="space-x-2">
          <button 
            onClick={handleSelectAll}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            All
          </button>
          <span className="text-gray-300">|</span>
          <button 
            onClick={handleSelectNone}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            None
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`category-${category.id}`}
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryToggle(category.id)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div 
              className="w-4 h-4 rounded" 
              style={{ backgroundColor: category.color }}
            />
            <label htmlFor={`category-${category.id}`} className="text-sm">
              {category.name}
            </label>
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium mb-2">Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-0.5 bg-blue-500" />
            <span className="text-xs">Correlative</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-0.5 bg-red-500" />
            <span className="text-xs">Causal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-0.5 bg-green-500" />
            <span className="text-xs">Influential</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-0.5 bg-gray-500 border-dashed" />
            <span className="text-xs">Reference</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryLegend;
