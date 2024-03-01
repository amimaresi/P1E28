import React from 'react'
import './Login.css'
import emailImg from './email.svg'
import passwordImg from './password.svg'
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
        <form className='form' onSubmit={LoginCheck}>
            <h1>Login</h1>
            <label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                <img src={emailImg} />
            </label>
            <label >
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <img src={passwordImg} />

            </label>

            {error.on && <p>error : {error.reason}</p>}

            <button type="submit">Login</button>

        </form>
    )
}