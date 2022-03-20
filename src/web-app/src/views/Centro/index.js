import { CenterDetails } from '../../components/CenterDetails';
import { Nombre } from '../../components/Nombre';
import fotoPerfil from '../../static/Foto-Perfil.jpg'

export function Centro() {
    return (
        <>
            <Nombre name={'Name'} ></Nombre>
            <CenterDetails image={fotoPerfil} name={'Nombre'} address={'C/calle nº1'} rating={'5'}  ></CenterDetails>

        </>



    )
}