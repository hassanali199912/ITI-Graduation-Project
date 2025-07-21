import { ToastContainer } from "react-toastify";
import Login from "./features/Auth";
import ChangePassword from "./features/Auth/changepassword"
import CreateAccount from "./features/Auth/createAccount";
import OtpPage from "./features/Auth/otpPage"
import RegisterLearner from "./features/Auth/RegisterLearner/RegisterLearner";
import RegisterMentor from "./features/Auth/RegisterMentor/RegisterMentor";
import ResetPassword from "./features/Auth/resetPassword"
import MentorsPage from './features/MentorsPage/MentorsPage';
import MentorProfilePage from "./features/ProfileMentorForStudent/MentorProfilePage";

import { Routes, Route } from 'react-router-dom';

import Home from "./features/Home/Index";
import DashboardAdmin from "./features/Home/dashboardAdmin";
import DashboardMentor from "./features/Home/dashboardMentor";
import MentorDetails from "./features/Home/dataofmentor";
import Navbar from "./features/Home/Navbar";
import Footer from "./features/Home/footer";
import EditProfile from "./features/ProfileMentorForStudent/EditProfile";
import SessionsOverview from "./features/Sessions/SessionsOverview";
import Chat from "./features/Chat";
import PointsOverview from "./features/Points/PointsOverview";
import PaymentSuccess from "./features/Payment/payment";
import PaymentCancel from "./features/Payment/paymentCancel";
function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Login></Login>} />
        <Route path="/changepassword" element={<ChangePassword></ChangePassword>} />
        <Route path="/sendotp" element={<OtpPage></OtpPage>} />
        <Route path="/resetpassword" element={<ResetPassword></ResetPassword>} />

        <Route path="/home" element={<Login></Login>} />
        <Route path="/createAccount" element={<CreateAccount></CreateAccount>} />
        <Route path="/registerlearner" element={<RegisterLearner></RegisterLearner>}></Route>
        <Route path="/registermentor" element={<RegisterMentor></RegisterMentor>}></Route>

        <Route path="/landingpage" element={<Home></Home>}></Route>
        <Route path="/dashboardAdmin" element={<DashboardAdmin></DashboardAdmin>}></Route>
        <Route path="/dashboardMentor" element={<DashboardMentor></DashboardMentor>}></Route>
        <Route path="/mentors" element={<MentorsPage></MentorsPage>}></Route>
        <Route path="/sessions" element={<SessionsOverview></SessionsOverview>}></Route>
        <Route path="/points" element={<PointsOverview></PointsOverview>}></Route>
        <Route path="/mentor/:name" element={<MentorDetails />} />
        <Route path="/mentors/:id" element={<MentorProfilePage></MentorProfilePage>}></Route>
        <Route path="/editprofile" element={<EditProfile></EditProfile>}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancel" element={<PaymentCancel />} />



      </Routes>
      <Footer></Footer>


      <ToastContainer />




    </>
  );
}

export default App;
