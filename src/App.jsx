import { useState } from 'react'
import Header from './components/Header';
import eldenRingImage from './assets/eldenring.png'



function App() {
  const [deaths, setDeaths] = useState(0)
  const [type, setType] = useState('card')
  const [theme, setTheme] = useState('default') 
  const increase = () => setDeaths(prev => prev + 1)
  const decrease = () => setDeaths(prev => (prev > 0 ? prev - 1 : 0))
  const themes = {
    default: {
      bg: 'bg-zinc-800',
      text: 'text-red-400'
    },
    elden: {
      bg: 'bg-yellow-950',
      text: 'text-yellow-300'
    },
    souls: {
      bg: 'bg-slate-800',
      text: 'text-sky-300'
    }
  }
   const currentTheme = themes[theme]

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
        <Header />

    <section className="flex flex-col md:flex-row justify-center gap-8 text-start">
        {/* card mortes/deaths */}    
        <div className={`${type === 'card' ? ` p-6 rounded-xl shadow-lg` : ''} w-full max-w-sm text-center`}>
        <h2 className="text-2xl font-semibold mb-4 text-white">Mortes</h2>
        <div className={`border-zinc-700 border mb-4 rounded-lg p-4 mb-6 ${currentTheme.bg}`}>
            <p className={`text-5xl font-bold ${currentTheme.text} mb-6 transition-transform duration-300`}>{deaths}</p>
        </div>

        <div className="flex gap-6 justify-center mb-6">
        <button onClick={decrease} className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-2xl px-5 py-3 rounded-lg transition-all duration-200flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0" aria-label="Diminuir contador/decrease counter">
            -
        </button>
        <button onClick={increase} className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-2xl px-5 py-3 rounded-md transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0" aria-label="Aumentar contador/increase counter">
            +
        </button>
            </div>
            <div className="text-start">
                <label className="text-zinc-400 pr-2">Tipo:</label>
                <select className='bg-zinc-700 text-zinc-400 rounded-lg p-2' value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="card">Card</option>
                    <option value="minimal">Minimalista</option>
                </select>
                <label className="text-zinc-400 pr-2 pl-2">Tema:</label>
                <select className='bg-zinc-700 text-zinc-400 rounded-lg p-2' value={theme} onChange={(e) => setTheme(e.target.value)}>
                    <option value="default">Padrão</option>
                    <option value="elden">Elden Ring</option>
                    <option value="souls">Dark Souls</option>
                </select>
            </div>
        </div>
        {/* Card de Troféus */}

        </section>
    </main>
  )
}

export default App
