import React, { useState } from 'react';

const INITIAL_STATE = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    githubUsername: ""
}

const Signup = () => {

    const [user, setUser] = useState(INITIAL_STATE);

    const handleInputChange = field => e => setUser({ ...user, [field]: e.target.value });

    function handleSubmit(e) {
        e.preventDefault();
    }

    const isInvalid = !user.name || !user.email || !user.password || user.password !== user.confirmPassword || !user.githubUsername;

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={user.name} placeholder="name" onChange={handleInputChange("name")} />
            <input type="text" name="email" value={user.email} placeholder="email" onChange={handleInputChange("email")} />
            <input type="password" name="password" value={user.password} placeholder="password" onChange={handleInputChange("password")} />
            <input type="password" name="confirmPassword" value={user.confirmPassword} placeholder="confirm password" onChange={handleInputChange("confirmPassword")} />
            <input type="text" name="githubUsername" value={user.githubUsername} placeholder="github username" onChange={handleInputChange("githubUsername")} />

            <input type="submit" value="Submit" disabled={isInvalid} />
        </form>
    )
}

export default Signup;