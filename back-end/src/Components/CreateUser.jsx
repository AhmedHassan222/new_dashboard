import { useContext, useState } from "react";
import "../../src/index.css"
import axios from "axios";
import { User } from "../Contexts/User";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordR, setPasswordR] = useState('');
    const [error, setError] = useState(0);
    const [isAccept, setIsAccept] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    let {auth } = useContext(User)
    let token = auth.token;
    let navigate = useNavigate();
    async function submit(e) {
        setIsLoading(true)
        let flag = true;
        e.preventDefault();
        setIsAccept(true);
        if (name === '' || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) == false || password.length < 8 || password !== passwordR && isAccept) {
            flag = false;
            setIsLoading(false)
        } else {
            flag = true;
        }
        try {
            if (flag) {
                // send data
                await axios.post(`http://127.0.0.1:8000/api/user/create`, {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: passwordR
                }, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }).then((response) => {
                    setIsLoading(false)
                    
                })

            }
        } catch (error) {
            setError(error.response.status)
            setIsLoading(false)
        }
    }
    return <>
        <div className={`container  px-5 py-3 w-100  my-5`} >
            <form action="" className="" onSubmit={submit}>
                <div className="form-group my-2">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" placeholder="Joe" className={`form-control mt-2 ${name.length <= 0 && isAccept ? 'border-danger' : ''}`} />
                    {name.length <= 0 && isAccept ? <span className={`text-danger error `}>Name is required*</span> : ""}
                </div>
                <div className="form-group my-2">
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="emil" id="email" placeholder="Joe@gmail.com" className={`form-control mt-2 ${/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) == false && isAccept ? 'border-danger' : ''}`} />
                    {/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) == false && isAccept ? <span className={`text-danger error `}>Invalid Email*</span> : ""}
                    {error == 422 && isAccept ? <span className=" text-danger error">Email is already have been taken*</span> : ''}
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="********" className={`form-control mt-2 ${password.length < 8 && isAccept ? 'border-danger' : ''}`} />
                    {password.length < 8 && isAccept ? <span className={`text-danger error `}>Password must be more than 8 char*</span> : ""}
                </div>
                <div className="form-group my-2">
                    <label htmlFor="cPassword">Confirm Password</label>
                    <input value={passwordR} onChange={(e) => setPasswordR(e.target.value)} type="password" id="cPassword" placeholder="********" className={`form-control mt-2 ${password !== passwordR && isAccept ? 'border-danger' : ''}`} />
                    {password !== passwordR && isAccept ? <span className={`text-danger error `}>Password does not match*</span> : ""}
                </div>
                <button type="submit" className="btn btn-primary w-100 p-2 my-3">{isLoading ? <i className="fa fa-spin fa-spinner "></i> : "Create"}</button>

            </form>
        </div>
    </>
}