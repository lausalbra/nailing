import { Picture } from '../../components/Picture'
import { PictureLeft } from '../../components/PictureLeft';
import logoInicial from '../../static/Logo-Inicial.png'
import { data } from '../../static/static-text'
import botes from '../../static/Landing2.png'
export function Landing() {
    return (
        <>
            <Picture image={botes} />
            <PictureLeft image={logoInicial} text={data.introduccion} ></PictureLeft>
        </>
    )
}