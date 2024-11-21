import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css"
import AppRoutes from './routes/AppRoutes'
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer'
import { useLocation } from 'react-router-dom'

import { Modal, Button, Form } from 'react-bootstrap'
import { useState, useContext } from 'react'

import LoginForm from './components/LoginForm/LoginForm'

const App = () => {

  const location = useLocation()

  const currentFamilyPath =
    location.pathname.startsWith('/cines') ? 'cines'
      :
      location.pathname.startsWith('/peliculas') ? 'peliculas'
        :
        location.pathname.startsWith('/datos') ? 'datos'
          :
          null

  const [showModal, setShowModal] = useState(false)


  return (


    <div className='App'>

      <Navigation currentFamilyPath={currentFamilyPath} setShowModal={setShowModal} />

      <AppRoutes currentFamilyPath={currentFamilyPath} />

      <Footer currentFamilyPath={currentFamilyPath} />

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm setShowModal={setShowModal} />
        </Modal.Body>
      </Modal >

    </div>

  )
}

export default App
