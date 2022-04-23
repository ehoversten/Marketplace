import { confirmPasswordReset } from "@firebase/auth";
import { Fragment, useState } from "react";
import { createUserWithEmailAndPassword } from "../../utils/firebase";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Register = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

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
            
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFileds();
        } catch(error) {
            console.log("user creation encountered an error", error)
            if(error.code == 'auth/email-already-in-use') {
                alert('Cannot create User, email already in use');
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value });
    }

    return (
        <Fragment>
            <h2>Register as a New User</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" onChange={handleChange} name="displayName" value={displayName} required/>

                <label>Email</label>
                <input type="email" onChange={handleChange} name="email" value={email} required/>

                <label>Password</label>
                <input type="password" onChange={handleChange} name="password" value={password} required/>

                <label>Confirm Password</label>
                <input type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} required/>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </Fragment>
    )
}

export default Register;