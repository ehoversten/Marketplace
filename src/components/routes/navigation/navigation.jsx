import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

const Navigation = () => {
    return (
      <Fragment>
        <div className="navbar">
            <Link className="logo-container" to="/">
                <div>Logo</div>
            </Link>
            <div className="links-container">
                <Link className="nav-link" to="/home">Home</Link>
            </div>
          <h2>Navigation Bar</h2>
        </div>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation;