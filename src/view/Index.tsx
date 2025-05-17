import type React from "react";
import AsyncBoundry from "../providers/AsyncBoundry";
import { ToastContainer } from "react-toastify";


const Index: React.FC = () => {

    return <>
        <AsyncBoundry>
            <h1>This Is Index </h1>
        </AsyncBoundry>
        <ToastContainer />
    </>
}

export default Index;