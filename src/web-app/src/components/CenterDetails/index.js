export function CenterDetails({ image, address, rating }) {
    return (
        <div className="flex items-center">
            <img src={image} alt="img" className="max-w-full float-left" />
            <div className="ml-5 items-center">
                <p><strong>Dirección:</strong> {address}</p>
                <p><strong>Valoración:</strong> {rating}</p>
            </div>
        </div>)
}