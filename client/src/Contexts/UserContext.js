import { createContext } from 'react';

const UserContext = createContext({
    currentUser: null,
    isAuth: false
});

export default UserContext;