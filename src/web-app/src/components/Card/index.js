export function Card({ title, component }) {

    return (

        <>
            <div className="grid h-full place-items-center">
                <h2 className="text-5xl shadow-[0_px_10px_5px_-5px] shadow-pink-300 m-10">{title}</h2>
                {component}
            </div>
        </>
    )

}