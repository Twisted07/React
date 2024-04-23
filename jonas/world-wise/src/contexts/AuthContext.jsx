import { createContext, useContext } from "react";

const AuthContext = createContext();

function AuthContextProvider({children}) {

    return <AuthContext.Provider>{children}</AuthContext.Provider>
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error("AuthContext was used outside AuthProvider");
}

export {useAuth, AuthContextProvider}