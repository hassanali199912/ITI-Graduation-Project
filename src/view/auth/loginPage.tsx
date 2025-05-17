

import Loader from "../../shared/components/loaders/LoginLoader";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("../../features/Login/index"));


const LoginPage = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Login />
        </Suspense>
    )
}

export default LoginPage

