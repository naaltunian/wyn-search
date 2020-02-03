import React from 'react'
import defaultAvatar from '../../assets/defaultAvatar.png'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      minHeight: 350,
      maxHeight: 400
    },
    link: {
        textDecoration: "none"
    }
  });

const StudentPreview = ({ id, name, email, bio, github, skills, site, photoUrl}) => {
    const classes = useStyles();

    return (
        <Link className={classes.link} to={{
            pathname: `/user/${id}`,
            state: {
                id: id,
            }
        }}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="300"
                    image={photoUrl ? photoUrl : defaultAvatar}
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography variant="h5" component="h2">
                        { name }
                    </Typography>
                    <Typography gutterBottom component="p">
                        Web Developer
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        { bio }
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}

export default StudentPreview;