import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { User } from "../Contexts/User";
import "../../src/index.css"
export default function Products() {
    const [products, setProducts] = useState([]);
    const [runUseEffect, setRunUseEffect] = useState(0)
    let { auth } = useContext(User)
    let token = auth.token;
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/product/show`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then(data => {
                setProducts(data.data)
            });
    }, [runUseEffect])

    async function deleteProdut(id) {
        try {
            const res = await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.status === 200) {
                setRunUseEffect(prev => prev + 1)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return <>
        <div className="p-3">
            {products.length > 0 ? <table className="table  table-bordered border-primary table-striped">
                <thead>
                    <tr>
                        <th className="text-center py-3">Id</th>
                        <th className="text-center py-3">Image</th>
                        <th className="text-center py-3">Title</th>
                        <th className="text-center py-3">Caption</th>
                        <th className="text-center py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? products.map((item, index) => <tr key={index}>
                        <td className="text-center py-3">{index + 1}</td>
                        <td className="text-center py-3">
                            <img src={item.image} className="img-small-style" alt="" />
                        </td>
                        <td className="text-center py-3">{item.title}</td>
                        <td className="text-center py-3">{item.description}</td>
                        <td className="text-center  py-3  ">
                            <Link className="nav-link" to={`${item.id}`}>
                                <i className="fa-solid  mx-1 fa-pen-to-square"></i>
                            </Link>
                            <i onClick={() => { deleteProdut(item.id) }} className="fa-solid  mx-1 fa-trash-can"></i>
                        </td>
                    </tr>) : ''}
                </tbody>
            </table> : <h3 className="my-5 text-center">No products yet</h3>}
        </div>
    </>
}