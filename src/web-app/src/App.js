import './App.css'
import { Header } from './components/Header'
import { Landing } from './views/Landing'
import { Login } from './views/Login'
import { Route } from 'wouter'
import { BookingsList } from './views/BookingsList'
import { Usuario } from './views/Usuario'
import { Centro } from './views/Centro'
import { Conocenos } from './views/Conocenos'
import { Cita } from './views/Cita'
function App() {
  return (

    <div className='overflow-auto'>
      <Header />
      <div className=" bg-slate-100 ">
        {/* Las rutas entran en orden de matching por lo que la menos especifica va al final*/}
        <div className='w-4/5 bg-white mx-auto min-h-screen shadow-2xl shadow-pink-300 '>
          <Route path='/login' component={Login} />
          <Route path='/usuario' component={Usuario} />
          <Route path='/centro' component={Centro} />
          <Route path='/conocenos' component={Conocenos} />
          <Route path='/cita' component={BookingsList} />
          <Route path='/personalizacion' component={Cita} />
          <Route path='/' component={Landing} />
        </div>
      </div>
    </div>
  )
}

export default App
