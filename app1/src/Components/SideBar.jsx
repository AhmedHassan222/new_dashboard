import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function SideBar() {
    const [status, setStatus] = useState('')
    return <>
        <aside className='p-3 shadow-sm '>
            <Link onClick={() => { setStatus('users') }} to={'/dashboard/users'} className={`btn text-black  d-flex justify-content-start px-2 align-items-center fw-bold  nav-link ${status == 'users' ? "bg-primary text-white" : "bg-light text-black"} button-hover w-100 my-2 py-2 `}>
                <i className="fa-solid  fa-users me-2"></i>
                <span  >Users</span>
            </Link>
            <Link onClick={() => { setStatus('create') }} to={'/dashboard/users/create'} className={`btn text-black  d-flex justify-content-start px-2 align-items-center fw-bold  nav-link ${status == 'create' ? 'bg-primary text-white' : 'bg-light text-black'} button-hover w-100 my-2 py-2 `}>
                <i className="fa-solid  fa-plus me-2"></i>
                <span  >AddUser</span>
            </Link>
            <Link onClick={() => { setStatus('products') }} to={'/dashboard/products'} className={`btn text-black  d-flex justify-content-start px-2 align-items-center fw-bold  nav-link ${status == 'products' ? 'bg-primary text-white' : 'bg-light text-black'} button-hover w-100 my-2 py-2 `}>
                <span  >Products</span>
            </Link>
            <Link onClick={() => { setStatus('createProduct') }} to={'/dashboard/products/create'} className={`btn text-black  d-flex justify-content-start px-2 align-items-center fw-bold  nav-link ${status == 'createProduct' ? 'bg-primary text-white' : 'bg-light text-black'} button-hover w-100 my-2 py-2 `}>
                <i className="fa-solid  fa-plus me-2"></i>
                <span  >AddProduct</span>
            </Link>

        </aside>
    </>
}