import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { RegistroServiciosCentroForm } from "../../components/RegistroServiciosCentroForm";

export function DemoServiciosCentro() {
    return (
        <>
            <Header />
            <Card title={"Registro Servicio"} component={<RegistroServiciosCentroForm />} />

        </>
    )
}