import { Outlet } from "react-router-dom";

import Nav from "./Navbar";

export default function Layout(){
    return(
        <div className='px-3 py-2 max-w-screen-2xl m-0'>
            <Nav ></Nav>
            <Outlet></Outlet>

        </div>

    );
}