export function PictureRight({ text, image }) {
    return (
        <div className="flex text-justify items-center">
            <p className="mr-5">{text}</p>
            <img src={image} alt="img" className="max-w-full float-right" />
        </div>)
}