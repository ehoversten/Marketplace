import { confirmPasswordReset } from "@firebase/auth";
import { Fragment, useState, useContext } from "react";
import { createUserWithEmailAndPassword } from "../../utils/firebase/firebase";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase";
import FormInput from "../../components/form-input/form-input.component";
import Button from '../../components/button/button.component';

import { UserContext } from "../../contexts/user.context";

import './auth.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Register = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    console.log(formFields);

    const resetFormFileds = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            // const response = await createAuthUserWithEmailAndPassword(email, password);
            // console.log("Response from handleSubmit function in Register Component");
            // console.log(response);

            console.log(user);
            setCurrentUser(user);
            
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFileds();
        } catch(error) {
            console.log("user creation encountered an error", error)
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot create User, email already in use');
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <Fragment>
            <div className="auth-container">
                <h2>Register as a New User</h2>
                <form onSubmit={handleSubmit}>
                    <FormInput 
                        label="Display Name"
                        type="text"
                        onChange={handleChange}
                        name="displayName"
                        value={displayName}
                    />

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

                    <FormInput 
                        label="Confirm Password"
                        type="password"
                        onChange={handleChange}
                        name="confirmPassword"
                        value={confirmPassword}
                    />

                    <Button type="submit">Sign Up</Button>
                </form>
            </div>
        </Fragment>
    )
}

export default Register;