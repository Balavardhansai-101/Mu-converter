import { Link } from 'react-router-dom';
import { FileText, Globe, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--color-border)',
      background: 'var(--color-surface2)',
      padding: '3rem 1.5rem 2rem',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <img src="/src/assets/mu-logo.svg" alt="MU Converter" style={{ width: 36, height: 36, borderRadius: 9, objectFit: 'contain' }} />
              <span style={{ fontWeight: 800, fontSize: '1rem', color: '#000000' }}>
                MU Converter
              </span>
            </div>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
              Professional document conversion tools. Fast, secure, and completely free.
            </p>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', lineHeight: 1.6, marginTop: '8px' }}>
              For any changes or support, email: <a href="mailto:balavardhansai77@gmail.com" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>balavardhansai77@gmail.com</a>
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '1rem' }}>
              {[Globe, Mail, Heart].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: 34, height: 34, borderRadius: '50%',
                  border: '1px solid var(--color-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-muted)', textDecoration: 'none', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#6366f1'; e.currentTarget.style.borderColor = '#6366f1'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-muted)'; e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>Tools</h4>
            {[
              { label: 'Word to PDF', path: '/word-to-pdf' },
              { label: 'PDF to Word', path: '/pdf-to-word' },
              { label: 'Merge PDFs', path: '/merge-pdf' },
              { label: 'Merge Word Docs', path: '/merge-word' },
            ].map(item => (
              <Link key={item.path} to={item.path} style={{
                display: 'block', color: 'var(--color-muted)', textDecoration: 'none',
                fontSize: '0.875rem', marginBottom: '8px', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#6366f1'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>Company</h4>
            {[
              { label: 'About', path: '/about' },
              { label: 'Contact', path: '/contact' },
            ].map(item => (
              <Link key={item.path} to={item.path} style={{
                display: 'block', color: 'var(--color-muted)', textDecoration: 'none',
                fontSize: '0.875rem', marginBottom: '8px', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#6366f1'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>Legal</h4>
            {[
              { label: 'Privacy Policy', path: '/privacy' },
              { label: 'Terms of Service', path: '/terms' },
            ].map(item => (
              <Link key={item.path} to={item.path} style={{
                display: 'block', color: 'var(--color-muted)', textDecoration: 'none',
                fontSize: '0.875rem', marginBottom: '8px', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#6366f1'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div style={{
          paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <div>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', margin: 0 }}>
              © 2026 mu converts. All rights reserved.
            </p>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', margin: '4px 0 0' }}>
              Created by BVS_101
            </p>
          </div>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', margin: 0 }}>
            Built with ❤️ for productivity
          </p>
        </div>
      </div>
    </footer>
  );
}
