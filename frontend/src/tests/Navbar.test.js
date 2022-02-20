import { Navbar } from 'react-bootstrap';
import ReactDOM from 'react-dom';

it('Navbar component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Navbar/>, div);
});