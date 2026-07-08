import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Shield, Zap, Clock, Star, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const tools = [
  {
    icon: '📄➡️📋',
    emoji: '📄',
    title: 'Word to PDF',
    description: 'Convert .doc and .docx files to high-quality PDF documents instantly.',
    path: '/word-to-pdf',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  },
  {
    icon: '📋➡️📄',
    emoji: '📋',
    title: 'PDF to Word',
    description: 'Extract and convert PDF content into editable Word documents.',
    path: '/pdf-to-word',
    color: '#22d3ee',
    gradient: 'linear-gradient(135deg, #22d3ee, #0ea5e9)',
  },
  {
    icon: '🔗',
    emoji: '🔗',
    title: 'Merge PDFs',
    description: 'Combine multiple PDF files into one. Drag to reorder pages.',
    path: '/merge-pdf',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    icon: '📚',
    emoji: '📚',
    title: 'Merge Word Docs',
    description: 'Join multiple Word documents into a single cohesive file.',
    path: '/merge-word',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
  },
];

const features = [
  { icon: <Shield size={22} />, title: 'Secure & Private', desc: 'Files are auto-deleted after 10 minutes. Your data stays yours.' },
  { icon: <Zap size={22} />, title: 'Lightning Fast', desc: 'Optimized conversion engine delivers results in seconds.' },
  { icon: <Clock size={22} />, title: 'No Sign-up', desc: 'Use all tools instantly without creating an account.' },
  { icon: <Star size={22} />, title: 'Free Forever', desc: 'All core features are completely free. No hidden costs.' },
];

const faqs = [
  { q: 'How long are my files stored?', a: 'Files are automatically deleted from our servers 10 minutes after processing. We never store your data permanently.' },
  { q: 'What is the maximum file size?', a: 'You can upload files up to 50 MB per file. For larger files, please contact us.' },
  { q: 'How many files can I convert at once?', a: 'You can convert up to 10 files simultaneously for conversions and 20 files for merging.' },
  { q: 'Is my data safe?', a: 'Absolutely. All file transfers are encrypted, and files are automatically purged after processing.' },
  { q: 'Can I convert complex Word documents?', a: 'Yes! We handle headings, paragraphs, bullet lists, and basic formatting. Complex layouts are preserved as best as possible.' },
];


function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      style={{
        borderRadius: '12px',
        border: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        overflow: 'hidden',
        marginBottom: '10px',
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--color-text)', textAlign: 'left', fontWeight: 600, fontSize: '0.95rem',
        }}
      >
        {q}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} color="var(--color-muted)" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <p style={{ padding: '0 20px 18px', color: 'var(--color-muted)', lineHeight: 1.7, fontSize: '0.9rem' }}>
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div style={{ paddingTop: '64px' }}>
      {/* Hero */}
      <section style={{ padding: '5rem 1.5rem 4rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
            Convert & Merge Documents{' '}
            <span className="gradient-text">Effortlessly</span>
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, maxWidth: '650px', margin: '0 auto 2.5rem' }}>
            Transform your Word documents and PDFs with professional precision. No installation needed — just drag, drop, and convert.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
            <Link to="/word-to-pdf" style={{ textDecoration: 'none', width: '100%', maxWidth: '280px' }}>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 10px 40px rgba(99,102,241,0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary"
                style={{ width: '100%', fontSize: '1rem', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                Start Converting <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link to="/about" style={{ textDecoration: 'none', width: '100%', maxWidth: '280px' }}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary"
                style={{ width: '100%', fontSize: '1rem', padding: '14px 28px' }}
              >
                About
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Tools Grid */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem' }}>
            All Your Document Tools
          </h2>
          <p style={{ color: 'var(--color-muted)', maxWidth: '500px', margin: '0 auto' }}>
            Four powerful tools to handle all your document conversion and merging needs.
          </p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={tool.path} style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: `0 20px 60px rgba(0,0,0,0.3), 0 0 40px ${tool.color}22` }}
                  className="glass"
                  style={{ padding: '2rem', height: '100%', cursor: 'pointer', transition: 'all 0.3s' }}
                >
                  <div style={{
                    width: 56, height: 56, borderRadius: '14px',
                    background: tool.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem', marginBottom: '1.25rem',
                    boxShadow: `0 8px 25px ${tool.color}40`,
                  }}>
                    {tool.emoji}
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.75rem', color: tool.color }}>
                    {tool.title}
                  </h3>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {tool.description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: tool.color, fontWeight: 600, fontSize: '0.875rem' }}>
                    Try it now <ArrowRight size={15} />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem', color: '#000000' }}>
            Why Choose mu converts?
          </h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass"
              style={{ padding: '1.75rem' }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: '12px',
                background: 'rgba(99,102,241,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#6366f1', marginBottom: '1rem',
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: '780px', margin: '0 auto' }}>
        <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem' }}>
            Frequently Asked Questions
          </h2>
        </motion.div>
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
          >
            <FAQItem q={faq.q} a={faq.a} />
          </motion.div>
        ))}
      </section>

    </div>
  );
}
