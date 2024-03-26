import { Route, Outlet, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import MLayout from './MainLayout/MLayout.jsx'
import LandingPage from './Pages/LandingPage/LandingPage.jsx'
import Login from './Pages/Login/Login.jsx'
import AboutUs from './Pages/AboutUs/AboutUs.jsx'
import Guide from './Pages/Guide/Guide.jsx'
import Control from './Pages/Technical Pages/Control Pannel/Pannel.jsx'
import NotFound from './Pages/NotFound/NotFound.jsx'
import ResetPassword from './Pages/Login/ResetPassword.jsx'
import RechercheLayout from "./Pages/Technical Pages/Recherche/RechercheLayout.jsx"



const router = createBrowserRouter(createRoutesFromElements(

  <Route path="/" element={<MLayout />} >
    <Route index element={<LandingPage />} />
    <Route path="login" element={<Outlet />} >
      <Route index element={<Login />} />
      <Route path="resetpassword" element={<ResetPassword />} />
    </Route>
    <Route path="aboutus" element={<AboutUs />} />
    <Route path="guide" element={<Guide />} />
    <Route path='recherche' element={<RechercheLayout />} />
    <Route path='control' element={<Outlet />} >
      <Route index element={<Control />} />
      {/* + control pages */}
    </Route>
    <Route path='*' element={<NotFound />} />
  </Route>

))
export default function App() {


  return (
    <RouterProvider router={router} />
  )
}