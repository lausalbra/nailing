import { Card } from "../../components/Card";
import { CreditosAtrasadosComponent } from "../../components/CreditosAtrasadosComponent";
import { Header } from "../../components/Header";

export function CreditosAtrasados() {
    return (
        <>
            <Header />

            <Card component={<CreditosAtrasadosComponent />} />
        </>
    )
}