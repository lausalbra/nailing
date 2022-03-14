import React from "react";
export function CenterButton({id, name}) {
    const useState = React.useState;
    const [selected, setSelected] = useState(false);

    return (
        <div>
            <button
                className={"border-2 " +
                    (selected === true ? 'border-red-300' : 'border-white')
                }>{name}</button>
        </div>
    )
}