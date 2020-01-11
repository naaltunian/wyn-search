import React, { useContext } from 'react';
import { withApollo } from 'apollo-boost'
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../Contexts/UserContext';

const Navbar = ({ isAuth, client }) => {
    const { dispatch } = useContext(UserContext);
    let history = useHistory();
    const logout = () => {
        localStorage.removeItem("token");
        dispatch({type: "LOGOUT"});
        client.clearStore();
        history.push('/');
    }
    return(
        <>
            <Link to="/">Home</Link>
            <Link to="/signup">SignUp</Link>
            <Link to="/login">Login</Link>
            <Link to="/profile">Profile</Link>
            <p>{String(isAuth)}</p>
            <button onClick={logout}>Logout</button>
        </>
    )
}

export default Navbar;