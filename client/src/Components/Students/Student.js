import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'

import { GET_USER } from '../../GraphQL/index'
import { useQuery } from '@apollo/react-hooks'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 800
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(1),
    height: '100px',
    width: '100px',
    backgroundColor: theme.palette.secondary.main
  },
  icon: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  },
  chip: {
    margin: theme.spacing.unit / 2
  }
}))

const Student = props => {
  const classes = useStyles()

  //fake data for styles
  const chipData = ['Angular', 'jQuery', 'Polymer', 'React', 'Vue.js']

  const id = props.location.state.id
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { _id: id }
  })

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  const user = data.getUser
  return (
    <Container component="main" maxWidth="md" className={classes.paper}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Box className={classes.title}>
              <Avatar
                className={user.photoUrl ? classes.avatar : classes.icon}
                src={user.photoUrl}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Typography gutterBottom variant="h3" component="h2">
                {user.name}
              </Typography>
            </Box>
            <Typography gutterBottom variant="h5" component="h2">
              Email: {user.email}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              <a href={`https://github.com/${user.githubUsername}`} rel="noopener" target="_blank">Check out my github profile!</a>
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Personal site: {user.personalSite}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              LinkedIn: <a href={user.linkedIn} rel="noopener" target="_blank">{user.linkedIn}</a>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {user.bio}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {chipData.map((skill, i) => {
            return (
              <Chip
                key={i + user.id + 'skill'}
                label={skill}
                clickable
                color="primary"
                className={classes.chip}
              />
            )
          })}
        </CardActions>
      </Card>
    </Container>
  )
}

export default Student
