import React, { useState } from 'react'

interface Category {
  id: number
  categoryName: string
  children?: Category[]
}

interface Props {
  data: Category[]
}

const CollapsibleTable: React.FC<Props> = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([])

  const toggleRow = (id: number) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter(rowId => rowId !== id))
    } else {
      setExpandedRows([...expandedRows, id])
    }
  }

  const renderRows = (categories: Category[]) => {
    return categories?.map(category => (
      <React.Fragment key={category.id}>
        <tr>
          <td>
            <button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                outline: 'none',
                transition: 'transform 0.2s ease-in-out'
              }}
              onClick={() => toggleRow(category.id)}
            >
              {expandedRows.includes(category.id) ? '▼' : '►'}
            </button>
          </td>
          <td>{category.categoryName}</td>
          <td style={{ display: 'flex', alignItems: 'center' }}>
            <button
              style={{
                padding: '5px 10px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                outline: 'none',
                borderRadius: '3px',
                transition: 'background-color 0.2s ease-in-out'
              }}
            >
              Edit
            </button>
            {/* Add your other action buttons here */}
          </td>
        </tr>
        {expandedRows.includes(category.id) && category.children && (
          <tr>
            <td colSpan={3}>
              <div
                style={{
                  display: 'block',
                  paddingLeft: '20px'
                }}
              >
                <table
                  style={{
                    borderCollapse: 'collapse',
                    width: '100%'
                  }}
                >
                  <tbody>{renderRows(category.children)}</tbody>
                </table>
              </div>
            </td>
          </tr>
        )}
      </React.Fragment>
    ))
  }

  return (
    <table
      style={{
        borderCollapse: 'collapse',
        width: '100%',
        margin: '20px 0'
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              backgroundColor: '#f2f2f2',
              textAlign: 'left',
              paddingLeft: '10px'
            }}
          >
            Toggle
          </th>
          <th>Category Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{renderRows(data)}</tbody>
    </table>
  )
}

export default CollapsibleTable
