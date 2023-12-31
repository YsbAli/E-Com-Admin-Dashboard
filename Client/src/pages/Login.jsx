import { useState, useEffect } from "react";
import "../Components/Navbar.css";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  // this is for removing login button
  useEffect(() => {
    const isAuth = localStorage.getItem("usersdata");
    if (isAuth) {
      navigate("/");
    }
  }, []);

  const HandleLogin = async () => {
    if (!email || !password) {
      setError(true);
      return false;
    }

    const result = await fetch("http://localhost:5002/api/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await result.json();
    // console.log(data);

    // if (data.name) {
    //   localStorage.setItem("usersdata", JSON.stringify(data));
    //   toast.success("Successfully logged in", {
    //     postion: toast.POSITION.TOP_CENTER,
    //   });
    //   navigate("/");
    // } else {
    //   toast.error("Wrong email or password", {
    //     position: toast.POSITION.TOP_CENTER,
    //   });
    // }

    if (data.authToken) {
      localStorage.setItem("usersdata", JSON.stringify(data.user));
      localStorage.setItem("AuthToken", JSON.stringify(data.authToken));
      toast.success("Successfully logged in", {
        postion: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    } else {
      toast.error("Wrong email or password", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="main">
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
      {error && !email && (
        <span className="input-invallid">Enter valid email</span>
      )}
      <input
        className="input-box"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Enter Password"
      />
      {error && !password && (
        <span className="input-invallid">Enter valid password</span>
      )}

      <button onClick={HandleLogin} className="btn" type="button">
        Login
      </button>
    </div>
  );
}

export default Login;
