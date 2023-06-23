import useUser from "./useUser";


export const useLogged = () => {
    const { setAuth } = useUser();

    // sets the data from the localstorage to the context
    const userLogged = () => {
        const loggedUser = window.localStorage.getItem('user');
        if(loggedUser) {
          setAuth(JSON.parse(loggedUser));
        }
    }

    return userLogged;
}