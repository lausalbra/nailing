import { CenterDetails } from '../../components/CenterDetails';
import { Nombre } from '../../components/Nombre';
import foto from '../../static/Logo-Inicial.png'

export function Centro() {
    return (
        <>
            <Nombre name={'Name'} ></Nombre>
            <CenterDetails image={foto} address={'C/calle nº1'} rating={'5'}  ></CenterDetails>

        </>



    )
}