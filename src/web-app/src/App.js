import './App.css'
import { Header } from './components/Header'
import { Landing } from './views/Landing'
import { Route } from 'wouter'
import { BookingsList } from './views/BookingsList'
function App () {
  return (
    <div>
      <Header />
      <div className=' bg-white-100 min-h-screen grid grid-rows-[500px_300px_500px_300px]'>
        {/* Las rutas entran en orden de matching por lo que la menos especifica va al final */}
        <main className='w-4/5 mx-auto'>
          <Route path='/' component={Landing} />
          <Route path='/cita' component={BookingsList} />
        </main>
      </div>
    </div>
  )
}

export default App
