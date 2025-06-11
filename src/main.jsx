import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AppContextProvider } from './AppContext/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/appointment/'>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>,
)
