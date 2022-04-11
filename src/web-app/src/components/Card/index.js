export function Card({ title, component }) {

    return (

        <>
            <div className="grid h-full place-items-center">
                <h2 className="text-5xl m-10">{title}</h2>
                {component}
            </div>
        </>
    )

}