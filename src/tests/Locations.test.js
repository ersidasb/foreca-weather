import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Locations from '../components/Locations';

it('Locations component renders without crashing', () => {
    const div = document.createElement('div');
    const locationsArray = [{
        id: 123,
        name: 'Amsterdam',
        country: 'Netherlands'
    }]
    ReactDOM.render(
        <MemoryRouter>
            <Locations locations={locationsArray}/>
        </MemoryRouter>
    , div);
});