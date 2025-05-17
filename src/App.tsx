import { useEffect } from "react"
import { toast } from "react-toastify"
import Index from "./view/Index"

function App() {

  useEffect(() => {
    toast.error("Hello React Team")
    toast.success("It Will Be A Great Project ")
  }, [])

  return (
    <>
      <Index />
    </>
  )
}

export default App
