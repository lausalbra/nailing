import { LoginForm } from "../../components/LoginForm"
import { Card } from "../../components/Card"
export function Login() {
    return (

        <>
            <Card component={<LoginForm />}>
            </Card>
        </>
    )
}