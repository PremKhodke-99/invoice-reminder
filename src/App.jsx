import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import Homepage from "./pages/Homepage"
import Navbar from "./components/Navbar"
import PageNotFound from "./pages/PageNotFound"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { useState } from "react"
import RefreshHandler from "./RefreshHandler"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId={"115624061918-nqjcriv7cai0ifci30la0oopnjqrf4l5.apps.googleusercontent.com"}>
        <LoginPage />
      </GoogleOAuthProvider>
    )
  }

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to={'/login'} />
  }
  return (
    <div>
      <Navbar />
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path={'/'} element={<Navigate to={'/login'} />} />
        <Route path={'/login'} element={<GoogleAuthWrapper />} />
        <Route path={'/home'} element={<PrivateRoute element={<Homepage />} />} />
        <Route path={'*'} element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App
