import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import UserContext from '../../Contexts/UserContext';
import { LOGIN } from '../../GraphQL/index';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import Copyright from './Copyright';
import useFormStyles from '../../Styles/FormStyles';

const INITIAL_STATE = {
  email: '',
  password: ''
}

const Login = () => {
  const classes = useFormStyles()

  const [user, setUser] = useState(INITIAL_STATE)
  const [login, { data, error }] = useMutation(LOGIN, {
    variables: { email: user.email, password: user.password }
  })
  const { dispatch } = useContext(UserContext)
  let history = useHistory()

  const handleInputChange = field => e =>
    setUser({ ...user, [field]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    let { data } = await login()
    await localStorage.setItem('token', data.login)
    dispatch({ type: 'LOGIN' })
    history.push('/')
  }

  const isInvalid = !user.email || !user.password

  return (
    <Container component="main" maxWidth="xs" className={classes.paper}>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Login
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={user.email}
            onChange={handleInputChange('email')}
            />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={user.password}
            onChange={handleInputChange('password')}
            />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isInvalid}
            >
            Sign In
            </Button>
            <Grid container>
            <Grid item xs>
                <Link href="#" variant="body2">
                Forgot password?
                </Link>
            </Grid>
            <Grid item>
                <Link href="signup" variant="body2">
                Don't have an account? Sign Up
                </Link>
            </Grid>
            </Grid>
        </form>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default Login
