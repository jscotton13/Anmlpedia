import './App.css'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import RoutesComponent from './components/RoutingComponent'
import {SpeciesProvider} from './components/Species/speciesComponent'
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
