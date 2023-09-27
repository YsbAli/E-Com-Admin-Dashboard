import { useState } from "react";
import "../Components/Navbar.css";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const HandleLogin = () => {
    console.log(email, password);
  };

  return (
    <div className="register">
      <h1>Login</h1>
      <input
        className="input-box"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Enter Email"
      />
      <input
        className="input-box"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Enter Password"
      />
      <button onClick={HandleLogin} className="btn" type="button">
        Login
      </button>
    </div>
  );
}

export default Login;
