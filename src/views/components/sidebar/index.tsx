import React, { useState } from 'react'
import { Box, Typography, Select, MenuItem, Divider, Button } from '@mui/material'
interface Category {
  id: number
  categoryName: string
  children?: Category[]
}

const Sidebar = ({ DATA, selectedCategory, setSelectedCategory }: any) => {
  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value)
  }

  const [expandedCategories, setExpandedCategories] = useState<number[]>([])

  const renderCategories = (categories: Category[], level: number = 0) => {
    const options: React.ReactNode[] = []

    categories?.forEach(category => {
      const isSelected = selectedCategory === category.id
      const isExpanded = expandedCategories.includes(category.id)
      const paddingLeft = `${level * 20}px` // Adjust the spacing level as needed

      const toggleIcon = isExpanded ? '▼' : '►'
      const categoryStyle = {
        paddingLeft: paddingLeft,
        cursor: 'pointer',
        color: isSelected ? 'White' : '#000',
        backgroundColor: isSelected ? '#4b7163' : 'transparent'
      }
      options.push(
        <div
          key={category.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 9
          }}
        >
          <span
            // className={isSelected ? 'hoveredCategory' : ''}
            onClick={() => {
              if (isExpanded) {
                setExpandedCategories(expandedCategories.filter(id => id !== category.id))
              } else {
                setExpandedCategories([...expandedCategories, category.id])
              }
            }}
          >
            <Typography
              // variant='h6'
              color={isSelected ? '#4b7163' : 'black'} // Apply green color if selected
              onClick={() => {
                setSelectedCategory(category.id)
              }}
              style={categoryStyle}
            >
              {toggleIcon} {category.categoryName}
            </Typography>
          </span>
          {isExpanded && category.children && renderCategories(category.children, level + 1)}
        </div>
      )
    })

    return options
  }

  return (
    <div className='sidebar sidebar-scrollable'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0px'
        }}
      >
        <Typography textAlign={'center'} fontSize={18}>
          Filter By Categories
        </Typography>
        <Button
          sx={{
            padding: 0,
            color: '#4b7163'
          }}
          onClick={() => {
            setSelectedCategory(0)
            setExpandedCategories([])
          }}
        >
          Clear
        </Button>
      </div>
      <Divider></Divider>
      <div
        style={{
          marginTop: '20px'
        }}
      >
        {renderCategories(DATA)}
      </div>
    </div>
  )
}

export default Sidebar
