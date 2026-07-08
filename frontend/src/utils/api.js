import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  timeout: 120000,
});

export async function convertWordToPdf(files, onProgress) {
  const formData = new FormData();
  files.forEach(f => formData.append('files', f));
  const res = await API.post('/convert/word-to-pdf', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      if (onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
    },
  });
  return res.data;
}

export async function convertPdfToWord(files, onProgress) {
  const formData = new FormData();
  files.forEach(f => formData.append('files', f));
  const res = await API.post('/convert/pdf-to-word', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      if (onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
    },
  });
  return res.data;
}

export async function mergePdfs(files, order) {
  const formData = new FormData();
  files.forEach(f => formData.append('files', f));
  if (order) formData.append('order', JSON.stringify(order));
  const res = await API.post('/merge/pdf', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export async function mergeWords(files, order) {
  const formData = new FormData();
  files.forEach(f => formData.append('files', f));
  if (order) formData.append('order', JSON.stringify(order));
  const res = await API.post('/merge/word', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export async function createZip(fileNames) {
  const res = await API.post('/extra/zip', { files: fileNames });
  return res.data;
}

export async function submitContact(data) {
  const res = await API.post('/extra/contact', data);
  return res.data;
}

export async function loginUser(credentials) {
  const res = await API.post('/auth/login', credentials);
  return res.data;
}

export async function getHistory() {
  const res = await API.get('/history');
  return res.data;
}

export function getDownloadUrl(path) {
  return path;
}
