import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = axios.create({ baseURL: '/api', timeout: 120000 });

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!fullName || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await API.post('/auth/signup', { fullName, email, password });
      setSuccess(response.data.message || 'Signup successful!');
      setFullName('');
      setEmail('');
      setPassword('');
      setTimeout(() => navigate('/login'), 1500);
    } catch (signupError) {
      console.error('Signup failed:', signupError);
      if (signupError.response?.data?.error) {
        setError(signupError.response.data.error);
      } else {
        setError('Signup failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '4rem 1.5rem', maxWidth: '520px', margin: '0 auto' }}>
      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '24px', padding: '3rem', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 900, marginBottom: '1rem' }}>Sign Up</h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>Create an account to save your documents and access your conversion history.</p>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'grid', gap: '0.5rem', fontWeight: 600 }}>Full name
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" placeholder="" style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '16px', border: '1px solid var(--color-border)', background: 'var(--color-surface2)', color: 'var(--color-text)' }} />
          </label>
          <label style={{ display: 'grid', gap: '0.5rem', fontWeight: 600 }}>Email address
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="" style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '16px', border: '1px solid var(--color-border)', background: 'var(--color-surface2)', color: 'var(--color-text)' }} />
          </label>
          <label style={{ display: 'grid', gap: '0.5rem', fontWeight: 600 }}>Password
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="" style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '16px', border: '1px solid var(--color-border)', background: 'var(--color-surface2)', color: 'var(--color-text)' }} />
          </label>
          {error && <div style={{ color: '#dc2626', fontSize: '0.95rem' }}>{error}</div>}
          {success && <div style={{ color: '#16a34a', fontSize: '0.95rem' }}>{success}</div>}
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px 18px', fontSize: '1rem' }} disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p style={{ color: 'var(--color-muted)', marginTop: '1.5rem', fontSize: '0.95rem' }}>
          Already have an account? <Link to="/login" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 700 }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
