import { useContext } from "react"
import { User } from "../Contexts/User"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function RequireAuth() {
    let { auth } = useContext(User)
    const location = useLocation()
    return auth.userDetails ? <Outlet /> : <Navigate state={{from:location}} replace to='/login'/>

}