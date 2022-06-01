import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { ServiciosList } from "../../components/ServiciosList";

export function ServiciosCentro() {
    return (
        <>
            <Header />
            <Card title={"Registro Servicios"} component={<ServiciosList />} />

        </>
    )
}