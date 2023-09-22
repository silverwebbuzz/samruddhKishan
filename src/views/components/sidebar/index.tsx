import React, { useState } from 'react'
import { Box, Typography, Select, MenuItem } from '@mui/material'
import DemoSelect from 'src/views/demo/demoSelect'

const Sidebar = ({ DATA, selectedCategory, setSelectedCategory }: any) => {
  const categories = ['All', 'Category 1', 'Category 2', 'Category 3'] // Replace with your actual categories

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value)
  }
  const [expandedCategories, setExpandedCategories] = useState<number[]>([])
  const [isActive, setActive] = useState(false)
  const [isCurrentlyActive, setIsCurrentlyActive] = useState([])

  const renderCategories = (categories: Category[], level: number = 0) => {
    const options: React.ReactNode[] = []
    if (level === 0) {
      options
        .push
        // <MenuItem key={0} value={0} style={{ marginLeft: `${level * 20}px` }}>
        //   Main Category
        // </MenuItem>
        ()
    }
    categories?.forEach(category => {
      const isSelected = selectedCategory === category.id
      options.push(
        // <MenuItem key={category.id} value={category.id}>
        //   {/* <span
        //     onClick={event => toggleCategory(event, category.id)}
        //     style={{ marginLeft: `${level * 20}px`, cursor: 'pointer' }}
        //   >
        //     {expandedCategories.includes(category.id) ? '▼' : '►'}
        //   </span>
        //   {category.categoryName} */}
        // </MenuItem>
        <span
          onClick={event => {
            // if (isCurrentlyActive.includes(category.id)) {
            //   setActive(true)
            // } else {
            //   setActive(false)
            // }
          }}
          style={{ marginLeft: `${level * 20}px`, cursor: 'pointer' }}
        >
          <Typography variant='h6' color={isActive ? 'green' : 'black'}>
            {category.categoryName + '►'}
          </Typography>
        </span>
      )
      if (category.children && (expandedCategories.includes(category.id) || !isSelected)) {
        options.push(...renderCategories(category.children, level + 1))
      }
    })
    return options
  }
  return (
    <div className='sidebar'>
      <h2>Filter by Category</h2>
      {/* <div className='category-dropdown'>
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
      </div> */}
      <DemoSelect
        showOnHomePage={true}
        data={DATA}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {/* {renderCategories(DATA)} */}
    </div>
  )
}

export default Sidebar
