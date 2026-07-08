import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import WordToPdf from './pages/WordToPdf';
import PdfToWord from './pages/PdfToWord';
import MergePdf from './pages/MergePdf';
import MergeWord from './pages/MergeWord';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Privacy, Terms } from './pages/LegalPages';

function AuthHeader() {
  const { user, logout } = useAuth();

  return (
    <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 20, display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      {user ? (
        <>
          <span style={{ fontWeight: 700, color: 'var(--color-text)' }}>
            Hello, {user.fullName || user.username || user.email}
          </span>
          <button onClick={logout} style={{ padding: '10px 18px', borderRadius: '999px', border: 'none', background: '#6366f1', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '10px 18px', borderRadius: '999px', border: 'none', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
              Login
            </button>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '10px 18px', borderRadius: '999px', border: '1px solid rgba(99,102,241,0.4)', background: 'transparent', color: 'var(--color-text)', fontWeight: 700, cursor: 'pointer' }}>
              Sign Up
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen gradient-bg flex">
            <Navbar />
            <div className="flex-1 flex flex-col relative">
              <AuthHeader />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/word-to-pdf" element={<WordToPdf />} />
                  <Route path="/pdf-to-word" element={<PdfToWord />} />
                  <Route path="/merge-pdf" element={<MergePdf />} />
                  <Route path="/merge-word" element={<MergeWord />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
