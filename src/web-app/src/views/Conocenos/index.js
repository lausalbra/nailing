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


export function Conocenos() {

    return (
        <>
            <h1 className='p-5 text-2xl underline'><i>Equipo Back-End</i></h1>
            <div className='grid grid-rows-1 grid-cols-6 items-center'>
                <CardWorker photo={candela} name="Candelaria" role="Analista Programadora" mail="janedoe@hotmail.es" />
                <CardWorker photo={jaime} name="Jaime" role="BackEnd Manager Programador" mail="janedoe@hotmail.es" />
                <CardWorker photo={jacobo} name="Jacobo" role="Programadora Presentadora" mail="janedoe@hotmail.es" />
                <CardWorker photo={david} name="David" role="Programadora Presentadora" mail="janedoe@hotmail.es" />
                <CardWorker photo={hegoa} name="Hegoa" role="Programadora Presentadora" mail="janedoe@hotmail.es" />

            </div>

            <h1 className='p-5 text-2xl underline'><i>Equipo Front-End</i></h1>
            <div className='grid grid-rows-1 grid-cols-6'>

                <CardWorker photo={dani} name="Daniel" role="Programadora Presentadora" mail="janedoe@hotmail.es" />
                <CardWorker photo={gonza} name="Antonio" role="Programadora Presentadora" mail="janedoe@hotmail.es" />
                <CardWorker photo={laura} name="Laura" role="Programadora Presentadora" mail="janedoe@hotmail.es" />
                <CardWorker photo={javi} name="Javier" role="Programadora Presentadora" mail="janedoe@hotmail.es" />
                <CardWorker photo={vicen} name="Vicente" role="Programadora Presentadora" mail="janedoe@hotmail.es" />
                <CardWorker photo={guille} name="Guillermo" role="Programadora Presentadora" mail="janedoe@hotmail.es" />

            </div>
        </>

    )

}