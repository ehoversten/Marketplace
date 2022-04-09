import { Fragment } from "react";
import { signInWithGooglePopup } from "../../utils/firebase/firebase";

const SignIn = () => {

    const logGoogleUser = async () => {
        const res = await signInWithGooglePopup();
        console.log(res);
    }

    return (
        <Fragment>
            <div>
                <h2>Sign In Component</h2>
                <button className="btn btn-primary" onClick={logGoogleUser}>Sign In with Google</button>
            </div>
        </Fragment>
    )
}

export default SignIn;