import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css"
import AppRoutes from './routes/AppRoutes'
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer'

import { useLocation } from 'react-router-dom'


const App = () => {

  const location = useLocation()

  const currentFamilyPath =
    location.pathname.startsWith('/cines') ? 'cines'
      :
      location.pathname.startsWith('/peliculas') ? 'peliculas'
        :
        null

  return (


    <div className='App'>

      <Navigation currentFamilyPath={currentFamilyPath} />

      <AppRoutes currentFamilyPath={currentFamilyPath} />

      <Footer currentFamilyPath={currentFamilyPath} />

    </div>

  )
}

export default App
