import { Fragment, useState, useContext } from "react";
import './auth.styles.scss';
import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth, 
    signInAuthUserWithEmailAndPassword ,

} from "../../utils/firebase/firebase";

import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";

// import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignIn = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    // const { setCurrentUser } = useContext(UserContext);

    const resetFormFileds = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormFields({ ...formFields, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // const response = await signInAuthUserWithEmailAndPassword(email, password);
            // console.log(response);

            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            // console.log(user);
            // setCurrentUser(user);

            resetFormFileds();

            // Redirect to Shop
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('invalid credentials');
                    break;
                case 'auth/user-not-found': 
                    alert('invalid user');
                    break;
                default: 
                    console.log(error);
            }
        }
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        // setCurrentUser(user);
        createUserDocumentFromAuth(user);

        // Redirect to Shop
    }

    return (
        <Fragment>
            <div className="auth-container">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <FormInput 
                        label="Email"
                        type="email"
                        onChange={handleChange}
                        name="email"
                        value={email}   
                    />

                    <FormInput 
                        label="Password"
                        type="password"
                        onChange={handleChange}
                        name="password"
                        value={password}   
                    />
                </form>

                <div className="buttons-container">
                    <Button onClick={handleSubmit}>Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Sign In with Google</Button>
                </div>
            </div>
        </Fragment>
    )
}

export default SignIn;