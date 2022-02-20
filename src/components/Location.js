import React from 'react'
import { Link } from 'react-router-dom'

const Location = ({id, name, country}) => {
    return (
        <>
            <Link to={`/location/${id}`} className="locationCard">
                <div className="locationCard-content">
                    <h3>{name}</h3>
                    <p>{country}</p>
                </div>
            </Link>
        </>
    )
}

export default Location