import { useEffect } from "react";
import { toast } from "react-toastify";
//import Index from "./view/Index";
import { BrowserRouter } from "react-router-dom";
import RegisterLearner from "./features/Auth/RegisterLearner/RegisterLearner";
function App() {

  // useEffect(() => {
  //   toast.error("Hello React Team")
  //   toast.success("It Will Be A Great Project ")
  // }, [])

  return (
    <>
      <BrowserRouter>
        
        <RegisterLearner/>
      </BrowserRouter>
    </>
  )
}

export default App
