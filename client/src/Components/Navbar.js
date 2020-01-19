import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'

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
  },
  navLink: {
    color: 'white',
    textDecoration: 'none'
  },
  profile: {
    color: '#242424',
    textDecoration: 'none'
  }
}));

const Navbar = ({ isAuth, client }) => (
  <nav>
    {isAuth ? <NavbarAuth isAuth={isAuth} client={client} /> : <NavbarUnAuth />}
  </nav>
)

const NavbarAuth = ({ isAuth, client }) => {
  const classes = useStyles()
  const [auth, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const { dispatch } = useContext(UserContext)
  let history = useHistory()

  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
    client.clearStore()
    history.push('/')
  }
  return (
      <AppBar position="static" className={classes.root}>
        <Toolbar>
            <Typography variant="h6" className={classes.title}>
                <Link to="/" className={classes.navLink}>
                Wyn-Search
                </Link>
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Button color="inherit">
                  <Link to="/profile" className={classes.profile}>
                    Profile
                  </Link>
                </Button>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              </MenuItem>
            </Menu>
        </Toolbar>
      </AppBar>
  )
}

const NavbarUnAuth = ({ isAuth, client }) => {
  const classes = useStyles()
  return (
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.navLink}>
              Wyn-Search
            </Link>
          </Typography>
          <Button color="inherit" className={classes.menuButton}>
            <Link to="/login" className={classes.navLink}>
              Login
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/signup" className={classes.navLink}>
              Sign Up
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
  )
}

export default Navbar
