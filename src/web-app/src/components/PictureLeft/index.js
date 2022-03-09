export function PictureLeft({ text, image }) {
    return (
        <div className="">
            <p >{text}</p>
            <picture className="float-left">
                <img src={image} alt="img" className="max-w-full" />
            </picture>
        </div>)
}