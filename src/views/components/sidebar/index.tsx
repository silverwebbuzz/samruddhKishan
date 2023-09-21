import React from 'react'
import { Box, Typography, Select, MenuItem } from '@mui/material'

const Sidebar = ({ selectedCategory, setSelectedCategory }: any) => {
  const categories = ['All', 'Category 1', 'Category 2', 'Category 3'] // Replace with your actual categories

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value)
  }

  return (
    <div className='sidebar'>
      <h2>Filter by Category</h2>
      <div className='category-dropdown'>
        <label htmlFor='category'>Select Category:</label>
        <div className='custom-select'>
          <select id='category' value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <span className='select-arrow'>&#9660;</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
