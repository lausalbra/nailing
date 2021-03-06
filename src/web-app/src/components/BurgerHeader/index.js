import { useState } from "react"; // import state
import { Link } from 'wouter'

export function BurgerHeader() {
    const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

    function navLogged(isBurger) {
        return isBurger === 'true' ? (
            <>
                <Link className='hover:text-red-400' to='/conocenos'>Conócenos</Link>
                <Link className='hover:text-red-400' to='/feedback'>Feedback</Link>
                <Link className='hover:text-red-400' to='/cita'>Pide Cita</Link>
                <Link className='hover:text-red-400' to='/usuario'>Mi perfil</Link>
            </>

        ) :
            <>
                <Link className='hover:text-red-400' to='/conocenos'>Conócenos</Link>
                <Link className='hover:text-red-400' to='/feedback'>Feedback</Link>
                <Link className=' w-64 h-24 ml-4' to='/' />
                <Link className='hover:text-red-400' to='/cita'>Pide Cita</Link>
                <Link className='hover:text-red-400' to='/usuario'>Mi perfil</Link>
            </>
    }

    function navNotLogged(isBurger) {
        return isBurger === 'true' ? (
            <>
                <Link className='hover:text-red-400' to='/conocenos'>Conócenos</Link>
                <Link className='hover:text-red-400' to='/feedback'>Feedback</Link>
                <Link className='hover:text-red-400' to='/centro'>Centros</Link>
                <Link className='hover:text-red-400' to='/login'>Iniciar Sesion</Link>
            </>
        ) :
            (
                <>
                    <Link className='hover:text-red-400' to='/conocenos'>Conócenos</Link>
                    <Link className='hover:text-red-400' to='/feedback'>Feedback</Link>
                    <Link className=' w-64 h-24' to='/' />
                    <Link className='hover:text-red-400' to='/centro'>Centros</Link>
                    <Link className='hover:text-red-400' to='/login'>Iniciar Sesion</Link>
                </>
            )
    }

    function nav(isBurger) {
        const isLogged = sessionStorage.getItem("isLogged")

        if (isLogged === 'true') {
            return navLogged(isBurger)
        } else {
            return navNotLogged(isBurger)
        }

    }

    return (
        <div className="flex items-center justify-between border-b border-gray-400">

            <nav>
                <section className="MOBILE-MENU flex lg:hidden">
                    <div
                        className="HAMBURGER-ICON space-y-2"
                        onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
                    >
                        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                        <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                    </div>

                    <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
                        <div
                            className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
                            onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
                        >
                            <svg
                                className="h-8 w-8 text-gray-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </div>
                        <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px] ">
                            {nav(true)}
                        </ul>
                    </div>
                </section>

                <ul className="DESKTOP-MENU hidden lg:grid grid-rows-1 grid-cols-5 items-center bg-logo-completo bg-white bg-no-repeat bg-center text-center p-2 ">
                    {nav(false)}
                </ul>
            </nav>
            <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
        </div>
    );
}