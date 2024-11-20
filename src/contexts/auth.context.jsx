import { createContext, useState } from "react"

const AuthContext = createContext()

function AuthProviderWrapper(props) {

    const [loggedUser, setLoggedUser] = useState(undefined)



    return (
        <AuthContext.Provider value={{ loggedUser, setLoggedUser }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export { AuthContext, AuthProviderWrapper }