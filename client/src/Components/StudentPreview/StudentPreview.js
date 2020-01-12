import React from 'react'
import { Link } from 'react-router-dom'

const StudentPreview = ({ id, name, email, bio, github, skills, site}) => {
    return (
        <Link to={{
            pathname: `/user/${id}`,
            state: {
                id: id,
            }
        }}>
            <div style={{
            border: 'solid 1px red',
            width: '200px'
            }}>
                <h1>{name}</h1>
                <p>{email}</p>
                <p>{github}</p>
                <p>{site}</p>
                <p>{skills}</p>
                <p>{bio}</p>
            </div>
        </Link>
    );
}

export default StudentPreview;
