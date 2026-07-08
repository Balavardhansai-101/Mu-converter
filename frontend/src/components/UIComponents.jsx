import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Download, Loader } from 'lucide-react';

export function ProgressBar({ progress, label }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      {label && <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '6px' }}>{label}</p>}
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
      <p style={{ fontSize: '0.75rem', color: '#6366f1', textAlign: 'right', marginTop: '4px' }}>
        {progress}%
      </p>
    </div>
  );
}

export function ResultCard({ result, apiBase = '' }) {
  if (!result) return null;

  const isSuccess = result.status === 'success';

  const handleDownload = () => {
    const url = `${apiBase}${result.downloadUrl}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = result.outputName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        padding: '16px 20px', borderRadius: '12px',
        border: `1px solid ${isSuccess ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
        background: isSuccess ? 'rgba(16,185,129,0.07)' : 'rgba(239,68,68,0.07)',
        display: 'flex', alignItems: 'center', gap: '14px',
      }}
    >
      {isSuccess
        ? <CheckCircle size={22} color="#10b981" style={{ flexShrink: 0 }} />
        : <XCircle size={22} color="#ef4444" style={{ flexShrink: 0 }} />
      }
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {result.outputName || result.originalName}
        </p>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem', marginTop: '4px' }}>
          {result.originalName}
        </p>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem', marginTop: '6px' }}>
          {isSuccess ? '✓ Converted successfully' : `✗ ${result.error}`}
        </p>
      </div>
      {isSuccess && (
        <button onClick={handleDownload} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Download size={14} /> Download
        </button>
      )}
    </motion.div>
  );
}

export function StatusBadge({ status }) {
  const configs = {
    idle: { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', label: 'Ready' },
    uploading: { color: '#6366f1', bg: 'rgba(99,102,241,0.1)', label: 'Uploading...' },
    processing: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', label: 'Processing...' },
    success: { color: '#10b981', bg: 'rgba(16,185,129,0.1)', label: 'Done!' },
    error: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', label: 'Error' },
  };
  const cfg = configs[status] || configs.idle;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '4px 12px', borderRadius: '20px',
      background: cfg.bg, color: cfg.color,
      fontSize: '0.8rem', fontWeight: 600,
    }}>
      {status === 'processing' && <Loader size={12} style={{ animation: 'spin 1s linear infinite' }} />}
      {cfg.label}
    </span>
  );
}

export function SortableFile({ file, index, onRemove }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '14px 16px', borderRadius: '12px',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        cursor: 'grab',
      }}
    >
      <div style={{ color: 'var(--color-muted)', fontSize: '0.85rem', fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>
        {index + 1}
      </div>
      <div style={{ fontSize: '1.4rem' }}>
        {file.name?.endsWith('.pdf') ? '📄' : '📝'}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {file.name}
        </p>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>
          {(file.size / 1024).toFixed(1)} KB
        </p>
      </div>
      {onRemove && (
        <button onClick={() => onRemove(index)} style={{
          width: 28, height: 28, borderRadius: '50%',
          border: 'none', cursor: 'pointer',
          background: 'rgba(239,68,68,0.1)', color: '#ef4444',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          ×
        </button>
      )}
    </motion.div>
  );
}
