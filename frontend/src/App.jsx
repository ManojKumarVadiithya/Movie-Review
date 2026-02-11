import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AddMovie from './pages/AddMovie';
import SearchResults from './pages/SearchResults';
import ProtectedRoute from './components/ProtectedRoute';
import { useScrollToTop } from './hooks/useScrollToTop';
import './App.css';

function AppContent() {
  const location = useLocation();
  useScrollToTop();
  
  // Hide footer on login and register pages
  const hideFooter = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:imdbId" element={<MovieDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
