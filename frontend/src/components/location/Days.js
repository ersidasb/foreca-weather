import React from 'react'
import Day from './Day'

const Days = ({ days }) => {
  return (
      <>
        {days.map((day, index) => (
            <Day key={index} day={day}/>
        ))}
      </>
  )
}

export default Days