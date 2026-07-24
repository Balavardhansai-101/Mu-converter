import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import WordToPdf from './pages/WordToPdf';
import PdfToWord from './pages/PdfToWord';
import MergePdf from './pages/MergePdf';
import MergeWord from './pages/MergeWord';
import About from './pages/About';
import Contact from './pages/Contact';
import { Privacy, Terms } from './pages/LegalPages';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen gradient-bg flex">
          <Navbar />
          <div className="flex-1 flex flex-col relative">
            <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/word-to-pdf" element={<WordToPdf />} />
                  <Route path="/pdf-to-word" element={<PdfToWord />} />
                  <Route path="/merge-pdf" element={<MergePdf />} />
                  <Route path="/merge-word" element={<MergeWord />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        </BrowserRouter>
    </ThemeProvider>
  );
}
