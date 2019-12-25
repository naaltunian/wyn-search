import { createContext } from 'react';

const UserContext = createContext({
    isAuth: false
});

export default UserContext;