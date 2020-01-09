import React, { useState, useContext, useReducer } from 'react';
import UserContext from '../../Contexts/UserContext';
import { CREATE_USER } from '../../GraphQL/index';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

const INITIAL_STATE = {
    name: "",
    email: "",
    password: "",
    githubUsername: ""
}

const SignUp = () => {

    const [user, setUser] = useState(INITIAL_STATE);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [createUser, {data: mutationData}] = useMutation(CREATE_USER);
    const { dispatch} = useContext(UserContext);
    let history = useHistory();

    const handleInputChange = field => e => setUser({ ...user, [field]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        let { data } = await createUser({ variables: { userInput: user }});
        await localStorage.setItem('token', data.createUser);
        dispatch({type: "LOGIN"});
        history.push('/profile');
    };

    // password confirmation field
    const handleConfirmChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    // client-side form validation

    const isInvalid = !user.name || !user.email || !user.password || user.password !== confirmPassword || !user.githubUsername;

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={user.name} placeholder="name" onChange={handleInputChange("name")} />
            <input type="text" name="email" value={user.email} placeholder="email" onChange={handleInputChange("email")} />
            <input type="password" name="password" value={user.password} placeholder="password" onChange={handleInputChange("password")} />
            <input type="password" name="confirmPassword" value={confirmPassword} placeholder="confirm password" onChange={e => handleConfirmChange(e)} />
            <input type="text" name="githubUsername" value={user.githubUsername} placeholder="github username" onChange={handleInputChange("githubUsername")} />

            <input type="submit" value="Submit" disabled={isInvalid} />
        </form>
    )
}

export default SignUp;
