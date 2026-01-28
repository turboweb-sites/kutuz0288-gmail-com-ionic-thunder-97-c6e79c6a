import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Update page title and meta description based on current page
    const titles: Record<string, string> = {
      home: 'Snake 5555 - AI-Powered Creative Studio',
    };
    
    const descriptions: Record<string, string> = {
      home: 'Transform your ideas into reality with AURA - cutting-edge AI tools for image generation, video creation, and audio production.',
    };

    document.title = titles[currentPage] || 'Snake 5555';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptions[currentPage] || 'Snake 5555 - AI Creative Studio');
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-900 via-black to-red-900">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow">
        {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
      </main>
      
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}