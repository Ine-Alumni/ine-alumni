import { Routes, Route } from "react-router";
import { Suspense, lazy } from "react";
import "./App.css";
import SharedLayout from "./SharedLayout";
import NotFound from "./components/NotFound";

// Lazy loaded components necessary to have fast loading
const Home = lazy(() => import("./components/home/Home"));
const Evenements = lazy(() => import("./components/evenements/Evenements"));
const Emplois = lazy(() => import("./components/emplois/Emplois"));
const Stages = lazy(() => import("./components/stages/Stages"));
const Entreprises = lazy(() => import("./components/entreprises/Entreprises"));
const Laureats = lazy(() => import("./components/laureats/Laureats"));
const RessourcesLayout = lazy(() => import("./components/ressources/RessourcesLayout"));
const OutilsPratiques = lazy(() => import("./components/ressources/OutilsPratiques"));
const RscCertification = lazy(() => import("./components/ressources/RscCertification"));
const RscTextuelles = lazy(() => import("./components/ressources/RscTextuelles"));
const RscInteractives = lazy(() => import("./components/ressources/RscInteractives"));
const Login = lazy(() => import("./components/login/Login"));
const Signup = lazy(() => import("./components/signup/Signup"));
const Clubs = lazy(() => import("./components/clubs/Clubs"));
const EventDetails = lazy(() => import("./components/eventdetails/EventDetails"));

function App() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    }>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="evenements" element={<Evenements />} />
          <Route path="emplois" element={<Emplois />} />
          <Route path="stages" element={<Stages />} />
          <Route path="entreprises" element={<Entreprises />} />
          <Route path="laureats" element={<Laureats />} />
          <Route path="ressources" element={<RessourcesLayout />}>
            <Route path="textuelles" element={<RscTextuelles />} />
            <Route path="interactives" element={<RscInteractives />} />
            <Route path="outils" element={<OutilsPratiques />} />
            <Route path="certification" element={<RscCertification />} />
          </Route>
          <Route path="clubs" element={<Clubs />} />
          <Route path="se-connecter" element={<Login />} />
          <Route path="nouveau-compte" element={<Signup />} />
          <Route path="evenements/:id" element={<EventDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
