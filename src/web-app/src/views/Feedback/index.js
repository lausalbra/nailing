import { Picture } from '../../components/Picture'
import { PictureLeft } from '../../components/PictureLeft';
import { PictureRight } from '../../components/PictureRight';
import logoInicial from '../../static/Logo-Inicial.png'
import chicaLanding from '../../static/landing3.jpg'
import { data } from '../../static/static-text'
export function Feedback() {
    return (
        <>
            <Picture image="bg-pintauñas-big" />
            <PictureLeft image={logoInicial} text={data.introduccion} ></PictureLeft>
            <Picture image="bg-botes-landing" />
            <PictureRight image={chicaLanding} text={data.introduccion} ></PictureRight>

        </>



    )
}