import React from "react";
import { useAuth } from "./components/authentication/AuthenticationProvider";
import { CircleUser, LogOut } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { logout } from "./services/auth-service";

const Navbar = () => {
  const { auth } = useAuth();

  return (
    <nav>
      <div className="max-lg:px-6 flex justify-center items-center h-16 fixed top-0 w-full border-b border-gray-200 bg-white/50 backdrop-blur-xl z-30 transition-all">
        <div className="flex justify-between items-center w-full mx-[12.5vw] max-lg:mx-[2vw]">
          <Link to={"/"}>
            <img
              src="/assets/ine_alumni_blue.png"
              alt="logo"
              className="ml-3 h-13"
            />
          </Link>

          <div className="flex items-center">
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="space-x-4 flex">
                {/* Public (Not Authenticated) Links */}
                {!auth && (
                  <>
                    <NavigationMenuItem>
                      <Link
                        to="/"
                        className="text-sm font-medium hover:underline"
                      >
                        Accueil
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link
                        to="/evenements"
                        className="text-sm font-medium hover:underline"
                      >
                        Événements
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link
                        to="/about"
                        className="text-sm font-medium hover:underline"
                      >
                        À propos
                      </Link>
                    </NavigationMenuItem>
                  </>
                )}

                {/* Private (Authenticated) Links */}
                {auth && (
                  <>
                    <NavigationMenuItem>
                      <Link
                        to="/"
                        className="text-sm font-medium hover:underline"
                      >
                        Accueil
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link
                        to="/evenements"
                        className="text-sm font-medium hover:underline"
                      >
                        Événements
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link
                        to="/jobs"
                        className="text-sm font-medium hover:underline"
                      >
                        Offres
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:underline hover:cursor-pointer data-[state=open]:bg-transparent px-0">
                        Annuaires
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid p-2 w-[280px]">
                          <li className="hover:bg-gray-100 p-4 rounded-sm">
                            <Link to="/laureats" className="block space-y-1">
                              <div className="text-sm font-medium leading-none">
                                Lauréats
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Liste des anciens étudiants INE.
                              </p>
                            </Link>
                          </li>
                          <li className="hover:bg-gray-100 p-4 rounded-sm">
                            <Link to="/entreprises" className="block space-y-1">
                              <div className="text-sm font-medium leading-none">
                                Entreprises
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Répertoire des entreprises de marché.
                              </p>
                            </Link>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link
                        to="/ressources/textuelles"
                        className="text-sm font-medium hover:underline"
                      >
                        Ressources
                      </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link
                        to="/about"
                        className="text-sm font-medium hover:underline"
                      >
                        À propos
                      </Link>
                    </NavigationMenuItem>
                  </>
                )}
              </NavigationMenuList>
            </NavigationMenu>

            <HamburgerMenu />

            {/* <LanguageToggle /> */}
            {/* <DarkModeToggle /> */}

            {/* Buttons or Profile pic */}
            {!auth ? (
              <>
                <Link to="/nouveau-compte" className="max-md:hidden">
                  <Button className="ml-4 px-4 py-2 cursor-pointer rounded-md font-medium bg-white text-black hover:bg-gray-100 border border-gray-200">
                    S'inscrire
                  </Button>
                </Link>
                <Link to="/se-connecter" className="max-md:hidden">
                  <Button className="ml-3 px-4 py-2 cursor-pointer rounded-md font-medium bg-[#0C5F95] text-white hover:bg-[#053A5F] shadow-sm">
                    Connexion
                  </Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="ml-4 cursor-pointer p-2 rounded">
                    <CircleUser color="#444444" size="30px" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <Link to="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <button onClick={logout}>
                    <DropdownMenuItem className="cursor-pointer">
                      <LogOut
                        className="inline h-full mb-1 mr-1"
                        color="#222222"
                        size="25px"
                      />{" "}
                      Se déconnecter
                    </DropdownMenuItem>
                  </button>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

function HamburgerMenu() {
  const { auth } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="md:hidden p-0">
        <Menu className="h-6 w-6 cursor-pointer" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 mt-2">
        {!auth ? (
          <>
            <DropdownMenuItem>
              <Link to="/" className="w-full">
                Accueil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/evenements" className="w-full">
                Événements
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/about" className="w-full">
                À propos
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/se-connecter" className="w-full">
                Connexion
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/nouveau-compte" className="w-full">
                S'inscrire
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <Link to="/" className="w-full">
                Accueil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/evenements" className="w-full">
                Événements
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/jobs" className="w-full">
                Offres
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link to="/laureats" className="w-full">
                Lauréats
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link to="/entreprises" className="w-full">
                Entreprises
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link to="/ressources/textuelles" className="w-full">
                Ressources
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link to="/about" className="w-full">
                À propos
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
