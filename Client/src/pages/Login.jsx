import { useState, useEffect } from "react";
import "../Components/Navbar.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  // this is for removing login button
  useEffect(() => {
    const isAuth = localStorage.getItem("usersdata");
    if (isAuth) {
      navigate("/");
    }
  }, []);

  const HandleLogin = async () => {
    console.log(email, password);

    const result = await fetch("http://localhost:5002/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await result.json();
    console.log(data);

    if (data.name) {
      localStorage.setItem("usersdata", JSON.stringify(data));
      alert("Successfully logged in");
      navigate("/");
    } else {
      alert("Wrong email or password");
    }
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
