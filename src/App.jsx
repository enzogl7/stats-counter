import Header from './components/Header';
import Card from './components/Card';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import WidgetViewer from './components/WidgetViewer';
import SavedWidgetList from './components/SavedWidgetList.tsx';
import UpdateModal from './components/UpdatesModal';
import { useEffect, useState } from 'react';

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
              {showModal && <UpdateModal onClose={() => setShowModal(false)} />}
              <Header />
              <SavedWidgetList />
              <Card />
            </main>
          </>
        }
      />

      <Route path="/widget/:id" element={<WidgetViewer />} />
    </Routes>
  );
}

export default App;