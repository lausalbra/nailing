import { Link } from "wouter"
export function Header() {
    return (
        <nav className='flex justify-evenly items-center bg-logo-completo bg-no-repeat bg-center bg-white  text-black sticky top-0 z-10'>

            <Link className="hover:text-red-400" to="/marca">La Marca</Link>
            <Link className="hover:text-red-400" to="/servicios">Servicios</Link>
            <Link className="block w-64 h-20" to="/"></Link>
            <Link className="hover:text-red-400" to="/contacto">Contacto</Link>
            <Link className="hover:text-red-400" to="/cita">Pide Cita</Link>

        </nav>)
}