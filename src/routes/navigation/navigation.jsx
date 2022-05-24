import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from "../../components/cart-icon/cart-icon";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase";

import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser, /* setCurrentUser */ } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  // const signOutHandler = async () => {
  //   const res = await signOutUser();
  //   console.log(res);
  //   setCurrentUser(null);
  // }

  return (
    <Fragment>
      <div className="navigation">
          <Link className="logo-container" to="/">
              <Logo className="logo"/>
          </Link>
          <div className="nav-links-container">
              {/* <Link className="nav-link" to="/home">Home</Link> */}
              <Link className="nav-link" to="/shop">Shop</Link>
              {currentUser ? (
                  <span className="nav-link" onClick={signOutUser}>Sign Out</span>
                ) : (
                  <Fragment>
                    <Link className="nav-link" to="/sign-in">Sign In</Link>
                    <Link className="nav-link" to="/register">Sign Up</Link>
                  </Fragment>
                )}
                <CartIcon />
          </div>
          {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  )
}

  export default Navigation;