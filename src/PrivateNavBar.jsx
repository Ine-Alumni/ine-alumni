import React from 'react'
import LanguageToggle from './components/LanguageToggle';
import DarkModeToggle  from './components/DarkModeToggle';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import { Link } from 'react-router'
import { Button } from "@/components/ui/button"


const NavBar = () => {
  return (
    <nav >
      <div className='flex justify-center items-center h-16 fixed top-0  w-full  border-b border-gray-200 bg-white/50 backdrop-blur-xl z-30 transition-all'>
        <div className='flex justify-between items-center w-full mx-[12.5vw] max-lg:mx-[2vw]'>
          <Link to='/private-home'>
          <img src="/assets/ine_alumni_blue.png" alt="logo" className='h-15'/>
          </Link>
          
          <div className='flex'>
          <NavigationMenu className='max-md:hidden'>
            <NavigationMenuList className="space-x-4">

              <NavigationMenuItem>
                <Link to="/private-home" className="text-sm font-medium hover:underline">
                  Accueil
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/private-home/evenements" className="text-sm font-medium hover:underline">
                  Événements
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/private-home/emplois" className="text-sm font-medium hover:underline">
                  Emplois
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/private-home/stages" className="text-sm font-medium hover:underline">
                  Stages
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className='bg-transparent hover:bg-transparent hover:underline hover:cursor-pointer data-[state=open]:bg-transparent px-0'>Annuaires</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid p-2 w-[280px]">
                    <li className='hover:bg-gray-100 p-4 rounded-sm'>
                      <Link to="/private-home/laureats" className="block space-y-1">
                        <div className="text-sm font-medium leading-none">Lauréats</div>
                        <p className="text-sm text-muted-foreground">
                          Liste des anciens étudiants INE.
                        </p>
                      </Link>
                    </li>
                    <li className='hover:bg-gray-100 p-4 rounded-sm'>
                      <Link to="/private-home/entreprises" className="block space-y-1">
                        <div className="text-sm font-medium leading-none">Entreprises</div>
                        <p className="text-sm text-muted-foreground">
                          Répertoire des entreprises de marché.
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/private-home/ressources" className="text-sm font-medium hover:underline">
                  Ressources
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/private-home/questions" className="text-sm font-medium hover:underline">
                  Q&R
                </Link>
              </NavigationMenuItem>


            </NavigationMenuList>
          </NavigationMenu>

          <HamburgerMenu />

          <LanguageToggle />
          <DarkModeToggle/>

          <Link to='/private-home/profile'>
            <button className="ml-2 p-2 hover:bg-gray-100 rounded">
                <img src="/assets/icons/profile.svg" alt="Profile" className="w-10 h-10" />
            </button>
          </Link>

          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar

function HamburgerMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="md:hidden p-2">
        <Menu className="h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 mt-2">
        <DropdownMenuItem>
          <Link to="/private-home" className="w-full">Accueil</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/private-home/evenements" className="w-full">Événements</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/private-home/emplois" className="w-full">Emplois</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/private-home/stages" className="w-full">Stages</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/private-home/laureats" className="w-full">Laureats</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/private-home/entreprises" className="w-full">Entreprises</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/private-home/ressources" className="w-full">Ressources</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/private-home/questions" className="w-full">Q&R</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}