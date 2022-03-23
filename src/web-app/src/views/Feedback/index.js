import { FeedbackForm } from "../../components/FeedbackForm"
import { Card } from "../../components/Card"
import { Header } from "../../components/Header"
export function Feedback() {
    return (
        <>
            <Header />
            <Card title="FeedBack" component={<FeedbackForm />}>
            </Card>
        </>



    )
}
