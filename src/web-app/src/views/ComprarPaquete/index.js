import { ComprarPaqueteComponent } from "../../components/ComprarPaqueteComponent";
import { Header } from "../../components/Header";
import { Card } from "../../components/Card"
export function ComprarPaquete() {
    return (
        <>
            <Header />
            <Card title={"Comprar Subscripción"} component={<ComprarPaqueteComponent />} />
        </>
    )
}