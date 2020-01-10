import React from 'react'

const Student = ({ name, email, bio, github, skills, site}) => {
    return (
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
    );
}

export default Student;
