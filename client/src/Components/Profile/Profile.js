import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_CURRENT_USER, UPDATE_USER } from '../../GraphQL/index';
import { useHistory } from 'react-router-dom';

const Profile = () => {
    const { loading, error, data } = useQuery(GET_CURRENT_USER);
    const INITIAL_STATE = {
        name: "",
        email: "",
        githubUsername: "",
        personalSite: "",
        bio: ""
    }

    let history = useHistory();
    const [user, setUser] = useState(INITIAL_STATE);
    const [userId, setId] = useState("");
    const [updateUser, {data: mutationData}] = useMutation(UPDATE_USER, { variables: { _id: userId, userInput: user }, refetchQueries: [{query: GET_CURRENT_USER}] });

    useEffect(_ => {
        let currentUser;
        let _id;
        if (data) currentUser = data.getCurrentUser;
        if (data) _id = data.getCurrentUser._id;
        data && setUser({ ...user, name: currentUser.name, email: currentUser.email, githubUsername: currentUser.githubUsername, bio: currentUser.bio, personalSite: currentUser.personalSite });
        data && setId(_id);
      }, [data]);

    if(loading) return <div>Loading...</div>
    if(error) console.log(error);


    const handleInputChange = field => e => setUser({ ...user, [field]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        let { data } = await updateUser();
        history.push("/profile");
    };

    return(
        <>
            <h1>Update Profile</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={user.name} placeholder="name" onChange={handleInputChange("name")} />
                <input type="text" name="email" value={user.email} placeholder="email" onChange={handleInputChange("email")} />
                <input type="text" name="githubUsername" value={user.githubUsername} placeholder="github username" onChange={handleInputChange("githubUsername")} />
                <input type="text" name="personalSite" value={user.personalSite} placeholder="personal site" onChange={handleInputChange("personalSite")} />
                <textarea  name="bio" value={user.bio} placeholder="bio" onChange={handleInputChange("bio")} />
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

export default Profile;
