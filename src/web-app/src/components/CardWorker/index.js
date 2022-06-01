export function CardWorker({ photo, name, role, mail }) {
    return (
        <>
            <div className="border-2 border-pink-300 m-4 p-3 pb-1 h-80 w-44 rounded-md ">
                <img className="m-auto h-[175px] w-[120px]" src={photo} alt="Cara"></img>
                <p className="border-t-4 border-t-pink-300"><strong>{name}</strong></p>
                <p>{role}</p>
                <p><i>{mail}</i></p>
            </div>
        </>
    )
}