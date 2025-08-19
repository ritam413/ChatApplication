import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";

export const AuthContext = createContext();

export const useAuthContext = () =>  useContext(AuthContext);


export const AuthContextProvider = ({ children }) => {
    const [authUser,setAuthUser] = useState(JSON.parse(localStorage.getItem('chatUser'))||null)
    
    return <AuthContext.Provider value={{authUser,setAuthUser}}>{children}

    
    </AuthContext.Provider>;
};