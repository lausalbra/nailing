import { UserDetails } from '../../components/UserDetails';
import { Nombre } from '../../components/Nombre';
import fotoPerfil from '../../static/Foto-Perfil.jpg'

export function Usuario() {
    return (
        <>
            <Nombre name={'Name'} ></Nombre>
            <UserDetails image={fotoPerfil} email={'email@gmail.com'} phone={'987654321'}  ></UserDetails>

        </>



    )
}