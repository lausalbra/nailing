export function PictureLeft({ text, image }) {
    return (
        <div className="flex text-justify items-center ">
            <img src={image} alt="img" className="max-w-full float-left" />
            <p className="ml-5 m-10">{text}</p>
        </div>)
}