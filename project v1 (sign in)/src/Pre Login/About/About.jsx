import React from 'react'
import './About.css'

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState({ on: false, reason: '' });
    const [user, setUser] = React.useState(null);


    const LoginCheck = (e) => {
        e.preventDefault()
        fetch('/login')
            .then(res => res.json())
            .then(user => { setUser(user); console.log(user) })
    }
    return (
        <div className="login"><h1>About</h1>
        </div>
    )
}