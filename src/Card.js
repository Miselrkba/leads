import React from 'react'

export const Card = (props) => {
  
    return (
        <div className='container'>
            <div className='box'>
            <p>{props.name}</p>
            <p>{props.email}</p>
            <p>{props.phone}</p>
            </div>
        </div>
    )
}
