import './App.css'
import HeaderComponent from './components/UI/HeaderComponent'
import FooterComponent from './components/UI/FooterComponent'
import RoutesComponent from './components/RoutingComponent'
import {SpeciesProvider} from './components/Species/SpeciesComponent'
import {BrowserRouter} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <HeaderComponent/>
          <SpeciesProvider>
            <RoutesComponent/>
          </SpeciesProvider>
      <FooterComponent/>
    </BrowserRouter>
  )
}

export default App
