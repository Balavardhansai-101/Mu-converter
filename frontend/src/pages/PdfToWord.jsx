import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, RefreshCw, Archive } from 'lucide-react';
import DragDropZone from '../components/DragDropZone';
import { ProgressBar, ResultCard, StatusBadge } from '../components/UIComponents';
import { convertPdfToWord, createZip } from '../utils/api';

export default function PdfToWord() {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleFiles = (accepted) => { setFiles(prev => [...prev, ...accepted]); setResults([]); setError(''); };
  const removeFile = (idx) => setFiles(f => f.filter((_, i) => i !== idx));

  const handleConvert = async () => {
    if (files.length === 0) { setError('Please select at least one PDF file.'); return; }
    setStatus('uploading'); setProgress(0); setError('');
    try {
      setStatus('processing');
      const data = await convertPdfToWord(files, (p) => setProgress(Math.min(p, 90)));
      setProgress(100);
      setResults(data.results);
      setStatus('success');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Conversion failed.');
      setStatus('error');
    }
  };

  const handleReset = () => { setFiles([]); setResults([]); setStatus('idle'); setProgress(0); setError(''); };

  const handleDownloadAll = async () => {
    const fileNames = results.filter(r => r.status === 'success').map(r => r.outputName);
    if (fileNames.length <= 1) {
      if (results[0]) { const a = document.createElement('a'); a.href = results[0].downloadUrl; a.download = results[0].outputName; a.click(); }
      return;
    }
    try { const data = await createZip(fileNames); const a = document.createElement('a'); a.href = data.downloadUrl; a.download = data.zipName; a.click(); }
    catch (e) { alert('ZIP failed: ' + e.message); }
  };

  const isProcessing = status === 'uploading' || status === 'processing';
  const successResults = results.filter(r => r.status === 'success');

  return (
    <div style={{ paddingTop: '80px', padding: '80px 1.5rem 4rem', maxWidth: '750px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '20px',
          background: 'linear-gradient(135deg, #22d3ee, #0ea5e9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.25rem', fontSize: '2rem',
          boxShadow: '0 12px 40px rgba(34,211,238,0.4)',
        }}>📋</div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '0.75rem' }}>PDF to Word Converter</h1>
        <p style={{ color: 'var(--color-muted)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
          Convert PDF files into editable Word documents. Formatting, headings, and text layout are preserved.
        </p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 style={{ fontWeight: 700 }}>Upload PDF Files</h2>
          <StatusBadge status={status} />
        </div>

        <DragDropZone
          files={files} onFiles={handleFiles}
          onRemove={isProcessing ? null : removeFile}
          accept={{ 'application/pdf': ['.pdf'] }}
          label="Drag & drop PDF files here"
          error={error}
        />

        {isProcessing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '1.5rem' }}>
            <ProgressBar progress={progress} label={status === 'uploading' ? 'Uploading...' : 'Extracting content & building Word doc...'} />
          </motion.div>
        )}

        <div style={{ display: 'flex', gap: '12px', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={handleConvert}
            disabled={isProcessing || files.length === 0}
            style={{
              flex: 1, minWidth: '150px', padding: '12px 20px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #22d3ee, #0ea5e9)',
              color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              opacity: (isProcessing || files.length === 0) ? 0.6 : 1,
            }}
          >
            <FileText size={17} />
            {isProcessing ? 'Converting...' : `Convert ${files.length > 0 ? `(${files.length})` : ''} to Word`}
          </motion.button>
          {(results.length > 0 || files.length > 0) && !isProcessing && (
            <motion.button whileHover={{ scale: 1.03 }} className="btn-secondary"
              onClick={handleReset} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <RefreshCw size={15} /> Reset
            </motion.button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="glass" style={{ padding: '2rem', marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h2 style={{ fontWeight: 700 }}>Results</h2>
              {successResults.length > 1 && (
                <button onClick={handleDownloadAll} className="btn-secondary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', fontSize: '0.85rem' }}>
                  <Archive size={15} /> Download All as ZIP
                </button>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {results.map((r, i) => <ResultCard key={i} result={r} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
