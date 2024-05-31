import { Link } from "react-router-dom"
import "../../src/index.css"
export default function Notfound() {
    return <>
        <section className="notfound vh-100 d-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="error-template">
                            <h1>
                                Oops!</h1>
                            <h2>
                                404 Not Found</h2>
                            <div className="error-details">
                                Sorry, an error has occured, Requested page not found!
                            </div>
                            <div className="error-actions">
                                <Link to={'/'} className="btn btn-primary rounded-0"><span className="glyphicon glyphicon-home"></span>
                                    Take Me Home </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    </>
}