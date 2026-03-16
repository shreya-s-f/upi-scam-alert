import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Check from './pages/Check'
import Report from './pages/Report'
import Feed from './pages/Feed'

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/check"   element={<Check />} />
          <Route path="/report"  element={<Report />} />
          <Route path="/feed"    element={<Feed />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
