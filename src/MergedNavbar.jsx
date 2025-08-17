import React, { useState } from 'react'
import { useAuth } from './components/AuthContext' 
import LanguageToggle from './components/LanguageToggle'
import DarkModeToggle from './components/DarkModeToggle'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import { Link } from 'react-router'
import { Button } from "@/components/ui/button"

const MergedNavbar = () => {
  const { isAuthenticated } = useAuth()

  return (
    <nav>
      <div className='flex justify-center items-center h-16 fixed top-0 w-full border-b border-gray-200 bg-white/50 backdrop-blur-xl z-30 transition-all'>
        <div className='flex justify-between items-center w-full mx-[12.5vw] max-lg:mx-[2vw]'>
          <Link to={isAuthenticated ? '/private-home' : '/'}>
            <img src="/assets/ine_alumni_blue.png" alt="logo" className='h-14'/>
          </Link>

          <div className='flex items-center'>
            <NavigationMenu className='max-md:hidden'>
              <NavigationMenuList className="space-x-4 flex">

                {/* Public (Not Authenticated) Links */}
                {!isAuthenticated && (
                  <>
                    <NavigationMenuItem>
                      <Link to="/" className="text-sm font-medium hover:underline">Accueil</Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link to="/about" className="text-sm font-medium hover:underline">À propos</Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link to="/contactus" className="text-sm font-medium hover:underline">Contactez-nous</Link>
                    </NavigationMenuItem>
                  </>
                )}

                {/* Private (Authenticated) Links */}
                {isAuthenticated && (
                  <>
                    <NavigationMenuItem>
                      <Link to="/private-home" className="text-sm font-medium hover:underline">Accueil</Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link to="/private-home/evenements" className="text-sm font-medium hover:underline">Événements</Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link to="/private-home/emplois" className="text-sm font-medium hover:underline">Emplois</Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link to="/private-home/stages" className="text-sm font-medium hover:underline">Stages</Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuTrigger className='bg-transparent hover:bg-transparent hover:underline hover:cursor-pointer data-[state=open]:bg-transparent px-0'>
                        Annuaires
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid p-2 w-[280px]">
                          <li className='hover:bg-gray-100 p-4 rounded-sm'>
                            <Link to="/private-home/laureats" className="block space-y-1">
                              <div className="text-sm font-medium leading-none">Lauréats</div>
                              <p className="text-sm text-muted-foreground">Liste des anciens étudiants INE.</p>
                            </Link>
                          </li>
                          <li className='hover:bg-gray-100 p-4 rounded-sm'>
                            <Link to="/private-home/entreprises" className="block space-y-1">
                              <div className="text-sm font-medium leading-none">Entreprises</div>
                              <p className="text-sm text-muted-foreground">Répertoire des entreprises de marché.</p>
                            </Link>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link to="/private-home/ressources" className="text-sm font-medium hover:underline">Ressources</Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <Link to="/private-home/questions" className="text-sm font-medium hover:underline">Q&R</Link>
                    </NavigationMenuItem>
                  </>
                )}

              </NavigationMenuList>
            </NavigationMenu>

            
            <HamburgerMenu />

            <LanguageToggle />
            <DarkModeToggle />

            {/* Buttons or Profile pic */}
            {!isAuthenticated ? (
              <>
                <Link to="/nouveau-compte">
                  <Button className="mt-2 ml-4 drop-shadow rounded-[7px] font-bold cursor-pointer shadow-[0_4_30px_rgba(0,0,0,0.35)] bg-white text-black hover:bg-gray-100">S'inscrire</Button>
                </Link>
                <Link to="/se-connecter">
                  <Button className="mt-2 ml-4 drop-shadow rounded-[7px] font-bold cursor-pointer shadow-[0_4_15px_rgba(0,0,0,0.2)] bg-[#0C5F95] text-white hover:bg-[#053A5F]">Connexion</Button>
                </Link>
              </>
            ) : (
              <Link to='/private-home/profile'>
                <button className="ml-2 p-2 hover:bg-gray-100 rounded">
                  <img src="/assets/icons/profile.svg" alt="Profile" className="w-10 h-10" />
                </button>
              </Link>
            )}

          </div>
        </div>
      </div>
    </nav>
  )
}

export default MergedNavbar

function HamburgerMenu() {
  const { isAuthenticated } = useAuth()
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="md:hidden p-2">
        <Menu className="h-6 w-6" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 mt-2">
        {!isAuthenticated ? (
          <>
            <DropdownMenuItem><Link to="/" className="w-full">Accueil</Link></DropdownMenuItem>
            <DropdownMenuItem><Link to="/about" className="w-full">À propos</Link></DropdownMenuItem>
            <DropdownMenuItem><Link to="/contactus" className="w-full">Contactez-nous</Link></DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem><Link to="/private-home" className="w-full">Accueil</Link></DropdownMenuItem>
            <DropdownMenuItem><Link to="/private-home/evenements" className="w-full">Événements</Link></DropdownMenuItem>
            <DropdownMenuItem><Link to="/private-home/emplois" className="w-full">Emplois</Link></DropdownMenuItem>
            <DropdownMenuItem><Link to="/private-home/stages" className="w-full">Stages</Link></DropdownMenuItem>

            <DropdownMenuItem>
              <Link to="/private-home/laureats" className="w-full">Lauréats</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link to="/private-home/entreprises" className="w-full">Entreprises
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link to="/private-home/ressources" className="w-full">Ressources
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link to="/private-home/questions" className="w-full">
                Q&R
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}