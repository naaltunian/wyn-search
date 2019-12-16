import React, {useContext} from 'react';
import UserContext from '../../Contexts/UserContext'

const Login = () => {
    const message = useContext(UserContext)
    return(
        <div>
            {message}
        </div>
    )
}

export default Login;