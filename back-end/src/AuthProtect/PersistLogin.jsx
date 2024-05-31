import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../Contexts/User";
import Cookies from "universal-cookie";

export default function PersistLogin() {
    let { auth, setAuth } = useContext(User)
    const [loading, setLoading] = useState(true)
    let token = auth.token;
    const cookie = new Cookies();
    const getToken = cookie.get('Bearer')
    useEffect(() => {
        async function refresh() {
            try {
                await axios.post(`http://127.0.0.1:8000/api/refresh`, null, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${getToken}`
                    }
                })
                    .then((data) => {
                        cookie.set("Bearer", data.data.token);
                        setAuth((prev) => {
                            return {
                                // token: userToken, userDetails: userDetails 
                                userDetails: data.data.user,
                                token: data.data.token
                            }
                        })
                    })
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        !token ? refresh() : setLoading(false)
    }, [])
    return loading ? <div className="w-100 vh-100 bg-primary text-white d-flex justify-content-center align-items-center">
        <i className="h1 fa fa-spin fa-spinner"></i>
    </div> : <Outlet />
}