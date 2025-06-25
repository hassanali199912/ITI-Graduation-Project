

import { useTranslation } from "react-i18next";
import Loader from "../../shared/components/loaders/LoginLoader";
import { lazy, Suspense } from "react";



const Login = lazy(() => import("../../features/Auth/index"));


const LoginPage = () => {
    const { t } = useTranslation("login");

    return (
        <Suspense fallback={<Loader />}>
            <h1>{t("title")}</h1>
            <Login />
            
        </Suspense>
    )
}

export default LoginPage

