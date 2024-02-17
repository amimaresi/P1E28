import React, { useState } from 'react'
import './App.css'
import submitToApi from 'backend.js'
export default function Form() {
    const [formData, setFormData] = React.useState(
        {
            Email: "", 
            password: "", 
        }
    )
    
    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        submitToApi(formData)
        console.log(formData)
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                onChange={handleChange}
                name="firstName"
                value={formData.firstName}
                className='input-8'
            />
            <input
                type="password"
                placeholder="Password"
                onChange={handleChange}
                name="lastName"
                value={formData.lastName}
                className='input-8'
            />
            <button className='button-8'>Submit</button>
        </form>
    )
}

