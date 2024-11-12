import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
<<<<<<< HEAD

import { BrowserRouter as Router } from 'react-router-dom'

=======
import { BrowserRouter as Router } from 'react-router-dom'
>>>>>>> 13386b38642e6b4d1d31fe5d405ea91408b04e6c

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
