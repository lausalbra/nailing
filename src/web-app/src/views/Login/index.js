import { LoginForm } from "../../components/LoginForm"
import { Card } from "../../components/Card"
import { Header } from "../../components/Header"
export function Login() {
    return (

        <>
            <Header />

            <Card title="Iniciar Sesión" component={<LoginForm />}>
            </Card>
        </>
    )
}