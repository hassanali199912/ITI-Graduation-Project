import { useEffect } from "react";
import { toast } from "react-toastify";
//import Index from "./view/Index";
import { BrowserRouter } from "react-router-dom";
import RegisterLearner from "./features/Auth/RegisterLearner/RegisterLearner";
import RegisterMentor from "./features/Auth/RegisterMentor/RegisterMentor";
import './assets/styles/fonts.css'
function App() {

  return (
    <>
      <BrowserRouter>
        <RegisterMentor/>
        <RegisterLearner/>
      </BrowserRouter>
    </>
  )
}

export default App
