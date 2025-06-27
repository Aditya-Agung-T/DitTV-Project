import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import SearchResult from './components/SearchResult';
import MoviesPage from './components/MoviesPage';
import TVShowsPage from './components/TVShowsPage';
import TVShowDetail from './components/TVShowDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/tv" element={<TVShowsPage />} />
          <Route path="/tv/:id" element={<TVShowDetail />} />
          <Route path="/search" element={<SearchResult />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
