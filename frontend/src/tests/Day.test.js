import ReactDOM from 'react-dom';
import Day from '../components/location/Day';

it('Day component renders without crashing', () => {
    const div = document.createElement('div');
    const dayObj = {
        date: '2022-02-22',
        symbol: 'd000',
        minTemp: 1,
        maxTemp: 7
    }
    ReactDOM.render(<Day day={dayObj}/>, div);
});