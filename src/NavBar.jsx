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
          <Link to='/'>
          <img src="/assets/ine_alumni_blue.png" alt="logo" className='h-14'/>
          </Link>
          
          <div className='flex'>
          <NavigationMenu className='max-md:hidden'>
            <NavigationMenuList className="space-x-4">

              <NavigationMenuItem>
                <Link to="/" className="text-sm font-medium hover:underline">
                  Accueil
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/about" className="text-sm font-medium hover:underline">
                  À propos
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/contactus" className="text-sm font-medium hover:underline">
                  Contactez-nous
                </Link>
              </NavigationMenuItem>



              <NavigationMenuItem>
                <NavigationMenuContent>
                  <ul className="grid p-2 w-[280px]">
                    <li className='hover:bg-gray-100 p-4 rounded-sm'>
                      <Link to="/about" className="block space-y-1">
                        <div className="text-sm font-medium leading-none">À propos</div>
                        <p className="text-sm text-muted-foreground">
                          À propos nous
                        </p>
                      </Link>
                    </li>
                    <li className='hover:bg-gray-100 p-4 rounded-sm'>
                      <Link to="/contactus" className="block space-y-1">
                        <div className="text-sm font-medium leading-none">Contactez-nous</div>
                        <p className="text-sm text-muted-foreground">
                          Contactez nous.
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>

          <HamburgerMenu />

          <LanguageToggle />
          <DarkModeToggle/>

          <Link to="/nouveau-compte">
            <Button className="mt-2  drop-shadow rounded-[7px] font-bold cursor-pointer ml-4 shadow-[0_4_30px_rgba(0,0,0,0.35)] bg-white text-black hover:bg-gray-100 focus:bg-white active:bg-white focus:outline-none transition duration-300 ease-in-out">
              S'inscrire
            </Button>
          </Link>


          <Link to="/se-connecter">
            <Button className="mt-2 drop-shadow rounded-[7px] font-bold cursor-pointer ml-4 shadow-[0_4_15px_rgba(0,0,0,0.2)] focus:border-2 focus:border-[#113F67] flex bg-[#34699A] hover:bg-[#2b5c88] text-white transition duration-300 ease-in-out">
              Connexion
            </Button>
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
          <Link to="/" className="w-full">Accueil</Link>
        </DropdownMenuItem> 
        <DropdownMenuItem>
          <Link to="/about" className="w-full">À propos</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/contactus" className="w-full">Contactez-nous</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}