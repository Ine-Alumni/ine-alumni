import React from 'react'

const Section6 = () => {
    return (
        <div className='mt-20 mx-4'>

            <figure className="max-w-screen-md mx-auto text-center">
                <svg className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                    <path d="https://chartwellspeakers.b-cdn.net/wp-content/uploads/2018/04/John-C.-Maxwell.jpg"/>
                </svg>
                <blockquote>
                    <p className="text-2xl italic font-medium text-gray-900 dark:text-white">"Trouver un mentor, c’est découvrir un raccourci vers l’expérience et la sagesse."</p>
                </blockquote>
                <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
                    
                <img
                    className="w-20 h-20 rounded-full"
                    src="https://chartwellspeakers.b-cdn.net/wp-content/uploads/2018/04/John-C.-Maxwell.jpg"
                    alt="John C. Maxwell"
                />
                    <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
                        <cite className="pe-3 font-medium text-gray-900 dark:text-white">John C. Maxwell</cite>
                        <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">auteur et coach en leadership</cite>
                    </div>
                </figcaption>
            </figure>

        </div>
    );
};

export default Section6;