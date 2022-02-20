import React from 'react'
import { useParams } from 'react-router-dom'
import Days from './Days'
import axios from 'axios'
import { useState, useEffect } from 'react'

const LocationForecast = () => {
    //location id
    const id = useParams().id
    //location information
    const [location, setLocation] = useState('')
    //location exists
    const [exists, setExists] = useState()
    //location current forecast
    const [current, setCurrent] = useState()
    //location 7 days forecast
    const [days, setDays] = useState([])

    const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

    //gets location information
    //sets exists to true or false depending if such location exists
    const fetchLocationInfo = () => {
        axios.get('http://localhost:5000/getLocationInfo/?id=' + id)
        .then(res => {
            //location found
            if(res.data !== "not found") {
                setExists(true)
            }
            else {
                setExists(false)
            }
            setLocation(res.data)
        }).catch(err => {
            console.log(err)
            setExists(false)
        })
    }

    //gets location current forecast
    const fetchLocationCurrent = () => {
        axios.get('http://localhost:5000/getCurrent/?id=' + id)
        .then(res => {
            setCurrent(res.data.current)
        }).catch(err => {
            console.log(err)
        })
    }

    //gets location 7 days forecast
    const fetchLocationDays = () => {
        axios.get('http://localhost:5000/getDaily/?id=' + id)
        .then(res => {
            res.data.forecast.shift()
            setDays(res.data.forecast)
        }).catch(err => {
            console.log(err)
        })
    }

    //on render
    useEffect(() => {
        //gets location info
        fetchLocationInfo()
    }, [])

    //on exists change
    useEffect(() => {
        const getData = async () => {
            //if location exists gets current forcast and 7 days forecast
            if(exists) {
                await fetchLocationCurrent()
                await fetchLocationDays()
            }
        }
        getData()
    }, [exists])

    //on current change
    useEffect(() => {
        var currentdate = new Date(); 
        var datetime = currentdate.getFullYear() + "/"
                        + (currentdate.getMonth()+1)  + "/" 
                        + currentdate.getDate() + " @ "  
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getSeconds();
        //if current is not null posts userAction to mongodb
        if(current != null) {
            var userAction = {
                userActionType: 'locationForecast',
                locationID: id,
                locationName: location.name,
                temperature: current.temperature,
                humidity: current.relHumidity,
                windSpeed: current.windSpeed,
                precipitation: current.precipProb,
                time: datetime
            }
            axios.post('http://localhost:5000/postUserAction', userAction)
        }
    }, [current])

    if(exists == null)
        return (<div className='info-message'>Loading</div>)
    if(!exists)
        return (<div className='info-message'>Location doesn't exist</div>)
    if(current == null)
        return (<div className='info-message'>Loading</div>)
    return (
        <div className='forecast-container'>
            <div className='forecast-top-left'>
                <img className='forecast-image' src={require(`../../assets/weather-icons/${current.symbol}.png`)}/>
                <div className='temperature'>{current.temperature}°C</div>
                <ul className='detail-list-left'>
                    <li>Humidity: {current.relHumidity}%</li>
                    <li>Precipitation: {current.precipProb}%</li>
                    <li>Wind speed: {current.windSpeed}m/s</li>
                </ul>
            </div>
            <div className='forecast-top-right'>
                <ul className='detail-list-right'>
                    <li>{location.name}, {location.country}</li>
                    <li>{dayNames[new Date(current.time.split('T')[0]).getDay()]}</li>
                    <li>{current.symbolPhrase}</li>
                </ul>
            </div>
            <div className='forecast-bottom'>
                <Days days={days}/>
            </div>
        </div>
    )
}

export default LocationForecast