import React from 'react';
import { motion } from 'framer-motion';

interface CategorySelectorProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, onSelectCategory }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Select a Category</h2>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <motion.button
            key={category}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            onClick={() => onSelectCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;