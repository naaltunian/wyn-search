import React, { useState, useContext, useReducer } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import UserContext from '../../Contexts/UserContext'
import { CREATE_USER } from '../../GraphQL/index'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import Copyright from './Copyright'
import useStyles from './FormStyles'

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  githubUsername: ''
}

const SignUp = () => {
  const classes = useStyles()
  const [user, setUser] = useState(INITIAL_STATE)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [createUser, { data: mutationData }] = useMutation(CREATE_USER)
  const { dispatch } = useContext(UserContext)
  let history = useHistory()

  const handleInputChange = field => e =>
    setUser({ ...user, [field]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    let { data } = await createUser({ variables: { userInput: user } })
    await localStorage.setItem('token', data.createUser)
    dispatch({ type: 'LOGIN' })
    history.push('/profile')
  }

  // password confirmation field
  const handleConfirmChange = e => {
    setConfirmPassword(e.target.value)
  }

  // client-side form validation

  const isInvalid =
    !user.name ||
    !user.email ||
    !user.password ||
    user.password !== confirmPassword ||
    !user.githubUsername

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            autoComplete="name"
            name="name"
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            autoFocus
            value={user.name}
            onChange={handleInputChange('name')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={user.email}
            onChange={handleInputChange('email')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={user.password}
            onChange={handleInputChange('password')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={e => handleConfirmChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="github"
            label="Github"
            type="github"
            id="github"
            autoComplete="current-github"
            value={user.githubUsername}
            onChange={handleInputChange('githubUsername')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isInvalid}
          >
            Sign Up
          </Button>
          <Link href="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default SignUp
