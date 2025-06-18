import { useEffect } from "react"
import { toast } from "react-toastify"
import Index from "./view/Index"
import { BrowserRouter } from "react-router-dom"
function App() {

  // useEffect(() => {
  //   toast.error("Hello React Team")
  //   toast.success("It Will Be A Great Project ")
  // }, [])

  return (
    <>
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    </>
  )
}

export default App
