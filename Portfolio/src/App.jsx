import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ServicesPage from './pages/ServicesPage'
import WorkPage from './pages/WorkPage' 
import HomePage from './pages/HomePage'

export default function App() {
    return (
        <>
           <BrowserRouter>
           <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/services' element={<ServicesPage />} />
              <Route path='/work' element={<WorkPage />} />
           </Routes>
           </BrowserRouter>
        </>
    )
}