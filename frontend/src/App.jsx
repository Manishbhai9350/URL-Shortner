import { Outlet } from "@tanstack/react-router"
import Auth from "./pages/Auth"
import Home from "./pages/Home"

const App = () => {
  return (
    <>
    <Outlet />
    </>
  )
}

export default App