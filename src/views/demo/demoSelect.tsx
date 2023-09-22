import React, { useState, useEffect } from 'react'
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material'

interface Category {
  id: number
  categoryName: string
  children?: Category[]
}

interface Props {
  data: Category[]
  selectedCategory: number | null
  setSelectedCategory: (category: number | null) => void
  size?: string | any
  shrink?: boolean
}

const DemoSelect: React.FC<Props> = ({ showOnHomePage, data, shrink, size, selectedCategory, setSelectedCategory }) => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([])

  const toggleCategory = (event: React.MouseEvent, categoryId: number) => {
    event.stopPropagation()

    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId))
    } else {
      setExpandedCategories([...expandedCategories, categoryId])
    }
  }

  const findCategoryById = (categories: Category[], id: number): Category | undefined => {
    for (const category of categories) {
      if (category.id === id) {
        return category
      }
      if (category.children) {
        const childCategory = findCategoryById(category.children, id)
        if (childCategory) {
          return childCategory
        }
      }
    }
    return undefined
  }

  const expandCategoryAndParents = (category: Category) => {
    setExpandedCategories(prevExpanded => [...prevExpanded, category.id])
    if (category.children && category.children.length > 0) {
      expandCategoryAndParents(category.children[0])
    }
  }

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const categoryId = event.target.value as number
    setSelectedCategory(categoryId)
  }

  const renderCategories = (categories: Category[], level: number = 0) => {
    const options: React.ReactNode[] = []
    if (level === 0) {
      options.push(
        <MenuItem key={0} value={0} style={{ marginLeft: `${level * 20}px` }}>
          Main Category
        </MenuItem>
      )
    }
    categories?.forEach(category => {
      const isSelected = selectedCategory === category.id
      options.push(
        <MenuItem key={category.id} value={category.id}>
          <span
            onClick={event => toggleCategory(event, category.id)}
            style={{ marginLeft: `${level * 20}px`, cursor: 'pointer' }}
          >
            {expandedCategories.includes(category.id) ? '▼' : '►'}
          </span>
          {category.categoryName}
        </MenuItem>
      )
      if (category.children && (expandedCategories.includes(category.id) || !isSelected)) {
        options.push(...renderCategories(category.children, level + 1))
      }
    })
    return options
  }

  return (
    <div>
      {showOnHomePage ? (
        <FormControl size={size ? size : 'medium'} fullWidth>
          <InputLabel
            sx={{
              color: '#000 !important' // Change label color to #1f4e3d
            }}
            shrink={true}
          >
            Categories
          </InputLabel>
          <Select
            notched
            value={selectedCategory}
            onChange={handleCategoryChange}
            label='Categories'
            sx={{
              '& .MuiSelect-root': {
                borderWidth: '1px !important'
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1f4e3d !important'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1px !important',
                borderColor: '#1f4e3d !important'
              },
              '&.Mui-error': {
                color: 'red' // Set the label color when the Select is in an error state
              }
            }}
          >
            {renderCategories(data)}
          </Select>
        </FormControl>
      ) : (
        <FormControl size={size ? size : 'medium'} fullWidth>
          <InputLabel shrink={true}>Categories</InputLabel>

          <Select notched value={selectedCategory} onChange={handleCategoryChange} label='Categories'>
            {renderCategories(data)}
          </Select>
        </FormControl>
      )}
    </div>
  )
}

export default DemoSelect
