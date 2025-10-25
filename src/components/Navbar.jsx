import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleNavSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">NovelVerse</Link>

        {/* Hamburger button */}
        <button
  className={`menu-button ${menuOpen ? 'active' : ''}`}
  onClick={() => setMenuOpen(!menuOpen)}
>
  <span className="bar"></span>
  <span className="bar"></span>
  <span className="bar"></span>
</button>


        {/* Navigation links */}
        <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/all-books" className="nav-link" onClick={() => setMenuOpen(false)}>All Books</Link>
          <Link to="/add-book" className="nav-link" onClick={() => setMenuOpen(false)}>Add Book</Link>
          <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact Us</Link>
        </nav>

        {/* Search bar */}
        <div className="nav-search">
          <form onSubmit={handleNavSearch} className="nav-search-form">
            <input 
              type="text" 
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>
        </div>
      </div>
    </header>
  )
}

export default Navbar
