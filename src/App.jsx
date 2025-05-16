import Header from './components/Header';
import Card from './components/Card';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <main>
        <ToastContainer position="top-right" autoClose={3000} />
        <Header />
        <Card />
      </main>
    </>
  );
}

export default App;
