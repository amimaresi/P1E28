import { Routes, Route, Navigate } from "react-router-dom";
import CPLayout from "./CPLayout";
import Informations from "./Outlets/informations";
import Encadrements from "./Outlets/encadrements";
import Publications from "./Outlets/Publications";

const ProfileChercheur = () => {
  return (
    <Routes>
        {console.log("you are must be here2")}
      <Route path="/" element={<CPLayout />}>
        <Route index element={<Navigate to="informations" />} />
        <Route path="informations" element={<Informations />} />
        <Route path="encadrements" element={<Encadrements />} />
        <Route path="publications" element={<Publications />} />
      </Route>
    </Routes>
  );
};

export default ProfileChercheur;