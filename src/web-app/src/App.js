import './App.css'
import { Landing } from './views/Landing'
import { Login } from './views/Login'
import { Feedback } from './views/Feedback'
import { Route } from 'wouter'
import { BookingsList } from './views/BookingsList'
import { Usuario } from './views/Usuario'
import { Conocenos } from './views/Conocenos'
import { Cita } from './views/Cita'
import { MisCitasList } from './views/MisCitasList'
import { Error } from './views/Error'
import { ServiciosCentro } from './views/ServiciosCentro'
import { Centro } from './views/Centro'
import { DemoServiciosCentro } from './views/DemoServiciosCentro'
function App() {
  return (

    <div className='overflow-auto'>
      <div className=' bg-slate-100 '>
        {/* Las rutas entran en orden de matching por lo que la menos especifica va al final */}
        <div className='w-4/5 bg-white mx-auto min-h-screen shadow-2xl shadow-pink-300 '>
          <Route path='/login' component={Login} />
          <Route path='/usuario' component={Usuario} />
          <Route path='/centrodetalle/:id' component={Centro} />
          <Route path='/centro' component={BookingsList} />
          <Route path='/conocenos' component={Conocenos} />
          <Route path='/cita' component={BookingsList} />
          <Route path='/feedback' component={Feedback} />
          <Route path='/miscitas' component={MisCitasList} />
          <Route path='/personalizacion' component={Cita} />
          <Route path='/servicios' component={ServiciosCentro} />
          <Route path='/error' component={Error} />
          <Route path='/demoservicioscentro' component={DemoServiciosCentro} />
          <Route path='/' component={Landing} />
        </div>

      </div>
    </div>
  )
}

export default App