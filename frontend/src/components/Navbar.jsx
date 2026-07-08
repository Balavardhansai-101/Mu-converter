import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Zap, Home as HomeIcon, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/mu-logo.svg';

const toolsMenu = [
  { label: 'Word to PDF', path: '/word-to-pdf', icon: '📄' },
  { label: 'PDF to Word', path: '/pdf-to-word', icon: '📝' },
  { label: 'Merge PDFs', path: '/merge-pdf', icon: '🔗' },
  { label: 'Merge Word Docs', path: '/merge-word', icon: '📚' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const currentUser = user;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setToolsOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'relative',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: theme === 'dark' ? 'rgba(10,10,18,0.95)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid var(--color-border)',
        minWidth: 260,
        maxWidth: 280,
        width: 'auto',
        minHeight: '100vh',
        padding: '1.5rem 1rem',
        flex: '0 0 auto',
      }}
    >
      <nav style={{ maxWidth: '280px', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img src={Logo} alt="MU Converter" style={{ width: 38, height: 38, borderRadius: 10, objectFit: 'contain' }} />
          <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', color: '#000000' }}>
            MU Converter
          </span>
        </Link>

        {/* Sidebar Nav */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '14px', position: 'relative' }}>
          {[{ label: 'Home', path: '/', icon: <HomeIcon size={16} /> }].map(item => (
            <NavLink key={item.path} to={item.path} style={({ isActive }) => ({
              padding: '8px 14px', borderRadius: '8px',
              textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500,
              color: isActive ? '#6366f1' : 'var(--color-muted)',
              transition: 'color 0.2s',
              display: 'flex', alignItems: 'center', gap: '8px',
            })}>
              {item.icon}
              {item.label}
            </NavLink>
          ))}

          {/* Tools Dropdown */}
          <div style={{ position: 'relative' }}
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--color-muted)', padding: '8px 14px', borderRadius: '8px',
              fontWeight: 500, fontSize: '0.9rem', transition: 'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}
            >
              <Zap size={15} />
              Tools
              <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: toolsOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
            </button>
            <AnimatePresence>
              {toolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute', top: '100%', left: 0,
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px', padding: '8px',
                    minWidth: '200px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  {toolsMenu.map(item => (
                    <NavLink key={item.path} to={item.path} style={({ isActive }) => ({
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '10px 14px', borderRadius: '8px',
                      textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
                      color: isActive ? '#6366f1' : 'var(--color-text)',
                      background: isActive ? 'rgba(99,102,241,0.1)' : 'transparent',
                      transition: 'all 0.15s',
                    })}
                      onMouseEnter={e => { if (!e.currentTarget.style.color.includes('6366f1')) { e.currentTarget.style.background = 'rgba(99,102,241,0.07)'; } }}
                      onMouseLeave={e => { if (!e.currentTarget.style.color.includes('6366f1')) { e.currentTarget.style.background = 'transparent'; } }}
                    >
                      <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                      {item.label}
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {[{ label: 'About', path: '/about' }].map(item => (
            <NavLink key={item.path} to={item.path} style={({ isActive }) => ({
              padding: '8px 14px', borderRadius: '8px',
              textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500,
              color: isActive ? '#6366f1' : 'var(--color-muted)',
              transition: 'color 0.2s',
            })}>
              {item.label}
            </NavLink>
          ))}

          <NavLink key="/contact" to="/contact" style={({ isActive }) => ({
            padding: '8px 14px', borderRadius: '8px',
            textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500,
            color: isActive ? '#6366f1' : 'var(--color-muted)',
            transition: 'color 0.2s',
          })}>
            Contact
          </NavLink>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} style={{
            width: 38, height: 38, borderRadius: '50%',
            border: '1px solid var(--color-border)',
            background: 'rgba(99,102,241,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s', color: 'var(--color-text)',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(99,102,241,0.08)'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <Link to="/word-to-pdf" style={{
            marginTop: '8px', padding: '9px 18px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            color: 'white', textDecoration: 'none', fontWeight: 600,
            fontSize: '0.875rem', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(99,102,241,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Get Started
          </Link>
          <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
            Created by BVS
          </p>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(o => !o)} style={{
          background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text)',
          display: 'none', padding: '6px',
        }} className="md:hidden block">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'var(--color-surface)',
              borderTop: '1px solid var(--color-border)',
              padding: '1rem 1.5rem',
            }}
          >
            {[...toolsMenu, { label: 'Home', path: '/', icon: '🏠' }, { label: 'About', path: '/about', icon: 'ℹ️' }, { label: 'Contact', path: '/contact', icon: '✉️' },
              ...(!currentUser ? [{ label: 'Login', path: '/login', icon: '🔐' }, { label: 'Sign Up', path: '/signup', icon: '📝' }] : [])
            ].map(item => (
              <NavLink key={item.path} to={item.path} style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 0', borderBottom: '1px solid var(--color-border)',
                textDecoration: 'none', fontWeight: 500,
                color: isActive ? '#6366f1' : 'var(--color-text)',
              })}>
                <span>{item.icon}</span>{item.label}
              </NavLink>
            ))}
            {user && (
              <div style={{ marginTop: '0.75rem', padding: '1rem', borderRadius: '16px', background: 'rgba(99,102,241,0.08)' }}>
                <p style={{ margin: 0, fontWeight: 700, color: 'var(--color-text)' }}>Hello, {user.fullName || user.username || user.email}</p>
                <button onClick={logout} style={{ marginTop: '0.75rem', width: '100%', padding: '10px 14px', borderRadius: '12px', border: 'none', background: '#6366f1', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                  Logout
                </button>
              </div>
            )}
            <div style={{ paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button onClick={toggleTheme} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--color-text)', fontWeight: 500,
              }}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
