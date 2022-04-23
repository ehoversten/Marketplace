import { Fragment, useState } from "react";
import './auth.styles.scss';
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase";
import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";


const defaultFormFields = {
    email: '',
    password: ''
}

const SignIn = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFileds = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormFields({ ...formFields, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        try {

        } catch(error) {
            console.log(error.message);
        }
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
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
                    <Button onSubmit={handleSubmit}>Sign In</Button>
                    <Button buttonType="google" onClick={signInWithGoogle}>Sign In with Google</Button>
                </div>
            </div>
        </Fragment>
    )
}

export default SignIn;