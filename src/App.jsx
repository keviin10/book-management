import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './views/Home'
import AllBooks from './views/AllBooks'
import AddBook from './views/AddBook'
import AboutUs from './views/AboutUs'
import ContactUs from './views/ContactUs'
import BookDetail from './views/BookDetail'
import SearchResults from './views/SearchResults'
import EditBook from "./views/EditBook.jsx";
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-books" element={<AllBooks />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/edit-book/:id" element={<EditBook />} /> 
            <Route path="/books" element={<SearchResults />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App