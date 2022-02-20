import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Location.scss';

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