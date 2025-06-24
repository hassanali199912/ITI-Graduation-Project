

import { useTranslation } from "react-i18next";
import Loader from "../../shared/components/loaders/LoginLoader";
import { lazy, Suspense } from "react";
import CreateAccount from "../../features/Auth/createAccount";

const Login = lazy(() => import("../../features/Auth/index"));


const LoginPage = () => {
    const { t } = useTranslation("login");

    return (
        <Suspense fallback={<Loader />}>
            {/* <Login /> */}
            <CreateAccount></CreateAccount>
        </Suspense>
    )
}

export default LoginPage

