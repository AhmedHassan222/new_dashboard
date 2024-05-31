import { useContext, useState } from "react";
import "../../src/index.css"
import axios from "axios";
import { User } from "../Contexts/User";
import { useNavigate } from "react-router-dom";
export default function CreateProduct() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const [isAccept, setIsAccept] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    let { auth } = useContext(User)
    let token = auth.token;
    let navigate = useNavigate();
    async function submit(e) {
        setIsLoading(true)
        e.preventDefault();
        setIsAccept(true);
        if (title === '' || description === "" || image === "" && isAccept) {
            setIsLoading(false)
        }
        try {
            // send data
            const formData = new FormData();
            formData.append('title', title)
            formData.append('description', description)
            formData.append('image', image)
            await axios.post(`http://127.0.0.1:8000/api/product/create`, formData, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                setIsLoading(false)
                navigate('/dashboard/products')
            })

        } catch (error) {
            setIsLoading(false)
        }
    }
    return <>
        <div className={`container  px-5 py-3 w-100 my-5`} >
            <form action="" className="" onSubmit={submit}>
                <div className="form-group my-2">
                    <label htmlFor="title">Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" id="title" placeholder="title" className={`form-control mt-2 ${title === '' && isAccept ? 'border-danger' : ''}`} />
                    {title === '' && isAccept ? <span className={`text-danger error `}>Title is required*</span> : ""}
                </div>
                <div className="form-group my-2">
                    <label htmlFor="Description">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} type="emil" id="Description" rows={4} placeholder="caption" className={`form-control mt-2 ${description === '' && isAccept ? 'border-danger' : ''}`} />
                    {description === '' && isAccept ? <span className={`text-danger error `}>Description is required*</span> : ""}
                </div>
                <div className="form-group my-2">
                    <label htmlFor="image">Image</label>
                    <input  onChange={(e) => setImage(e.target.files[0])} type="file" id="image" placeholder="Select Image" className={`form-control mt-2 ${image === '' && isAccept ? 'border-danger' : ''}`} />
                    {image === "" && isAccept ? <span className={`text-danger error `}>Image is required</span> : ""}
                </div>
                <button type="submit" className="btn btn-primary w-100 p-2 my-3">{isLoading ? <i className="fa fa-spin fa-spinner "></i> : "Create"}</button>

            </form>
        </div>
    </>
}