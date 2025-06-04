import Header from './components/Header';
import Card from './components/Card';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import WidgetViewer from './components/WidgetViewer';
import SavedWidgetList from './components/SavedWidgetList.tsx';
import WelcomeModal from './components/WelcomeModal.tsx';
import { useEffect, useState } from 'react';
import Footer from './components/Footer';

function App() {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const seenModal = localStorage.getItem('seenModalUpdates');
    if (!seenModal) {
      setShowModal(true);
      localStorage.setItem('seenModalUpdates', 'true');
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <main className="max-w-4xl mx-auto px-4 py-8">
              <ToastContainer position="top-right" autoClose={3000} />
              {showModal && <WelcomeModal onClose={() => setShowModal(false)} />}
              <Header />
              <SavedWidgetList />
              <Card />
              <Footer />
            </main>
          </>
        }
      />

      <Route path="/widget/:id" element={<WidgetViewer />} />
    </Routes>
  );
}

export default App;