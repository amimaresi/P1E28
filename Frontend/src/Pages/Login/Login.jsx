import { useState } from 'react';
import { NavLink, useOutletContext } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const context = useOutletContext();
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
    console.log(context);
    context.setIsLogged.setIsLogged(true);
  };

  return (
    <div className="relative h-screen">
      <form
        onSubmit={handleSubmit} // Added form submit handler
        className="absolute left-[10vw] top-[10vw] flex flex-col items-start justify-between gap-[2vw] border-[0.1vw] border-solid border-buttonDark bg-white p-[4vw] shadow-xl"
      >
        <h1 className="m-0 font-title text-[2vw] font-semibold">LOGIN</h1>
        <label htmlFor="Email/username">
          <h3 className="mb-[0.5vw] font-title text-[1vw] font-medium">
            Email
          </h3>
          <input
            value={email} // Controlled input with value and onChange
            onChange={handleEmailChange}
            className="h-[2vw] w-[20vw] rounded-t-sm border-0 border-b-[0.105vw] border-solid border-b-textDark text-[1vw] transition-colors focus:bg-background focus:outline-none active:outline-none"
            type="email"
            placeholder="Enter email"
          />
        </label>

        <label htmlFor="password">
          <h3 className="font-1 mb-[0.5vw] font-title text-[1vw] font-medium">
            Password
          </h3>
          <input
            value={password} // Controlled input with value and onChange
            onChange={handlePasswordChange}
            type="password"
            placeholder="Enter password"
            className="h-[2vw] w-[20vw] rounded-t-sm border-0 border-b-[0.105vw] border-solid border-b-textDark text-[1vw] transition-colors focus:bg-background focus:outline-none active:outline-none"
          />
        </label>
        <div className="flex w-[20vw] flex-row items-center justify-between">
          <label
            htmlFor="remember"
            className="flex flex-row items-start justify-start gap-1"
          >
            <input
              type="checkbox"
              className="h-[1vw] w-[1vw] accent-textDark"
              checked={remember}
              onChange={handleRememberChange}
            />
            <h3 className="placeholder m-[0vw] font-title text-[1.1vw] font-medium">
              Remember me
            </h3>
          </label>
          <NavLink
            to="resetpassword"
            className="m-0 font-title text-[1vw] font-medium text-buttonLight no-underline active:text-buttonDark"
          >
            Forgot password ?
          </NavLink>
        </div>

        <button
          type="submit" // Added type for button
          className="w-[20.2vw] rounded-sm border-0 bg-buttonLight py-[0.65vw] font-title text-[1.1vw] font-medium text-textLight active:opacity-95"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}
