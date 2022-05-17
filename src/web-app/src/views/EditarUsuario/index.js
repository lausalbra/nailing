import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { EditarUsuarioForm } from "../../components/EditarUsuarioForm";

export function EditarUsuario() {
    return (
        <>
            <Header />
            <Card component={<EditarUsuarioForm />} title="Edita tus datos" />
        </>
    )
}