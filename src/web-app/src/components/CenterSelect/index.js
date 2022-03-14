import {CenterButton} from '../Center'
export function CenterSelect() {

    function updateSelector(index) {
        console.log("test")
        for (let b in botones) {
            b.id === index ?
                b.setSelected(!b.selected) :
                b.setSelected(false)
        }
    }

    let centros = [[0, "Centro 1"], [1, "Centro 2"], [2, "Centro 3"], [3, "Centro 4"]]
    let botones = centros.map((el) =>
    <CenterButton id={el[0]} name={el[1]} onClick={updateSelector(el[0])}/>)
    

    return (
        <>
            {botones}
        </>
    )
}