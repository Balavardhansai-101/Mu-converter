import axios from 'axios';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 120000,
});
async function requestWithRetry(requestFn, retries = 1) {
  try {
    return await requestFn();
  } catch (error) {
    const isNetworkFailure = !error.response && (
      error.code === 'ERR_NETWORK' ||
      error.message?.includes('Network Error') ||
      error.message?.includes('Failed to fetch')
    );

    if (isNetworkFailure && retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return requestWithRetry(requestFn, retries - 1);
    }

    throw error;
  }
}

export function getApiErrorMessage(error) {
  const backendMessage = error.response?.data?.error || error.response?.data?.message;

  if (backendMessage) {
    return backendMessage;
  }

  if (!error.response && (
    error.code === 'ERR_NETWORK' ||
    error.message?.includes('Network Error') ||
    error.message?.includes('Failed to fetch')
  )) {
    return 'Unable to reach the server. Make sure the backend is running.';
  }

  return 'Something went wrong. Please try again.';
}

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

export async function signupUser(payload) {
  const res = await requestWithRetry(() => API.post('/auth/signup', payload));
  return res.data;
}

export async function loginUser(credentials) {
  const res = await requestWithRetry(() => API.post('/auth/login', credentials));
  return res.data;
}

export async function getHistory() {
  const res = await API.get('/history');
  return res.data;
}

export function getDownloadUrl(path) {
  return path;
}
