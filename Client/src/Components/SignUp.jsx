import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

import { toast } from "react-toastify";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("usersdata");
    if (isAuth) {
      navigate("/");
    }
  }, []);

  const HandleCollectData = async () => {
    // console.log(name, email, password);
    if (!name || !email || !password) {
      setError(true);
      return false;
    }

    const data = await fetch("http://localhost:5002/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userdata = await data.json();

    //saving data into local storage
    localStorage.setItem("usersdata", JSON.stringify(userdata.userdata));
    localStorage.setItem("authToken", JSON.stringify(userdata.authToken));
    toast.success("Successfully Registered!", {
      position: toast.POSITION.TOP_CENTER,
    });
    navigate("/");
    return userdata;
  };

  const HandleName = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="main">
      <h1>Register</h1>
      <input
        className="input-box"
        type="text"
        onChange={HandleName}
        placeholder="Enter Your Name"
      />

      {error && !name && (
        <span className="input-invallid">Enter valid name</span>
      )}

      <input
        className="input-box"
        type="email"
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
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Enter Password"
      />
      {error && !password && (
        <span className="input-invallid">Enter valid password</span>
      )}
      <button onClick={HandleCollectData} className="btn" type="button">
        {" "}
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
