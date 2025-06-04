import Header from './components/Header';
import Card from './components/Card';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import WidgetViewer from './components/WidgetViewer';
import SavedWidgetList from './components/SavedWidgetList.tsx';
import WelcomeModal from './components/WelcomeModal.tsx';
import TutorialModal from './components/TutorialModal';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import NoticeUpdate from './components/NoticeUpdate.tsx';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [shouldShowTutorialAfterWelcome, setShouldShowTutorialAfterWelcome] = useState(false);

  useEffect(() => {
    const seenModal = localStorage.getItem('seenModalWelcome');
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');

    if (!seenModal) {
      setShowModal(true);
      localStorage.setItem('seenModalWelcome', 'true');
    } else if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  const handleCloseWelcome = () => {
    setShowModal(false);

    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  };

  const handleCloseTutorial = () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    setShowTutorial(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <main className="max-w-4xl mx-auto px-4 py-8">
              <ToastContainer position="top-right" autoClose={3000} />
              {showModal && <WelcomeModal onClose={handleCloseWelcome} />}
              {showTutorial && !showModal && <TutorialModal onClose={handleCloseTutorial} />}
              <NoticeUpdate />
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