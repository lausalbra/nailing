import './App.css';
import { Header } from './components/Header'
import { Landing } from './views/Landing'
import { Login } from './views/Login'
import { Route } from 'wouter'
function App() {
  return (

    <div>
      <Header />
      <div className=" bg-white-100 min-h-screen grid grid-rows-[500px_300px_500px_300px]">
        {/* Las rutas entran en orden de matching por lo que la menos especifica va al final*/}
        <main className='w-4/5 mx-auto'>
          <Route path='/login' component={Login} />
          <Route path='/' component={Landing} />
        </main>
      </div>
    </div>
  );
}

export default App;
