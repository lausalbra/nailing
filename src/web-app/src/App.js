import './App.css'
import { Landing } from './views/Landing'
import { Login } from './views/Login'
import { Feedback } from './views/Feedback'
import { Route } from 'wouter'
import { BookingsList } from './views/BookingsList'
import { Usuario } from './views/Usuario'
import { Conocenos } from './views/Conocenos'
import { TerminosCondiciones } from './views/TerminosCondiciones'
import { Cita } from './views/Cita'
import { MisCitasList } from './views/MisCitasList'
import { Error } from './views/Error'
import { ServiciosCentro } from './views/ServiciosCentro'
import { Centro } from './views/Centro'
import { EditarUsuario } from './views/EditarUsuario'
import { RegistroUsuario } from './views/RegistroUsuario'
import { CentroEdit } from './views/CentroEdit'
import { CentroAdd } from './views/CentroAdd'
import { DemoServiciosCentro } from './views/DemoServiciosCentro'
import { CreditosAtrasados } from './views/CreditosAtrasados'
import { ComprarPaquete } from './views/ComprarPaquete'
import { LogOut } from './views/LogOut'

function App() {
  return (
    <div class='bg-auto'>
      <div className='overflow-scroll'>
        <div className='bg-slate-100'>
          {/* Las rutas entran en orden de matching por lo que la menos especifica va al final */}
          <div style={{ background: 'linear-gradient(145deg, rgba(255,226,239,1) 25%, rgba(217,235,255,1) 100%)' }}
            className='container mx-auto w-4/5 font-josefin-sans bg-main-gradient min-h-screen shadow-2xl shadow-pink-300'>
            <Route path='/login' component={Login} />
            <Route path='/usuario' component={Usuario} />
            <Route path='/centrodetalle/:id' component={Centro} />
            <Route path='/centroedit/:id' component={CentroEdit} />
            <Route path='/centroadd' component={CentroAdd} />
            <Route path='/centro' component={BookingsList} />
            <Route path='/conocenos' component={Conocenos} />
            <Route path='/cita' component={BookingsList} />
            <Route path='/feedback' component={Feedback} />
            <Route path='/miscitas' component={MisCitasList} />
            <Route path='/personalizacion' component={Cita} />
            <Route path='/servicios' component={ServiciosCentro} />
            <Route path='/error' component={Error} />
            <Route path='/usuario/edit' component={EditarUsuario} />
            <Route path='/register' component={RegistroUsuario} />
            <Route path='/demoservicioscentro' component={DemoServiciosCentro} />
            <Route path='/creditosAtrasados' component={CreditosAtrasados} />
            <Route path='/comprarPaquete' component={ComprarPaquete} />
            <Route path='/terminoscondiciones' component={TerminosCondiciones} />
            <Route path='/logOut' component={LogOut} />
            <Route path='/' component={Landing} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
