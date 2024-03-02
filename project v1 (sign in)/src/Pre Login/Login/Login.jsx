import React from 'react'
import './Login.css'
import emailImg from './email.svg'
import passwordImg from './password.svg'
import noPasswordImg from './noPassword.svg'
import errorImg from './error.svg'
import { NavLink } from 'react-router-dom'
export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState({ on: false, reason: 'no error' });
    const [user, setUser] = React.useState(null);
    const [show, setShow] = React.useState(false)

    const LoginCheck = (e) => {
        e.preventDefault()
        //fetch user data  to '/api/v1/auth/login' and get the res:{user_info ,isError:bool reason:string}: 
        //      then SetError({on: isError  ,reason: res.reason})
        //      setUser(user_info)
        //      error.on ?   show error message     :    redirect to dashboard with useNavigate() && save user state with useOutletcontext 
    }
    return (
        <form className='form' onSubmit={LoginCheck}>
            <h1>Login</h1>
            <label>
                <h2>Email</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                <img onClick={(e) => e.preventDefault()} src={emailImg} />
            </label>
            <label >

                <h2>Password</h2>
                <input
                    type={show ? 'text' : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <img
                    onClick={(e) => {
                        e.preventDefault();
                        setShow(!show)
                    }
                    }
                    src={show ? noPasswordImg : passwordImg} />

            </label>
            <div>
                <NavLink to='/resetpassword' className='forgot'>Forgot password ?</NavLink>
                <div className={`error  ${error.on ? 'isError' : 'noError'}`}>
                    <img onClick={(e) => e.preventDefault()} src={errorImg} />
                    Error : <span>{error.reason}</span>
                </div>
            </div>



            <button type="submit">Login</button>

        </form>
    )
}