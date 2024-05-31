import { Link } from "react-router-dom";
import "../../src/index.css"
export default function Footer() {
    return <>
        <footer className="text-center p-3 d-flex justify-content-center text-white py-2 bg-primary" >
            <span>
                © 2034 Copyright:
            </span>
            <a className="text-white ms-2 nav-link" href="https://ahmedhassan222.github.io/portfolio" target="_blank">Ahmed Hassan</a>
        </footer>
    </>
}