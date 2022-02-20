import React from 'react'
import '../../assets/weather-icons/d000.png'

const Day = ({ day }) => {

  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

  return (
    <div className='dayCard'>
      <div>{dayNames[new Date(day.date).getDay()].slice(0, 3)}</div>
      <img src={require(`../../assets/weather-icons/${day.symbol}.png`)}/>
      <div className='day-min-max'>
        <div>{day.minTemp}°</div>
        <div>{day.maxTemp}°</div>
      </div>
    </div>
  )
}

export default Day