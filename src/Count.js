import React from 'react'

export const Count = (props) => {
    console.log(props);
    let success = []

    return (
        <div>
           {props === 'success' ? success.push('s') : null}
           {success}
        </div>
    )
}
