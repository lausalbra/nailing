import { Link } from 'wouter'
export function Header() {
  const isLogged = sessionStorage.getItem("isLogged")


  console.log(isLogged)


  return isLogged === 'true' ? (
    <>
      <nav className='flex justify-evenly items-center bg-logo-completo bg-white border-pink-200 border-b-2 bg-no-repeat bg-center  text-black sticky top-0 z-10'>
        <Link className='hover:text-red-400' to='/conocenos'>Conócenos</Link>
        <Link className='hover:text-red-400' to='/feedback'>Feedback</Link>
        <Link className='block w-64 h-20' to='/' />
        <Link className='hover:text-red-400' to='/cita'>Pide Cita</Link>
        <Link className='hover:text-red-400' to='/usuario'>Mi perfil</Link>
      </nav>
    </>
  ) : (
    <>
      <nav className='flex justify-evenly items-center bg-logo-completo bg-white border-pink-200 border-b-2 bg-no-repeat bg-center  text-black sticky top-0 z-10'>
        <Link className='hover:text-red-400' to='/conocenos'>Conócenos</Link>
        <Link className='hover:text-red-400' to='/feedback'>Feedback</Link>
        <Link className='block w-64 h-20' to='/' />
        <Link className='hover:text-red-400' to='/centro'>Centros</Link>
        <Link className='hover:text-red-400' to='/login'>Iniciar Sesion</Link>
      </nav>
    </>
  )
}
