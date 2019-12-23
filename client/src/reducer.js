export default function reducer(state, { type, payload }) {
    switch(type) {
        case "LOGIN":
            return {
                ...state,
                isAuth: true
            };
        case "LOGOUT":
            return {
                ...state,
                isAuth: false
            };
        default:
            return state;
    }
}