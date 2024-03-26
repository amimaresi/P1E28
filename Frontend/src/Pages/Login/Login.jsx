import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleRememberChange = () => {
    setRemember(!remember);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5173/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        remember: remember,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Login successful");
        } else {
          console.log("Login failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);

      })
  };

  return (
    <div className='relative h-screen'>
      <form
        onSubmit={handleSubmit} // Added form submit handler
        className='absolute top-[10vw] left-[10vw] bg-white border-solid border-[0.1vw] border-buttonDark flex flex-col justify-between items-start p-[4vw] gap-[2vw] shadow-xl'>
        <h1 className='font-title font-semibold m-0 text-[2vw]'>LOGIN</h1>
        <label htmlFor='Email/username'>
          <h3 className='font-title font-medium mb-[0.5vw] text-[1vw]'>Email</h3>
          <input
            value={email} // Controlled input with value and onChange
            onChange={handleEmailChange}
            className='text-[1vw] rounded-t-sm transition-colors w-[20vw] h-[2vw] border-0 border-b-[0.105vw] border-solid border-b-textDark focus:outline-none active:outline-none focus:bg-background'
            type='email'
            placeholder="Enter email"
          />
        </label>

        <label htmlFor='password'>
          <h3 className='font-title font-medium mb-[0.5vw] font-1 text-[1vw]'>Password</h3>
          <input
            value={password} // Controlled input with value and onChange
            onChange={handlePasswordChange}
            type='password'
            placeholder="Enter password"
            className='text-[1vw] rounded-t-sm transition-colors w-[20vw] h-[2vw] border-0 border-b-[0.105vw] border-solid border-b-textDark focus:outline-none active:outline-none focus:bg-background'
          />

        </label>
        <div className='flex flex-row items-center justify-between w-[20vw]'>
          <label htmlFor='remember' className='flex flex-row items-start justify-start gap-1'>
            <input
              type='checkbox'
              className='w-[1vw] h-[1vw] accent-textDark'
              checked={remember}
              onChange={handleRememberChange}
            />
            <h3 className='font-title font-medium m-[0vw] text-[1.1vw] placeholder'>Remember me</h3>
          </label>
          <NavLink to='resetpassword' className='font-title font-medium text-buttonLight active:text-buttonDark no-underline m-0 text-[1vw]'>Forgot password ?</NavLink>

        </div>


        <button
          type="submit" // Added type for button
          className='bg-buttonLight active:opacity-95 text-textLight w-[20.2vw] rounded-sm border-0 font-medium font-title text-[1.1vw] py-[0.65vw]'>
          LOGIN
        </button>
      </form>
    </div>
  );
}
