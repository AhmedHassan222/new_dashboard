import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
export default function Nav() {
    const cookie = new Cookies();
    const token = cookie.get("Bearer")
    let navigate = useNavigate()
    async function logOut() {
        try {
            await axios.post(`http://127.0.0.1:8000/api/logout`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            cookie.remove("Bearer")
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }
    return <>
        <nav className="navbar navbar-expand-lg shadow-sm py-3 ">
            <div className="container">
                <Link className="nav-link fs-3" to={'/'}>
                    Dashboard
                </Link>
                <button className=" bg-transparent border-0 fs-4 d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5">
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-5 align-items-center ">

                        {!token ? <li className="nav-item ">
                            <Link className="mx-1 btn rounded-0 px-4 btn-primary " to={'/register'}>Register</Link>
                        </li> : ""}
                        {!token ? <li className="nav-item ">
                            <Link className="mx-1 btn rounded-0 px-4 btn-primary  " to={'/login'}> Login</Link>
                        </li> : ""}
                        {token ? <li className="nav-item ">
                            <Link className="mx-1 btn rounded-0 px-4 btn-outline-primary  " to={'/dashboard'}> Dashboard</Link>
                        </li> : ""}
                        {token ? <li className="nav-item ">
                            <Link onClick={logOut} className="mx-1 btn rounded-0 px-4 btn-primary ">LogOut</Link>
                        </li> : ""}
                    </ul>
                </div>
            </div>
        </nav>
    </>
}