import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getItems, type Item } from '../rest-api/items'

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [liked, setLiked] = useState(false)
  const navigate = useNavigate()
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return

    const fetchItems = async () => {
      try {
        setLoading(true)
        const result = await getItems()
        
        if (Array.isArray(result)) {
          setItems(result)
          setError(null)
        } else if (result.success && result.data) {
          setItems(result.data)
          setError(null)
        } else {
          setError(result.message || 'Failed to fetch items')
        }
      } catch (err) {
        console.error('Fetch error:', err)
        setError('Failed to fetch items')
      } finally {
        setLoading(false)
      }
    }

    hasFetched.current = true
    fetchItems()
  }, [])

  const handleAddNewItem = () => {
    navigate('/items/new')
  }

  if (loading) {
    return <div className="loading">Loading items...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return (
    <div>
      <div className="total-items">Total items: {items.length}</div>
      <table className="data-table">
        <thead>
          <tr>
            <th className="table-header">ID</th>
            <th className="table-header">Name</th>
            <th className="table-header">Description</th>
            <th className="table-header">Created At</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td className="table-cell" colSpan={4}>
                No items found. Add some items to get started!
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td className="table-cell">{item.id}</td>
                <td className="table-cell">{item.name}</td>
                <td className="table-cell">{item.description}</td>
                <td className="table-cell">{new Date(item.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="button-container">
        <button onClick={handleAddNewItem} className="add-button">
          Add New Item
        </button>
      </div>
    </div>
  )
}

export default ItemList
