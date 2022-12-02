import { useState } from "react"
import { createContainer } from "unstated-next";

const _useUserAuthenticationContext = () => {
    const [userName, setUserName] = useState(null);
    return {
        userName,
        isAuthenticated: userName !== null,
        LogIn: (userName) => {
            setUserName(userName)
        },
        LogOut: () => {
            setUserName(null)
        }
    }
}

const UserContext = createContainer(_useUserAuthenticationContext);

export const UserContextProvider = UserContext.Provider;
export const userAuthenticationStatusContainer = UserContext.useContainer;
