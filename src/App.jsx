import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Layout
import Header from './components/shared/Header'
import Footer from './components/shared/Footer'

// Pages
import Home from './pages/Home'
import Influencers from './pages/Influencers'
import About from './pages/About'
import Terms from './pages/Terms'
import Auth from './pages/Auth'

export default function App() {
  return (
    <Router>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <div className="min-h-screen flex flex-col bg-cream-white">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/influencers" element={<Influencers />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/auth/login" element={<Auth />} />
            <Route path="/auth/signup" element={<Auth />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
