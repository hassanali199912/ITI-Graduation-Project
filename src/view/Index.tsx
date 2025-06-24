import type React from "react";
import AsyncBoundry from "../providers/AsyncBoundry";
import { ToastContainer } from "react-toastify";
import UIIndex from "../shared/components/ui";
import Login from "../features/Auth";

import { Suspense } from "react";

import { RouterProvider, type RouteObject, createBrowserRouter } from "react-router-dom"
import Loader from "../shared/components/loader";

import LoginPage from "./auth/loginPage"
import CreateAccount from "../features/Auth/createAccount";
import HomePage from "./home/HomePage";

const LazyLoader = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<Loader />}>{children}</Suspense>
);


const routesConfig: RouteObject[] = [
    {
        path: "/",
        element: (
            <LazyLoader>
                <HomePage />
            </LazyLoader>),
        errorElement: <>
            <h1>Error </h1>
        </>,
        children: [
            {
                index: true,
                element: (<>
                    <LazyLoader>
                        <UIIndex />
                    </LazyLoader>
                </>)
            }
        ]
    },
    {
        path: "/auth",
        element: (
            <LazyLoader>
                <LoginPage />
            </LazyLoader>),
        errorElement: <>
            <h1>Error </h1>
        </>,
        children: [
            {
                index: true,
                element: (
                    <LazyLoader>
                        <Login />
                    </LazyLoader>
                ),
            },
            {
                path: "new",
                element: (
                    <LazyLoader>
                        <CreateAccount />
                    </LazyLoader>
                ),
            },
        ],
    }
];




const routers = createBrowserRouter(routesConfig);


const Index: React.FC = () => {

    return <>
        <AsyncBoundry>
            <RouterProvider router={routers} />
        </AsyncBoundry>
        <ToastContainer />
    </>
}

export default Index;