import type React from "react";
import AsyncBoundry from "../providers/AsyncBoundry";
import { ToastContainer } from "react-toastify";
import UIIndex from "../shared/components/ui";
import Login from "../features/Auth";
import LoginPage from "./auth/loginPage";


const Index: React.FC = () => {

    return <>
        <AsyncBoundry>
            {/* <UIIndex /> */}
<LoginPage></LoginPage>
        </AsyncBoundry>
        <ToastContainer />
    </>
}

export default Index;