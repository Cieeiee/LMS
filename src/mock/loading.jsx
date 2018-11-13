import React from 'react'

const loading = require('../images/loading.gif')

export default function Loading(props) {
    return (
        <div className="flex-col grow">
            <div style={{margin: "auto auto auto auto"}}>
                <img src={loading} alt="" height='20px'/>
            </div>
        </div>
    )
}