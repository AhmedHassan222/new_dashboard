import { Outlet } from "react-router-dom";
import "../../src/index.css"
import SideBar from "../Components/SideBar";
import TopBar from './../Components/TopBar';
export default function Dashboard() {
    return <>
        <div>
            <TopBar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-3 col-lg-3">
                        <SideBar />
                    </div>
                    <div className="col-sm-12 col-md-9 col-lg-9">
                        <div className="min-hight-100-vh">
                                                    <Outlet />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}