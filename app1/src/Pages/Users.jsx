import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { User } from "../Contexts/User";

export default function Users() {
    const [users, setUsers] = useState([]);
    let { auth } = useContext(User)
    let token = auth.token;
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/user/show`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(data => {
                setUsers(data.data)
            });
    }, [])

    async function deleteUser(id) {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

        } catch (error) {
        }
    }

    return <>
        <div className="p-3">
            {users.length > 0 ? <div className="table-box">
                <table className="table  table-bordered border-primary table-striped">
                    <thead>
                        <tr>
                            <th className="text-center py-3">Id</th>
                            <th className="text-center py-3">Name</th>
                            <th className="text-center py-3">Email</th>
                            <th className="text-center py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? users.map((item, index) => <tr key={index}>
                            <td className="text-center py-3">{index + 1}</td>
                            <td className="text-center py-3">{item.name}</td>
                            <td className="text-center py-3">{item.email}</td>
                            <td className="text-center d-flex py-3  justify-content-center align-items-center">
                                <Link className="nav-link" to={`${item.id}`}>
                                    <i className="fa-solid  mx-1 fa-pen-to-square"></i>
                                </Link>
                                <i onClick={() => { deleteUser(item.id) }} className="fa-solid  mx-1 fa-trash-can"></i>
                            </td>
                        </tr>) : ''}
                    </tbody>
                </table>
            </div> : <h3 className="my-5 text-center">No Users yet</h3>}
        </div>
    </>
}