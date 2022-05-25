import { useState } from "react"; // import state
import { Link, useLocation } from 'wouter'

export function Header() {

  //Obtengo usuario desencriptado
  var cryptoJS = require("crypto-js");
  var user = null;
  if (sessionStorage.getItem("userEncriptado") != null && sessionStorage.getItem("userEncriptado") !== '') user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))
 
  

  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false
  const [locationPath, locationPush] = useLocation()

  function navLogged(isBurger, rol, location) {
    var rolName = null;
    switch (rol) {
      case "USER":
        rolName = "Cliente";
        break;
      case "OWNER":
        rolName = "Dueño";
        break;
      case "ADMIN":
        rolName = "Administrador";
        break;
      default:
        break;
    }
    return isBurger === true ? (
      <>
        <Link className='hover:text-red-400' to='/conocenos'>Conócenos</Link>
        <Link className='hover:text-red-400' to='/feedback'>Feedback</Link>
        <Link className='hover:text-red-400' to='/cita'>Pide Cita</Link>
        <><Link className='hover:text-red-400' to='/usuario'>Mi perfil ({rolName})</Link></>
      </>

    ) :
      <>
        <Link className='hover:text-red-400' to='/conocenos'>Conócenos</Link>
        <Link className='hover:text-red-400' to='/feedback'>Feedback</Link>
        <Link className=' w-64 h-24 ml-4' to='/' />
        <Link className='hover:text-red-400' to='/cita'>Pide Cita</Link>
        <><Link className='hover:text-red-400' to='/usuario'>Mi perfil ({rolName})</Link></>
        
      </>
  }

  function navNotLogged(isBurger) {
    return isBurger === true ? (
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
          <Link className=' w-64 h-24 ml-4' to='/' />
          <Link className='hover:text-red-400' to='/centro'>Centros</Link>
          <Link className='hover:text-red-400' to='/login'>Iniciar Sesion</Link>
        </>
      )
  }

  function nav(isBurger) {
    const isLogged = sessionStorage.getItem("isLogged")

    if (isLogged === 'true') {
      return navLogged(isBurger, user.rol, locationPath)
    } else {
      return navNotLogged(isBurger)
    }

  }

  return (
    <div className="flex items-center justify-between border-b border-gray-400 bg-white bg-logo-completo bg-no-repeat bg-center h-20" onClick={() => setIsNavOpen((prev) => !prev)}>

      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          {/* <div
            className="HAMBURGER-ICON space-y-2 h-10"
            onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div> */}

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            {/* <div
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
            </div> */}
            <ul className="MENU-LINK-MOBILE-OPEN  flex flex-col items-center justify-between min-h-[250px] ">
              <img src={require('../../static/Logo-Completo.png')} alt="Logo Completo" />
              {nav(true)}
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden lg:grid grid-rows-1 grid-cols-5 items-center text-center">
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
        z-index: 9999;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  );
}