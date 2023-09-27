import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  //if user login or there is usersdata in localstorage then hide the signUp pages
  const isAuth = localStorage.getItem("usersdata");
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div>
      <ul className="nav-ul">
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/addproducs">Add Products</Link>
        </li>
        <li>
          <Link to="/updateproducts">Update Products</Link>
        </li>
        {/* <li>
          <Link to="/logout">Logout</Link>
        </li> */}
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          {isAuth ? (
            <Link onClick={Logout} to="/signup">
              Logout
            </Link>
          ) : (
            <Link to="/signup">SignUp</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
