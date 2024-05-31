import { createContext, useEffect, useState } from "react"
export const User = createContext({})
export default function UserProvide(props) {


    let [auth, setAuth] = useState({});
    return <User.Provider value={{ setAuth, auth }}>
        {props.children}
    </User.Provider>
}
