import Header from './components/Header';
import Card from './components/Card';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import WidgetViewer from './components/WidgetViewer';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <main className="max-w-4xl mx-auto px-4 py-8">
              <ToastContainer position="top-right" autoClose={3000} />
              <Header />
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