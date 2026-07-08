import { motion } from 'framer-motion';
import { Shield, Zap, Clock, Code2, Globe, Lock } from 'lucide-react';

const team = [
  { name: 'Document Intelligence', role: 'Core Engine', desc: 'Powered by state-of-the-art document parsing libraries including mammoth, pdf-lib, and docx for reliable conversions.' },
  { name: 'Security First', role: 'Privacy Focus', desc: 'All files are processed server-side with strict access controls and automatically deleted after 10 minutes.' },
  { name: 'Open Architecture', role: 'Tech Stack', desc: 'Built with React, Node.js, Express, and modern open-source tools. Deployable anywhere.' },
];

const tech = [
  { icon: '⚛️', name: 'React + Vite', desc: 'Lightning-fast frontend' },
  { icon: '🟢', name: 'Node.js + Express', desc: 'Robust backend API' },
  { icon: '📄', name: 'pdf-lib', desc: 'PDF operations' },
  { icon: '📝', name: 'mammoth', desc: 'DOCX parsing' },
  { icon: '🎨', name: 'Tailwind CSS', desc: 'Modern styling' },
  { icon: '✨', name: 'Framer Motion', desc: 'Smooth animations' },
];

export default function About() {
  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero */}
      <section style={{ padding: '5rem 1.5rem 4rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, marginBottom: '1.25rem' }}>
            About <span className="gradient-text">DocConverter Pro</span>
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '650px', margin: '0 auto' }}>
            We built Document Converter Pro to make document processing accessible to everyone — no software installations, no accounts, no cost.
            Just fast, reliable, and secure conversions right in your browser.
          </p>
        </motion.div>
      </section>

      {/* Mission */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {[
            { icon: <Shield size={26} />, title: 'Our Mission', desc: 'Empower individuals and businesses with professional-grade document tools that are accessible, fast, and completely free.' },
            { icon: <Lock size={26} />, title: 'Privacy Promise', desc: 'Your documents are never stored permanently. We process your files in memory and delete everything within 10 minutes.' },
            { icon: <Globe size={26} />, title: 'Open & Accessible', desc: 'No account required. No subscriptions. No hidden fees. Just open the app and start converting — it\'s that simple.' },
          ].map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass"
              style={{ padding: '2rem' }}
            >
              <div style={{
                width: 54, height: 54, borderRadius: '14px',
                background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', marginBottom: '1.25rem',
              }}>{item.icon}</div>
              <h3 style={{ fontWeight: 800, marginBottom: '0.75rem', fontSize: '1.1rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--color-muted)', lineHeight: 1.7, fontSize: '0.9rem' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem' }}>
            Built with Modern Technology
          </h2>
          <p style={{ color: 'var(--color-muted)' }}>A carefully chosen stack for performance, reliability, and great developer experience.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
          {tech.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -5 }}
              className="glass"
              style={{ padding: '1.5rem', textAlign: 'center', cursor: 'default' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{t.icon}</div>
              <p style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{t.name}</p>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(34,211,238,0.08))',
          border: '1px solid rgba(99,102,241,0.2)',
          padding: '3rem 2rem',
          textAlign: 'center',
        }}>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '2.5rem' }}>
            Marwadi university Converter
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem' }}>
            {[
              { value: '10M+', label: 'Documents Converted' },
              { value: '150+', label: 'Countries Served' },
              { value: '99.9%', label: 'Success Rate' },
              { value: '24/7', label: 'Availability' },
            ].map((stat, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="gradient-text" style={{ fontSize: '2.5rem', fontWeight: 900 }}>{stat.value}</div>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
