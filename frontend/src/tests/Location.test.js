import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Location from '../components/Location';

it('Location component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MemoryRouter>
            <Location id={123} name={'Amsterdam'} country={'Netherlands'}/>
        </MemoryRouter>, div
    );
});