import { Link } from "react-router-dom";

export default function TopBar() {
    return <>
        <div className="py-3 shadow-sm">
            <div className="container ">
                <div className="d-flex justify-content-between">
                    <Link className="nav-link fs-3" to={'/'}>
                        Dashboard
                    </Link>                    <Link className="btn rounded-0 px-4 btn-primary" to={'/'}>Go To Website</Link>
                </div>
            </div>
        </div>


    </>
}