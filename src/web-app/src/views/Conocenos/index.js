import { CardWorker } from '../../components/CardWorker';
import candela from '../../static/ImagenesEquipo/Candela.png'
import dani from '../../static/ImagenesEquipo/Dani.png'
import david from '../../static/ImagenesEquipo/David.png'
import gonza from '../../static/ImagenesEquipo/Gonza.png'
import guille from '../../static/ImagenesEquipo/Guille.png'
import hegoa from '../../static/ImagenesEquipo/Hegoa.png'
import jacobo from '../../static/ImagenesEquipo/Jacobo.png'
import jaime from '../../static/ImagenesEquipo/Jaime.png'
import javi from '../../static/ImagenesEquipo/Javi.png'
import laura from '../../static/ImagenesEquipo/Laura.png'
import vicen from '../../static/ImagenesEquipo/Vicen.png'
import { Header } from "../../components/Header"

export function Conocenos() {

    return (
        <>
            <Header />
            <h1 className='p-5 text-2xl underline'><i>Equipo Back-End</i></h1>
            <div className='grid grid-rows-1 grid-cols-6 items-center'>
                <CardWorker photo={candela} name="Candelaria" role="Analista Programadora" mail="candelajordano @gmail.com" />
                <CardWorker photo={jaime} name="Jaime" role="BackEnd Manager Programador" mail="j23rl07@gmail.com" />
                <CardWorker photo={jacobo} name="Jacobo" role="Programador" mail="jacobo.estudiante16 @gmail.com" />
                <CardWorker photo={david} name="David" role="Presentador Programador" mail="daviddbsdude @gmail.com" />
                <CardWorker photo={hegoa} name="Hegoa" role="Programador" mail="hegoaria@gmail.com" />

            </div>

            <h1 className='p-5 text-2xl underline'><i>Equipo Front-End</i></h1>
            <div className='grid grid-rows-1 grid-cols-6'>

                <CardWorker photo={dani} name="Daniel" role="Programador" mail="danielcaroolmedo2 @gmail.com" />
                <CardWorker photo={gonza} name="Antonio" role="Secretario Programador" mail="antoniogg696 @gmail.com" />
                <CardWorker photo={laura} name="Laura" role="Project Manager Programadora" mail="laurasalgadobravo @gmail.com" />
                <CardWorker photo={javi} name="Javier" role="FrontEnd Manager Programador" mail="ajaviermorenogonzalez @gmail.com" />
                <CardWorker photo={vicen} name="Vicente" role="Programador" mail="visorvaz@gmail.com" />
                <CardWorker photo={guille} name="Guillermo" role="Programador" mail="guillelrosado @gmail.com" />

            </div>
        </>

    )

}