import {
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import MLayout from './MainLayout/MLayout.jsx';
import LandingPage from './Pages/LandingPage/LandingPage.jsx';
import Login from './Pages/Login/Login.jsx';
import AboutUs from './Pages/AboutUs/AboutUs.jsx';
import Guide from './Pages/Guide/Guide.jsx';
import NotFound from './Pages/NotFound/NotFound.jsx';
import ResetPassword from './Pages/Login/ResetPassword.jsx';
import RechercheLayout from './Pages/Technical Pages/Recherche/RechercheLayout.jsx';
import AddChercheur from './Pages/Technical Pages/Control Pannel/Pages/AddChercheur.jsx';
import AddProject from './Pages/Technical Pages/Control Pannel/Pages/AddProject.jsx';
import EditLandingPage from './Pages/Technical Pages/Control Pannel/Pages/EditLandingPage.jsx';
import Update from './Pages/Technical Pages/Control Pannel/Pages/Update.jsx';
import CPLayout from './Pages/Profiles/Chercheur/CPLayout.jsx';
import Informations from './Pages/Profiles/Chercheur/Outlets/Informations.jsx';
import Encadrements from './Pages/Profiles/Chercheur/Outlets/Encadrements.jsx';
import Publications from './Pages/Profiles/Chercheur/Outlets/Publications.jsx';
import Statistiques from './Pages/Profiles/Chercheur/Outlets/Statistiques.jsx';
import PPLayout from './Pages/Profiles/Publication/PPLayout.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="login" element={<Login />} />
      <Route path="resetpassword" element={<ResetPassword />} />
      <Route path="aboutus" element={<AboutUs />} />
      <Route path="guide" element={<Guide />} />
      <Route path="recherche" element={<Outlet />}>
        <Route index element={<Navigate to="chercheur" />} />
        <Route
          path="chercheur"
          element={<RechercheLayout searchby="chercheur" />}
        />
        <Route
          path="publication"
          element={<RechercheLayout searchby="publication" />}
        />
        <Route path="projet" element={<RechercheLayout searchby="projet" />} />
      </Route>
      <Route path="chercheur/:id" element={<CPLayout />}>
        <Route path="informations" element={<Informations />} />
        <Route path="encadrements" element={<Encadrements />} />
        <Route path="publications" element={<Publications />} />
        <Route path="statistiques" element={<Statistiques />} />
      </Route>
      <Route path="publication/:id" element={<PPLayout />} />

      <Route path="projet/:id" element={<PPLayout />} />

      <Route path="encadrement/:id" element={<PPLayout />} />
      <Route path="control" element={<Outlet />}>
        <Route index element={<NotFound />} />
        <Route path="LandingPage" element={<EditLandingPage />} />
        <Route path="Update" element={<Update />} />

        <Route path="AddChercheur" element={<AddChercheur />} />
        <Route path="AddProject" element={<AddProject />} />
        {/* + control pages */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);
export default function App() {
  return <RouterProvider router={router} />;
}
