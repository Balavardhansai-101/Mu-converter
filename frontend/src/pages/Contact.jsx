import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { submitContact } from '../utils/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setError('Please fill in all required fields.'); return; }
    setStatus('loading'); setError('');
    try {
      await submitContact(form);
      setStatus('success');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message. Please try again.');
      setStatus('idle');
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '10px',
    background: 'var(--color-surface2)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text)', fontSize: '0.95rem',
    outline: 'none', transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      <section style={{ padding: '5rem 1.5rem 4rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: '1rem' }}>
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p style={{ color: 'var(--color-muted)', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto' }}>
            Have a question, suggestion, or just want to say hi? We'd love to hear from you.
          </p>
        </motion.div>
      </section>

      <section style={{ padding: '0 1.5rem 5rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {/* Info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: <Mail size={22} />, title: 'Email Us', desc: 'balavardhansai77@gmail.com', sub: 'We reply within 24 hours' },
              { icon: <MessageSquare size={22} />, title: 'Live Chat', desc: 'Available on the platform', sub: 'Mon-Fri, 9am-6pm EST' },
            ].map((card, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="glass"
                style={{ padding: '1.5rem', display: 'flex', gap: '1rem' }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: '12px',
                  background: 'rgba(99,102,241,0.1)', color: '#6366f1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>{card.icon}</div>
                <div>
                  <h3 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{card.title}</h3>
                  <p style={{ color: '#6366f1', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{card.desc}</p>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>{card.sub}</p>
                </div>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              style={{
                padding: '1.5rem', borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(34,211,238,0.07))',
                border: '1px solid rgba(99,102,241,0.2)',
              }}
            >
              <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>🚀 Response Time</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                We typically respond to all inquiries within 24 hours. For urgent matters, please mention it in the subject line.
              </p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass" style={{ padding: '2rem' }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '2rem 0' }}
                >
                  <CheckCircle size={56} color="#10b981" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.75rem' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--color-muted)', lineHeight: 1.7 }}>
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    className="btn-secondary" style={{ marginTop: '1.5rem' }}>
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h2 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Send a Message</h2>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>
                        Name *
                      </label>
                      <input name="name" value={form.name} onChange={handleChange}
                        placeholder="Your name" style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#6366f1'}
                        onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>
                        Email *
                      </label>
                      <input name="email" type="email" value={form.email} onChange={handleChange}
                        placeholder="your@email.com" style={inputStyle}
                        onFocus={e => e.target.style.borderColor = '#6366f1'}
                        onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>
                      Subject
                    </label>
                    <input name="subject" value={form.subject} onChange={handleChange}
                      placeholder="What's this about?" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#6366f1'}
                      onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', display: 'block', marginBottom: '6px' }}>
                      Message *
                    </label>
                    <textarea name="message" value={form.message} onChange={handleChange}
                      placeholder="Tell us more..." rows={5}
                      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                      onFocus={e => e.target.style.borderColor = '#6366f1'}
                      onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                    />
                  </div>

                  {error && (
                    <p style={{ color: '#ef4444', fontSize: '0.875rem', background: 'rgba(239,68,68,0.1)', padding: '10px 14px', borderRadius: '8px' }}>
                      {error}
                    </p>
                  )}

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    type="submit" className="btn-primary"
                    disabled={status === 'loading'}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: status === 'loading' ? 0.7 : 1 }}
                  >
                    <Send size={17} />
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
