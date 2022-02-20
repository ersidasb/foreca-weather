import React from 'react'
import Location from './Location.js'

const Locations = ({ locations }) => {

    return (
        <div className='locationCard-wrapper'>
            {locations.map((loc) => (
                <Location key={loc.id} id={loc.id} name={loc.name} country={loc.country}/>
            ))}
        </div>
    )
}

export default Locations