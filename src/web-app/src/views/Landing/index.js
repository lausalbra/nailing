import { Picture } from '../../components/Picture'
import logoInicial from '../../static/Logo-Inicial.png'
import botes from '../../static/Landing2.png'
import { Header } from "../../components/Header"

export function Landing() {
    return (
        <>
            <Header />
            <Picture image={botes} />
            <div className="flex ">
                <img src={logoInicial} alt="img" className="max-w-full float-left" />
                <div className='text-xl'>
                    <p className="ml-5 m-5">Gracias por visitar Nailing . Aquí vas a poder reservar citas de forma autónoma de una manera sencilla e intuitiva conociendo en todo momento del proceso el coste y duración de la reserva. </p>
                    <p className="ml-5 m-5"> ¿Qué ofrecemos? </p>
                    <ul className='list-disc'>
                        <li className="ml-5 m-5">
                            <strong>Personalización total de la manicura:</strong>  Poder seleccionar hasta el más mínimo detalle con antelación cómodamente desde tu casa.
                        </li>
                        <li className="ml-5 m-10"> <strong>Optimización del tiempo:</strong> Evita la molesta pérdida de tiempo que se pierde explicando que quieres y cómo lo quieres ¡Simplemente llega y ponte guap@!  </li>
                    </ul>
                </div>
            </div>
        </>
    )
}