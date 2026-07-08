import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Download, GripVertical } from 'lucide-react';
import DragDropZone from '../components/DragDropZone';
import { StatusBadge } from '../components/UIComponents';
import { mergeWords } from '../utils/api';

function SortableWordList({ files, setFiles }) {
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  const handleDragEnd = () => {
    if (dragging !== null && dragOver !== null && dragging !== dragOver) {
      const next = [...files];
      const [moved] = next.splice(dragging, 1);
      next.splice(dragOver, 0, moved);
      setFiles(next);
    }
    setDragging(null); setDragOver(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {files.map((file, i) => (
        <motion.div key={i} layout draggable
          onDragStart={() => setDragging(i)}
          onDragEnter={() => setDragOver(i)}
          onDragEnd={handleDragEnd}
          onDragOver={e => e.preventDefault()}
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px 16px', borderRadius: '12px',
            background: dragging === i ? 'rgba(245,158,11,0.12)' : 'var(--color-surface)',
            border: `1px solid ${dragOver === i ? '#f59e0b' : 'var(--color-border)'}`,
            cursor: 'grab', transition: 'all 0.15s',
          }}
        >
          <GripVertical size={18} color="var(--color-muted)" />
          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'rgba(245,158,11,0.1)', color: '#f59e0b',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '0.8rem', flexShrink: 0,
          }}>{i + 1}</div>
          <div style={{ fontSize: '1.2rem' }}>📝</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</p>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem' }}>{(file.size / 1024).toFixed(1)} KB</p>
          </div>
          <button onClick={() => setFiles(f => f.filter((_, j) => j !== i))}
            style={{ width: 26, height: 26, borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'rgba(239,68,68,0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </motion.div>
      ))}
    </div>
  );
}

export default function MergeWord() {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFiles = (accepted) => {
    const valid = accepted.filter(f =>
      f.type === 'application/msword' ||
      f.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    setFiles(prev => [...prev, ...valid]);
    setResult(null); setError('');
  };

  const handleMerge = async () => {
    if (files.length < 2) { setError('Please upload at least 2 Word documents.'); return; }
    setStatus('processing'); setError('');
    try {
      const order = files.map((_, i) => i);
      const data = await mergeWords(files, order);
      setResult(data);
      setStatus('success');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Merge failed.');
      setStatus('error');
    }
  };

  const handleReset = () => { setFiles([]); setResult(null); setStatus('idle'); setError(''); };
  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a'); a.href = result.downloadUrl; a.download = result.outputName; a.click();
  };

  return (
    <div style={{ paddingTop: '80px', padding: '80px 1.5rem 4rem', maxWidth: '750px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '20px',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.25rem', fontSize: '2rem',
          boxShadow: '0 12px 40px rgba(245,158,11,0.4)',
        }}>📚</div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '0.75rem' }}>Merge Word Documents</h1>
        <p style={{ color: 'var(--color-muted)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
          Combine multiple .docx files into a single Word document. Reorder them by dragging before merging.
        </p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 style={{ fontWeight: 700 }}>Upload Word Files</h2>
          <StatusBadge status={status} />
        </div>

        <DragDropZone
          files={[]} onFiles={handleFiles}
          accept={{ 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }}
          label="Add more Word documents to the list"
          error={error}
        />

        {files.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '1.5rem' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
              Drag to reorder — {files.length} documents
            </p>
            <SortableWordList files={files} setFiles={setFiles} />
          </motion.div>
        )}

        <div style={{ display: 'flex', gap: '12px', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={handleMerge}
            disabled={status === 'processing' || files.length < 2}
            style={{
              flex: 1, minWidth: '150px', padding: '12px 20px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              opacity: (status === 'processing' || files.length < 2) ? 0.6 : 1,
            }}
          >
            📚 {status === 'processing' ? 'Merging...' : `Merge ${files.length} Documents`}
          </motion.button>
          {(result || files.length > 0) && status !== 'processing' && (
            <motion.button whileHover={{ scale: 1.03 }} className="btn-secondary"
              onClick={handleReset} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <RefreshCw size={15} /> Reset
            </motion.button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="glass" style={{ padding: '2rem', marginTop: '1.5rem' }}>
            <h2 style={{ fontWeight: 700, marginBottom: '1.25rem' }}>✅ Merge Successful!</h2>
            <div style={{
              padding: '16px 20px', borderRadius: '12px',
              border: '1px solid rgba(245,158,11,0.3)',
              background: 'rgba(245,158,11,0.07)',
              display: 'flex', alignItems: 'center', gap: '14px',
            }}>
              <div style={{ fontSize: '2rem' }}>📝</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700 }}>merged_document.docx</p>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}>All documents combined successfully</p>
              </div>
              <button onClick={handleDownload}
                style={{
                  padding: '10px 20px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                <Download size={15} /> Download
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
