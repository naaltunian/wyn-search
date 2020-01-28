import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  avatar: {
    margin: theme.spacing(1),
    height: "150px",
    width: "150px"
  },
  icon: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  }
}))

function getModalStyle() {
  const top = 50
  const left = 50
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

export default function SimpleModal( { id, photoUrl } ) {
  const classes = useStyles()
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle)
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const uploadPhoto = async (e) => {
    let formData = new FormData();
    formData.append("photo", e.target.files[0]);
    let data = await fetch(`http://localhost:5000/upload/profile-pic/${id}`, {
      method: 'POST',
      body: formData
    });
    // setOpen(false);
  }
  return (
    <div>
      <Avatar className={photoUrl ? classes.avatar : classes.icon} src={photoUrl} onClick={handleOpen} alt="user profile picture">
        <AccountBoxIcon className={classes.icon} />
      </Avatar> 
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h3>Upload Profile Pic</h3>
          <input
            accept="image/*"
            onChange={uploadPhoto}
            type="file"
          />
        </div>
      </Modal>
    </div>
  )
}
