import './App.css';
import { Header } from './components/Header'
import { Landing } from './views/Landing'
import { Login } from './views/Login'
import { Route } from 'wouter'
import { Usuario } from './views/Usuario';
import { Centro } from './views/Centro';
function App() {
  return (

    <div>
      <Header />
      <div className=" bg-slate-100 min-h-screen ">
        {/* Las rutas entran en orden de matching por lo que la menos especifica va al final*/}
        <div className='w-4/5 bg-white mx-auto min-h-screen overflow-y-hidden shadow-2xl shadow-pink-300 '>
          <Route path='/login' component={Login} />
          <Route path='/' component={Landing} />
          <Route path='/usuario' component={Usuario} />
          <Route path='/centro' component={Centro} />
        </div>
      </div>
    </div>
  );
}

export default App;
