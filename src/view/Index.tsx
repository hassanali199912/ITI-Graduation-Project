import type React from "react";
import AsyncBoundry from "../providers/AsyncBoundry";
import { ToastContainer } from "react-toastify";
import UIIndex from "../shared/components/ui";


const Index: React.FC = () => {

    return <>
        <AsyncBoundry>
            <UIIndex />
        </AsyncBoundry>
        <ToastContainer />
    </>
}

export default Index;