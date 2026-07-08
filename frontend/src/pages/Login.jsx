import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      login(response.user);
      setSuccess(response.message || 'Login successful!');
      setTimeout(() => navigate('/'), 1200);
    } catch (loginError) {
      console.error('Login failed:', loginError);
      if (loginError.response?.data?.error) {
        setError(loginError.response.data.error);
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '4rem 1.5rem', maxWidth: '520px', margin: '0 auto' }}>
      <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '24px', padding: '3rem', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 900, marginBottom: '1rem' }}>Login</h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>Access your account to manage saved document conversions and view your history.</p>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'grid', gap: '0.5rem', fontWeight: 600 }}>Email address
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="" style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '16px', border: '1px solid var(--color-border)', background: 'var(--color-surface2)', color: 'var(--color-text)' }} />
          </label>
          <label style={{ display: 'grid', gap: '0.5rem', fontWeight: 600 }}>Password
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="" style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '16px', border: '1px solid var(--color-border)', background: 'var(--color-surface2)', color: 'var(--color-text)' }} />
          </label>
          {error && <div style={{ color: '#dc2626', fontSize: '0.95rem' }}>{error}</div>}
          {success && <div style={{ color: '#16a34a', fontSize: '0.95rem' }}>{success}</div>}
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px 18px', fontSize: '1rem' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{ color: 'var(--color-muted)', marginTop: '1.5rem', fontSize: '0.95rem' }}>
          Enter your credentials to login and access your document tools.
        </p>
      </div>
    </div>
  );
}
