import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import ItemList from './components/itemList'
import ItemForm from './components/ItemForm'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">

        <main className="main-content">
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/items/new" element={<ItemForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
