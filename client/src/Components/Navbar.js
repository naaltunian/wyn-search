import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Navbar = () => {
    let history = useHistory();
    const logout = () => {
        localStorage.removeItem("token");
        history.push('/');
    }
    return(
        <>
            <Link to="/">Home</Link>
            <Link to="/signup">SignUp</Link>
            <Link to="/login">Login</Link>
            <button onClick={logout}>Logout</button>
        </>
    )
}

export default Navbar;