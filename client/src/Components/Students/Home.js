import React from 'react';
import { GET_ALL_USERS } from '../../GraphQL/index';
import { useQuery } from '@apollo/react-hooks';

import Student from '../Student/Student'

const Home = () => {
    const { loading, error, data } = useQuery(GET_ALL_USERS);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data.getAllUsers)
    return(
        <div>
            <h1>Home</h1>
            {
                data.getAllUsers.map( user => (
                    <Student
                        key={user._id}
                        name={user.name}
                        email={user.email}
                        bio={user.bio}
                        github={user.githubUsername}
                        skills={user.skills}
                        site={user.personalSite}
                    />
                ))
            }
        </div>
    )
}

export default Home;
