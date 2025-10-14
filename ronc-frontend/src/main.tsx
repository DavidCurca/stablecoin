import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './pages/App.tsx'
import Navbar from './pages/Navbar.tsx'
import Signup from './pages/Signup.tsx'
import Login from './pages/Login.tsx'
import Account from './pages/Account.tsx'
import Whitepaper from './pages/Whitepaper.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<App className='pt-32' />} />
        <Route path='/signup' element={<Signup className='pt-32' />} />
        <Route path='/login' element={<Login className='pt-32' />} />
        <Route path='/settings' element={<Account className='pt-32' />} />
        <Route path='/account' element={<Account className='pt-32' />} />
        <Route path='/whitepaper' element={<Whitepaper className='pt-32' />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
