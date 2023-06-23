import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <UserProvider>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </UserProvider>
    </HashRouter>
  </React.StrictMode>,
)
