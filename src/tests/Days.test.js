import ReactDOM from 'react-dom';
import Days from '../components/location/Days';

it('Days component renders without crashing', () => {
    const div = document.createElement('div');
    const daysArray = [{
        date: '2022-02-22',
        symbol: 'd000',
        minTemp: 1,
        maxTemp: 7
    }]
    ReactDOM.render(<Days days={daysArray}/>, div);
});