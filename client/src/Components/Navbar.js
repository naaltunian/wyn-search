import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../Contexts/UserContext';

const Navbar = ({ isAuth, client }) => (
    <nav>
        { isAuth ? <NavbarAuth isAuth={isAuth} client={client} /> : <NavbarUnAuth /> }
    </nav>
)

const NavbarAuth = ({ isAuth, client }) => {
    const { dispatch } = useContext(UserContext);
    let history = useHistory();

    const logout = () => {
        localStorage.removeItem("token");
        dispatch({type: "LOGOUT"});
        client.clearStore();
        history.push('/');
    }
    return(
        <AppBar position="static">
            <Toolbar>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <p>Logged in: {String(isAuth)}</p>
                <button onClick={logout}>Logout</button>
            </Toolbar>
        </AppBar>
    )
}

const NavbarUnAuth = ({ isAuth, client }) => {
    
    return(
        <AppBar position="static">
            <Toolbar>
                <Link to="/">Home</Link>
                <Link to="/signup">SignUp</Link>
                <Link to="/login">Login</Link>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;