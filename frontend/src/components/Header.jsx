import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [query, setQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setQuery('');
      setIsMenuOpen(false); // Close menu on search
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <Link to="/" className="logo">DitTV</Link>
        <div className="header__right">
          <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/movies" onClick={closeMenu}>Movies</Link>
            <Link to="/tv" onClick={closeMenu}>TV Shows</Link>
          </nav>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">Go</button>
          </form>
          <div className={`menu-icon ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
      {isMenuOpen && <div className="backdrop" onClick={closeMenu}></div>}
    </>
  );
};

export default Header;
