import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { Link, useHistory } from 'react-router-dom'
import UserContext from '../Contexts/UserContext'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const Navbar = ({ isAuth, client }) => (
  <nav>
    {isAuth ? <NavbarAuth isAuth={isAuth} client={client} /> : <NavbarUnAuth />}
  </nav>
)

const NavbarAuth = ({ isAuth, client }) => {
  const classes = useStyles()

  const { dispatch } = useContext(UserContext)
  let history = useHistory()

  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
    client.clearStore()
    history.push('/')
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>
        </Link>
        <Link to="/profile">Profile</Link>
        <p>Logged in: {String(isAuth)}</p>
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

const NavbarUnAuth = ({ isAuth, client }) => {
  const classes = useStyles()
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>
        </Link>
        <Link to="/signup">
          <Typography variant="h6" className={classes.title}>
            SignUp
          </Typography>
        </Link>
        <Link to="/login">
          <Typography variant="h6" className={classes.title}>
            Login
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
