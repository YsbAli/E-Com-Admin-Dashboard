import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { toast } from "react-toastify";

const Navbar = () => {
  //if user login or there is usersdata in localstorage then hide the signUp pages
  const isAuth = localStorage.getItem("usersdata");
  const userName = JSON.parse(isAuth);
  const navigate = useNavigate();

  const Logout = () => {
    confirm("Are you sure?");
    localStorage.clear();
    toast.warning("Your are logged out !", {
      position: toast.POSITION.TOP_CENTER,
    });
    navigate("/signup");
  };

  return (
    <div>
      <img
        className="logo"
        src="https://www.grambahar.com/grambahar_logo.ico"
        alt="logo"
      />
      {isAuth ? (
        <ul className="nav-ul">
          <li>
            {" "}
            <Link to="/">Products</Link>{" "}
          </li>
          <li>
            <Link to="/add-products">Add Products</Link>
          </li>
          <li>
            <Link to="/update-products">Update Products</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={Logout} to="/signup">
              {" "}
              Logout ({userName.name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            {" "}
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            {" "}
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
