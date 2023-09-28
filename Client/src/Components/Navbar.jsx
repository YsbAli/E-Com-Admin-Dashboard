import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { toast } from "react-toastify";

const Navbar = () => {
  //if user login or there is usersdata in localstorage then hide the signUp pages
  const isAuth = localStorage.getItem("usersdata");
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    toast.warning("Your are logged out !", {
      position: toast.POSITION.TOP_CENTER,
    });
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

        {/* <li>
          {isAuth ? (
            <Link onClick={Logout} to="/signup">
              Logout
            </Link>
          ) : (
            <Link to="/signup">SignUp</Link>
          )}
        </li> */}

        {/* {
          isAuth ? <li><Link onClick={Logout} to="/signup"> Logout</Link> <li> :  <>
          <li> <Link to="/signup">SignUp</Link></li>
          <li><Link to="/login">Login</Link></li>
          </>

        }    */}
        {/* <Link to="/login">Login</Link> */}

        {isAuth ? (
          <li>
            <Link onClick={Logout} to="/signup">
              LogOut
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
