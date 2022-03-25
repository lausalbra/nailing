import './App.css';
import { Header } from './components/Header'
import { Landing } from './views/Landing'
import { Feedback } from './views/Feedback'
import { Route } from 'wouter'
function App() {
  return (
    <div>
      <Header />
      <div className=" bg-white-100 min-h-screen grid grid-rows-[500px_300px_500px_300px]">
        {/* Las rutas entran en orden de matching por lo que la menos especifica va al final*/}
        <main className='w-4/5 mx-auto'>
        <div className='w-4/5 bg-white mx-auto min-h-screen shadow-2xl shadow-pink-300 '>
          <Route path='/feedback' component={Feedback} />
          <Route path='/' component={Landing} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
