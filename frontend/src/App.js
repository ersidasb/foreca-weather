import Navbar from './components/Navbar';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Locations from './components/Locations.js'
import LocationForecast from './components/location/LocationForecast.js'

function App() {
  //locations list for rendering Locations component
  const [locations, setLocations] = useState([])
  //setter for locations, used to get locations from Navbar component
  const getLocations = (_locations) => {
    setLocations(_locations)
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar passLocations={getLocations} />
            <Locations locations={locations}/>
          </Route>
          <Route path="/location/:id">
            <Navbar passLocations={getLocations} />
            <LocationForecast />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
