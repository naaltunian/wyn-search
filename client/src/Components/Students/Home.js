import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { GET_ALL_USERS } from '../../GraphQL/index';
import { useQuery } from '@apollo/react-hooks';
import StudentPreview from './StudentPreview';

const useStyles = makeStyles(theme => ({
    root: {
      marginTop: "1rem",
      flexGrow: 1
    }
  }));

const Home = () => {
    const { loading, error, data } = useQuery(GET_ALL_USERS);
    const classes = useStyles();
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return(
        <Grid className={classes.root} container justify="center" align-items="center" spacing={3}>
            {
                data.getAllUsers.map( user => (
                    <Grid item align="center" xs={12} sm={3} lg={4}  key={user._id}>
                        <StudentPreview
                            id={user._id}
                            name={user.name}
                            email={user.email}
                            bio={user.bio}
                            github={user.githubUsername}
                            skills={user.skills}
                            site={user.personalSite}
                        />
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default Home;
