import { Routes, Route, useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import { AuthProvider } from "./components/AuthContext";
import "./App.css";
import SharedLayout from "./SharedLayout";
import Home from "./components/home/Home";
import Evenements from "./components/evenements/Evenements";
import Emplois from "./components/emplois/Emplois";
import Stages from "./components/stages/Stages";
import Entreprises from "./components/entreprises/Entreprises";
import Laureats from "./components/laureats/Laureats";
import Ressources from "./components/ressources/Ressources";
import Questions from "./components/questions/Questions";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import About from "./components/about/About";
import Contactus from "./components/contactus/Contactus";
import Profile from "./components/profile/Profile";
import NotFound from "./components/NotFound";
import EventDetails from "./components/eventdetails/EventDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = false;
  const username = isAuthenticated ? "Hibat Allah" : "";

  // AUTO REDIRECT: When authenticated and on public route, go to private route
  useEffect(() => {
    if (isAuthenticated && location.pathname === "/") {
      navigate("/private-home", { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <AuthProvider isAuthenticated={isAuthenticated} username={username}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="se-connecter" element={<Login />} />
          <Route path="nouveau-compte" element={<Signup />} />
          <Route path="about" element={<About />} />
          <Route path="contactus" element={<Contactus />} />
          <Route path="evenements/:id" element={<EventDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Private Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/private-home" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="evenements" element={<Evenements />} />
            <Route path="emplois" element={<Emplois />} />
            <Route path="stages" element={<Stages />} />
            <Route path="entreprises" element={<Entreprises />} />
            <Route path="laureats" element={<Laureats />} />
            <Route path="ressources" element={<Ressources />} />
            <Route path="questions" element={<Questions />} />
            <Route path="profile" element={<Profile />} />
            <Route path="evenements/:id" element={<EventDetails />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function App() {
  return <AppContent />;
}

export default App;
