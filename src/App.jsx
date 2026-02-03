import { Routes, Route } from 'react-router-dom'
import { ChatProvider } from './context/ChatContext'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import PopupOnLoad from './components/PopupOnLoad'
import Home from './pages/Home'
import PoliticaPrivacidade from './pages/PoliticaPrivacidade'
import TermosUso from './pages/TermosUso'
import CurriculoVeterinario from './pages/CurriculoVeterinario'
import OrientacaoConsultoria from './pages/OrientacaoConsultoria'
import SuporteContinuo from './pages/SuporteContinuo'
import GaleriaCanil from './pages/GaleriaCanil'
import TodosDepoimentos from './pages/TodosDepoimentos'

export default function App() {
  return (
    <LanguageProvider>
      <ChatProvider>
        <div className="min-h-screen bg-black text-white">
          <PopupOnLoad />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/termos-uso" element={<TermosUso />} />
            <Route path="/curriculo-veterinario" element={<CurriculoVeterinario />} />
            <Route path="/orientacao-consultoria" element={<OrientacaoConsultoria />} />
            <Route path="/suporte-continuo" element={<SuporteContinuo />} />
            <Route path="/galeria-canil" element={<GaleriaCanil />} />
            <Route path="/depoimentos" element={<TodosDepoimentos />} />
          </Routes>
          <Footer />
          <ChatWidget />
        </div>
      </ChatProvider>
    </LanguageProvider>
  )
}
