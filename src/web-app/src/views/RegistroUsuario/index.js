import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { RegistroUsuarioForm } from "../../components/RegistroUsuarioForm";

export function RegistroUsuario() {
    return (
        <>
            <Header />
            <Card component={<RegistroUsuarioForm />} title="Registro de Usuario" />
        </>
    )
}