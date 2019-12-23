import React, {useContext} from 'react';
import UserContext from '../../Contexts/UserContext'

const Login = ({ isAuth }) => {
    const message = useContext(UserContext)
    return(
        <div>
            {isAuth}
        </div>
    )
}

export default Login;