import { Routes, Route } from "react-router";
import "./App.css";
import SharedLayout from "./SharedLayout";
import Home from "./components/home/Home";
import Evenements from "./components/evenements/Evenements";
import Emplois from "./components/emplois/Emplois";
import Stages from "./components/stages/Stages";
import Enreprises from "./components/entreprises/Entreprises";
import Laureats from "./components/laureats/Laureats";
import RessourcesLayout from "./components/ressources/RessourcesLayout";
import OutilsPratiques from "./components/ressources/OutilsPratiques";
import RscCertification from "./components/ressources/RscCertification";
import RscTextuelles from "./components/ressources/RscTextuelles";
import RscInteractives from "./components/ressources/RscInteractives";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import NotFound from "./components/NotFound";
import EventDetails from "./components/eventdetails/EventDetails";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuthenticationState } from "./services/auth-service";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import AccountVerification from "./components/authentication/AccountVerification";
import EmailVerification from "./components/authentication/EmailVerification";

const AuthenticationContext = createContext();

export const useAuth = () => {
  return useContext(AuthenticationContext);
}

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    setAuth(getAuthenticationState());
  }, []);

  return (
    <AuthenticationContext.Provider value={{auth, setAuth}}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
        
          {/* fully authenticated routes */}
          <Route element={<ProtectedRoute requireEmailVerification={true} requireAccountVerification={true}/>} > 
              <Route path="evenements" element={<Evenements />} >
                <Route path=":id" element={<EventDetails />} />
              </Route>
              <Route path="emplois" element={<Emplois />} />
              <Route path="stages" element={<Stages />} />
              <Route path="entreprises" element={<Enreprises />} />
              <Route path="laureats" element={<Laureats />} />
              <Route path="ressources" element={<RessourcesLayout />}>
                <Route path="textuelles" element={<RscTextuelles />} />
                <Route path="interactives" element={<RscInteractives />} />
                <Route path="outils" element={<OutilsPratiques />} />
                <Route path="certification" element={<RscCertification />} />
              </Route>
          </Route>

          <Route path="/verification-email" element={<ProtectedRoute requireEmailVerification={false} requireAccountVerification={false}/>} >
            <Route index element={<EmailVerification/>} />
          </Route>

          <Route path="/verification-compte" element={<ProtectedRoute requireEmailVerification={true} requireAccountVerification={false}/>} >
            <Route index element={<AccountVerification/>} />
          </Route>

          <Route index element={<Home />} />
          <Route path="se-connecter" element={<Login />} />
          <Route path="nouveau-compte" element={<Signup />} />
          <Route path="*" element={<NotFound />}></Route>

        </Route>
      </Routes>
    </AuthenticationContext.Provider>
  );
}

export default App;
