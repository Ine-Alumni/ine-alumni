import React from 'react'
import { Link } from 'react-router'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import {Button} from '@/components/ui/button'
  

const Section1 = () => {
  return (
    <div className='relative w-full h-full'>
        <div className='absolute inset-0 bg-[url("/assets/bg.jpg")] bg-cover bg-center opacity-10'></div>

        <div className='relative z-10 mx-[12vw] flex justify-center items-center gap-12 py-20 max-lg:flex-col'>
            <div className='max-w-150'>
                <h1 className='text-4xl font-extrabold text-[#113F67]'>Bienvenue sur la plateforme des Alumni INPT</h1>
                <p className='mt-4 text-gray-600'>Connectez-vous avec la communauté INPT, accédez aux opportunités professionnelles, et bénéficiez des ressources partagées.</p>
                <Link to='/nouveau-compte'>
                  <Button className="mt-2 drop-shadow rounded-[7px] font-bold cursor-pointer ml-4 shadow-[0_4_15px_rgba(0,0,0,0.2)] focus:border-2 focus:border-[#113F67] flex bg-[#34699A] hover:bg-[#2b5c88] text-white transition duration-300 ease-in-out transform transition-transform duration-300 hover:scale-105 focus-within:scale-105">
              Créer un compte
            </Button>
                </Link>
                
            </div>

            <Carousel className='max-w-120' opts={{
    align: "center",
    loop: true,
  }}>
                <CarouselContent>
                    <CarouselItem><img className='rounded-2xl h-68 max-sm:h-auto' src="/assets/inpt1.jpg" alt="inpt1" /></CarouselItem>
                    <CarouselItem><img className='rounded-2xl h-68 max-sm:h-auto' src="/assets/inpt2.jpg" alt="" /></CarouselItem>
                    <CarouselItem><img className='rounded-2xl h-68 max-sm:h-auto' src="/assets/inpt3.jpg" alt="" /></CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    </div>
  )
}

export default Section1