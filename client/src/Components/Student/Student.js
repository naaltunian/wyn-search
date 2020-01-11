import React from 'react';
import { GET_USER } from '../../GraphQL/index';
import { useQuery } from '@apollo/react-hooks';

const Student = (props) => {
    const id = props.location.state.id
    const { loading, error, data } = useQuery(GET_USER, { variables: { _id: id } });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    const user = data.getUser
    return(
        <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <p>{user.githubUsername}</p>
            <p>{user.personalSite}</p>
            <p>{user.bio}</p>
            <ul>
            {user.skills.map( skill => (
                <li>{skill}</li>
            ))}
            </ul>

        </div>
    )
}

export default Student;
