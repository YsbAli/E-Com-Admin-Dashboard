import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const HandleCollectData = async () => {
    console.log(name, email, password);
    const data = await fetch("http://localhost:5002/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const userdata = await data.json();

    //saving data into local storage
    localStorage.setItem("usersdata", JSON.stringify(userdata));

    navigate("/");
    return userdata;
  };

  const HandleName = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="input-box"
        type="text"
        onChange={HandleName}
        placeholder="Enter Your Name"
      />
      <input
        className="input-box"
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Enter Email"
      />
      <input
        className="input-box"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Enter Password"
      />
      <button onClick={HandleCollectData} className="btn" type="button">
        {" "}
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
