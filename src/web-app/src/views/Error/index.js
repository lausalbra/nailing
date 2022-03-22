import dinosaurio from '../../static/error.gif'
import { Picture } from '../../components/Picture'

export function Error() {

    const msg = sessionStorage.getItem("errorMessage")

    return (
        <>
            <h1 className='text-4xl text-center m-5 text-pink-300 '> ¡Oops! Algo ha ido mal...</h1>
            {{ msg } != null ? <p className='text-2xl text-center text-red-500'> {msg} </p> : ""}

            <Picture image={dinosaurio} />


        </>

    )

}