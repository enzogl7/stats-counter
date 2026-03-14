import Header from './components/Header';
import Card from './components/Card';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import WidgetViewer from './components/WidgetViewer';
import SavedWidgetList from './components/SavedWidgetList.tsx';
import WelcomeModal from './components/WelcomeModal.tsx';
import NoticeUpdate from './components/NoticeUpdate.tsx';
import DesktopAppBanner from './components/DesktopAppBanner.tsx';
import TutorialModal from './components/TutorialModal';
import Footer from './components/Footer';
import { useState } from 'react';

const getInitialModal = () => {
  const seenWelcome = localStorage.getItem('seenModalWelcome');
  const seenDesktopNotice = localStorage.getItem('seenDesktopAppNotice');
  const seenTutorial = localStorage.getItem('hasSeenTutorial');

  if (!seenWelcome) {
    return 'welcome';
  }

  if (!seenDesktopNotice) {
    return 'desktop';
  }

  if (!seenTutorial) {
    return 'tutorial';
  }

  return null;
};

function App() {
  const [activeModal, setActiveModal] = useState(getInitialModal);

  const handleCloseWelcome = () => {
    localStorage.setItem('seenModalWelcome', 'true');
    const hasSeenDesktopNotice = localStorage.getItem('seenDesktopAppNotice');
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');

    if (!hasSeenDesktopNotice) {
      setActiveModal('desktop');
    } else if (!hasSeenTutorial) {
      setActiveModal('tutorial');
    } else {
      setActiveModal(null);
    }
  };

  const handleCloseNoticeUpdate = () => {
    localStorage.setItem('seenDesktopAppNotice', 'true');

    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      setActiveModal('tutorial');
    } else {
      setActiveModal(null);
    }
  };

  const handleCloseTutorial = () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    setActiveModal(null);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <main className="max-w-4xl mx-auto px-4 py-8">
              <DesktopAppBanner />
              <ToastContainer position="top-right" autoClose={3000} />

              {activeModal === 'welcome' && <WelcomeModal onClose={handleCloseWelcome} />}
              {activeModal === 'desktop' && <NoticeUpdate onClose={handleCloseNoticeUpdate} />}
              {activeModal === 'tutorial' && <TutorialModal onClose={handleCloseTutorial} />}

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
