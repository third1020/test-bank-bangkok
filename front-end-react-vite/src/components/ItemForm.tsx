import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createItem } from '../../rest-api/items'

interface CreateItemRequest {
  name: string
  description: string
}

const ItemForm = () => {
  const [formData, setFormData] = useState<CreateItemRequest>({
    name: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.description.trim()) {
      return
    }

    try {
      setLoading(true)
      
      const result = await createItem(formData)
      
      if (result) {
        setFormData({ name: '', description: '' })
        navigate('/')
      }
    } catch (err) {
        console.error('Failed to create item:', err)

    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter item name"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter item description"
            required
            className="form-textarea"
          />
        </div>

        <div className="button-container">
          <button 
            type="submit" 
            disabled={loading}
            className="submit-button"
          >
            {loading ? 'Creating...' : 'Create Item'}
          </button>
          <Link to="/" className="cancel-link">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

export default ItemForm
