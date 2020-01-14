import React, { useState, useContext, useReducer } from 'react';
import UserContext from '../../Contexts/UserContext';
import { LOGIN } from '../../GraphQL/index';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

const INITIAL_STATE = {
    email: "",
    password: "",
}

const Login = ({ isAuth }) => {
    const message = useContext(UserContext)

    const [user, setUser] = useState(INITIAL_STATE);
    const [login, { data, error }] = useMutation(LOGIN, { variables: { email: user.email, password: user.password } });
    const { dispatch } = useContext(UserContext);
    let history = useHistory();

    const handleInputChange = field => e => setUser({ ...user, [field]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        let { data } = await login();
        await localStorage.setItem('token', data.login);
        dispatch({type: "LOGIN"});
        history.push('/');
    };

    const isInvalid = !user.email || !user.password;

    return(
        <>
            <div>
                {isAuth}
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" value={user.email} placeholder="email" onChange={handleInputChange("email")} />
                <input type="password" name="password" value={user.password} placeholder="password" onChange={handleInputChange("password")} />
                <input type="submit" value="Submit" disabled={isInvalid} />
            </form>
        </>
    )
}

export default Login;
