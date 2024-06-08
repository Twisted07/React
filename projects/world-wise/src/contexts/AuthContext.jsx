import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

  
  const AuthContext = createContext();

const initialState = {
    user: {},
    login: false,
    isAuthenticated: false,
}


function reducer (state, action) {
    switch (action.type) {
        case "login" :
            return {...state, user: FAKE_USER, login: true, isAuthenticated: true }

        case "logout" :
            return {initialState}
    }
}

  

function AuthContextProvider({children}) {
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState);


    function login(user) {
        if (user.email.toLowerCase() === FAKE_USER.email.toLowerCase() && user.password.toLowerCase() === FAKE_USER.password.toLowerCase()) {
            dispatch({type: "login", payload: user});
        }
    }

    function logout() {
        dispatch({type: "logout"})
    }



    return <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>{children}</AuthContext.Provider>
}





function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error("AuthContext was used outside AuthProvider");

    return context;
}



export {useAuth, AuthContextProvider}