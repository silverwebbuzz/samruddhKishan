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
}

const DemoSelect: React.FC<Props> = ({ data, size, selectedCategory, setSelectedCategory }: any) => {
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
      <FormControl size={size ? size : 'medium'} fullWidth>
        <InputLabel shrink={true}>Categories</InputLabel>
        <Select notched value={selectedCategory} onChange={handleCategoryChange} label='Categories'>
          {renderCategories(data)}
        </Select>
      </FormControl>
    </div>
  )
}

export default DemoSelect
