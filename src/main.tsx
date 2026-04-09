import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DataPage from './pages/DataPage.tsx'
import { TelegramProvider } from "./context/TelegramContext";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TelegramProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/data" element={<DataPage />} />
        </Routes>
      </BrowserRouter>
    </TelegramProvider>
  </StrictMode>
);