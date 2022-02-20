import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min';
import LocationForecast from '../components/location/LocationForecast';

it('LocationForecast component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MemoryRouter initialEntries={['/location/1']}>
            <LocationForecast/>
        </MemoryRouter>, div
    );
});