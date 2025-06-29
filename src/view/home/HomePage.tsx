


import { Link, Outlet } from "react-router-dom"



const HomePage = () => {

    return (
        <>
            <ul className="flex justify-center gap-3 flex-row p-3">
                <li><Link to={"/"}>home</Link></li>
                <li><Link to={"/auth"}>auth</Link></li>
                <li><Link to={"/auth/new"}>New</Link></li>
                <li><Link to={"/auth/mentor"}>mentor</Link></li>
                <li><Link to={"/auth/tranner"}>tranner</Link></li>
            </ul>
            <Outlet />
        </>
    )
}

export default HomePage

