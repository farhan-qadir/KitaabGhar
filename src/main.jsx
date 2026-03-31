import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import logo from './assets/logo.png'
import './index.css'

// Set favicon dynamically
const faviconLink = document.createElement('link')
faviconLink.rel = 'icon'
faviconLink.type = 'image/png'
faviconLink.href = logo
document.head.appendChild(faviconLink)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
