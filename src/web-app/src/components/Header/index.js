import { Link } from "wouter"
export function Header() {

    return (
        <>
            <nav className='flex justify-evenly items-center bg-logo-completo bg-white border-pink-200 border-b-2 bg-no-repeat bg-center  text-black sticky top-0 z-10'>
                <Link className="hover:text-red-400" to="/conocenos">Conocenos</Link>
                <Link className="hover:text-red-400" to="/feedback">Feedback</Link>
                <Link className="block w-64 h-20" to="/"></Link>
                <Link className="hover:text-red-400" to="/centros">Centros</Link>
                <Link className="hover:text-red-400" to="/login">Iniciar Sesion</Link>
            </nav>
        </>)

}