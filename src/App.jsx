import Header from './components/Header';
import Card from './components/Card';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <main className="max-w-4xl mx-auto px-4 py-8">
        <ToastContainer position="top-right" autoClose={3000} />
        <Header />
        <Card />
      </main>
    </>
  );
}

export default App;
