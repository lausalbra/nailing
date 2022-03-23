export function Picture({ image }) {

    return (
        <div className="block clear-both min-w-fit ">
            <img src={image} alt="img" className="min-w-full max-h-[400px]" />
        </div>)
}