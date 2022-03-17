import { Picture } from '../../components/Picture'
import { PictureLeft } from '../../components/PictureLeft';
import { PictureRight } from '../../components/PictureRight';
import logoInicial from '../../static/Logo-Inicial.png'
import chicaLanding from '../../static/landing3.jpg'
import bote from '../../static/Landing1-1280x720.png'
import botes from '../../static/Landing2.png'
import { data } from '../../static/static-text'
export function Landing() {
    return (
        <>
            <Picture image={bote} />
            <PictureLeft image={logoInicial} text={data.introduccion} ></PictureLeft>
            <Picture image={botes} />
            <PictureRight image={chicaLanding} text={data.introduccion} ></PictureRight>

        </>



    )
}