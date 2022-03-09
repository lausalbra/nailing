import './App.css';
import { Header } from './components/Header'
import { Landing } from './views/Landing'
import { Route } from 'wouter'
function App() {
  return (
    <div className=" bg-white-100 min-h-screen grid grid-rows-[75px_500px]">
      <Header />
      {/* Las rutas entran en orden de matching por lo que la menos especifica va al final*/}
      <main className='w-4/5 mx-auto'>
        <Route path='/' component={Landing} />
      </main>
    </div>
  );
}

export default App;
