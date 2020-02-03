import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_CURRENT_USER, UPDATE_USER } from '../../GraphQL/index'
import { useHistory } from 'react-router-dom'
import useFormStyles from '../../Styles/FormStyles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import ImageModal from './ImageModal'

const Profile = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER)
  const INITIAL_STATE = {
    name: '',
    email: '',
    githubUsername: '',
    personalSite: '',
    linkedIn: '',
    bio: ''
  }

  let history = useHistory()
  const classes = useFormStyles()
  const [user, setUser] = useState(INITIAL_STATE)
  const [userId, setId] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [profileModal, setProfileModal] = useState(false)
  const [open, setOpen] = React.useState(false)
  const [updateUser, { data: mutationData }] = useMutation(UPDATE_USER, {
    variables: { _id: userId, userInput: user },
    refetchQueries: [{ query: GET_CURRENT_USER }]
  })

  useEffect(
    _ => {
      let currentUser
      let _id
      let photoUrlFromData
      if (data) currentUser = data.getCurrentUser
      if (data) _id = data.getCurrentUser._id
      if (data) photoUrlFromData = data.getCurrentUser.photoUrl
      data &&
        setUser({
          ...user,
          name: currentUser.name,
          email: currentUser.email,
          githubUsername: currentUser.githubUsername,
          bio: currentUser.bio ? currentUser.bio : "",
          personalSite: currentUser.personalSite ? currentUser.personalSite : "",
          linkedIn: currentUser.linkedIn ? currentUser.linkedIn : ""
          // photoUrl: currentUser.photoUrl ? currentUser.photoUrl : ""
        })
      data && setId(_id)
      data && setPhotoUrl(photoUrlFromData)
    },
    [data]
  )

  if (loading) return <div>Loading...</div>
  if (error) console.log(error)

  const handleInputChange = field => e =>
    setUser({
      ...user,
      [field]: e.target.value
    })

  const handleSubmit = async e => {
    e.preventDefault()
    let { data } = await updateUser()
    handleClickOpen()
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    history.push("/")
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.paper}>
      <ImageModal id={userId} photoUrl={photoUrl} handleInputChange={handleInputChange} />
      <Typography component="h1" variant="h5">
        Update Profile
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
          name="github"
          label="Github"
          type="github"
          id="github"
          autoComplete="current-github"
          value={user.githubUsername}
          onChange={handleInputChange('githubUsername')}
        />
        <TextField
          autoComplete="name"
          name="linkedIn"
          variant="outlined"
          margin="normal"
          fullWidth
          id="linkedIn"
          label="LinkedIn"
          autoFocus
          value={user.linkedIn}
          onChange={handleInputChange('linkedIn')}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="personalSite"
          label="Personal Site"
          type="personalSite"
          id="personalSite"
          autoComplete="personal-site"
          value={user.personalSite}
          onChange={handleInputChange('personalSite')}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          multiline
          rows="3"
          name="bio"
          label="Bio"
          type="bio"
          id="bio"
          autoComplete="bio"
          value={user.bio}
          onChange={handleInputChange('bio')}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Update Profile
        </Button>
      </form>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Profile Updated
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Profile
