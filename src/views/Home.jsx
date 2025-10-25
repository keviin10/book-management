import React from 'react'
import HeroSection from '../components/HeroSection.jsx'
import FeaturedBooks from '../components/FeaturedBooks.jsx'
import BrowseByGenre from '../components/BrowseByGenre.jsx'
import './Home.css'

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <FeaturedBooks />
      <BrowseByGenre />
    </div>
  )
}

export default Home