import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileText, File, AlertCircle } from 'lucide-react';

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

function FileIcon({ name }) {
  const ext = name?.split('.').pop()?.toLowerCase();
  if (ext === 'pdf') return <div style={{ fontSize: '1.5rem' }}>📄</div>;
  if (['doc', 'docx'].includes(ext)) return <div style={{ fontSize: '1.5rem' }}>📝</div>;
  return <File size={24} color="#6366f1" />;
}

export default function DragDropZone({ files, onFiles, onRemove, accept, label, multiple = true, error }) {
  const onDrop = useCallback((accepted) => {
    onFiles(accepted);
  }, [onFiles]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxSize: 150 * 1024 * 1024,
  });

  const rejectedError = fileRejections.length > 0 ? fileRejections[0].errors[0]?.message : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Drop Zone */}
      <motion.div
        {...getRootProps()}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        style={{
          border: `2px dashed ${isDragActive ? '#6366f1' : 'rgba(99,102,241,0.3)'}`,
          borderRadius: '16px',
          padding: '3rem 2rem',
          textAlign: 'center',
          cursor: 'pointer',
          background: isDragActive
            ? 'rgba(99,102,241,0.08)'
            : 'rgba(99,102,241,0.03)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(99,102,241,0.05)',
              pointerEvents: 'none',
            }}
          />
        )}
        <motion.div
          animate={isDragActive ? { y: -5 } : { y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div style={{
            width: 64, height: 64, margin: '0 auto 1rem',
            borderRadius: '50%',
            background: isDragActive
              ? 'linear-gradient(135deg, #6366f1, #22d3ee)'
              : 'rgba(99,102,241,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s',
          }}>
            <Upload size={28} color={isDragActive ? 'white' : '#6366f1'} />
          </div>
          <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            {isDragActive ? 'Drop files here!' : label || 'Drag & drop files here'}
          </h3>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>
            or <span style={{ color: '#6366f1', fontWeight: 600 }}>browse files</span> from your computer
          </p>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
            Max file size: 150 MB
          </p>
        </motion.div>
      </motion.div>

      {/* Error */}
      {(error || rejectedError) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '12px 16px', borderRadius: '10px',
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
            color: '#ef4444', fontSize: '0.875rem',
          }}
        >
          <AlertCircle size={16} />
          {error || rejectedError}
        </motion.div>
      )}

      {/* File List */}
      <AnimatePresence>
        {files && files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {files.length} file{files.length !== 1 ? 's' : ''} selected
            </p>
            {files.map((file, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.05 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 16px', borderRadius: '12px',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <FileIcon name={file.name} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {file.name}
                  </p>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>
                    {formatBytes(file.size)}
                  </p>
                </div>
                {onRemove && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onRemove(idx); }}
                    style={{
                      width: 28, height: 28, borderRadius: '50%',
                      border: 'none', cursor: 'pointer',
                      background: 'rgba(239,68,68,0.1)', color: '#ef4444',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                  >
                    <X size={14} />
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
