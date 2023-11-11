import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useBearStore from "./useBearStore";

function Nav() {
  const navigateTo = useNavigate();
  const { isLoggedIn, setIsLoggedIn, isAdmin } = useBearStore();

  const logoutHandler = () => {
    // Clear the JWT from localStorage
    localStorage.removeItem("projectX");
    setIsLoggedIn(false);
    navigateTo(`/home`); // Redirect to the home after logout
  };

  return (
    <>
      <nav>
        <img src={logo} alt="Logo" />
        <h1>The Odin Blog</h1>
        <div className="menuLinks">
          <Link to="/home">
            <span>Home</span>
          </Link>
          {isLoggedIn === false ? (
            <>
              <Link to="/signup">
                <span>Sign Up</span>
              </Link>
              <Link to="/login">
                <span>Login</span>
              </Link>
            </>
          ) : isAdmin ? (
            <>
              <Link to="/users">
                <span>Users</span>
              </Link>
              <Link to="/create-blog">
                <span>Create Blog</span>
              </Link>
              <Link to="/profile/:id">
                <span>Profile</span>
              </Link>
              <span onClick={logoutHandler}>
                <a href="">Logout</a>
              </span>
            </>
          ) : (
            <>
              <Link to="/profile/:id">
                <span>Profile</span>
              </Link>
              <span onClick={logoutHandler}>
                <a href="">Logout</a>
              </span>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Nav;
