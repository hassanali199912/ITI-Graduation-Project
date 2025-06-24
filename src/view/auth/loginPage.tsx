


import Loader from "../../shared/components/loaders/LoginLoader";
import { Suspense } from "react";
import { Outlet } from "react-router-dom"



const LoginPage = () => {

    return (
        <Suspense fallback={<Loader />}>
            <Outlet />
        </Suspense>
    )
}

export default LoginPage

