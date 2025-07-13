import { ToastContainer } from "react-toastify";
import Login from "./features/Auth";
import ChangePassword from "./features/Auth/changepassword"
import CreateAccount from "./features/Auth/createAccount";
import OtpPage from "./features/Auth/otpPage"
import RegisterLearner from "./features/Auth/RegisterLearner/RegisterLearner";
import RegisterMentor from "./features/Auth/RegisterMentor/RegisterMentor";
import ResetPassword from "./features/Auth/resetPassword"
import Index from "./view/Index"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./features/Home/Index";
import DashboardAdmin from "./features/Home/dashboardAdmin";
import DashboardMentor from "./features/Home/dashboardMentor";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/sendotp" element={<OtpPage></OtpPage>} />
          <Route path="/resetpassword" element={<ResetPassword></ResetPassword>} />
          <Route path="/home" element={<Login></Login>} />
          <Route path="/createAccount" element={<CreateAccount></CreateAccount>} />
          <Route path="/registerlearner" element={<RegisterLearner></RegisterLearner>}></Route>
          <Route path="/registermentor" element={<RegisterMentor></RegisterMentor>}></Route>
           <Route path="/landingpage" element={<Home></Home>}></Route>
              <Route path="/dashboardAdmin" element={<DashboardAdmin></DashboardAdmin>}></Route>
               <Route path="/dashboardMentor" element={<DashboardMentor></DashboardMentor>}></Route>


        </Routes>
      </Router>
      
      <ToastContainer />
     
    </>
  );
}

export default App;
