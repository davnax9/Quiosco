import { getPaymentMethods, getTopProductsLastMonth } from "@/src/utils/dashboard"
import PaymentChart from "./PaymenethChart"
import TopProductsChart from "./TopProductsChart"


export default async function Dashboard() {
  const data = await getPaymentMethods()
  const topProducts = await getTopProductsLastMonth()

    return (
        <>
        <div className="flex justify-between items-center">
            <div className="mx-10 mt-10 rounded-lg shadow p-6 w-1/3">
                <h2 className="text-2xl font-bold mb-6">
                    Remisiones por Formas de pago
                </h2>
                <PaymentChart data={data} tipo={1} />
            </div>

            <div className="mx-10 mt-10 rounded-lg shadow p-6 w-1/3">
                <h2 className="text-2xl font-bold mb-6">
                    Pagos por Formas de pago
                </h2>
                <PaymentChart data={data} tipo={2} />
            </div>

            <div className="mx-10 mt-10 rounded-lg shadow p-6 w-1/3">
                <h2 className="text-2xl font-bold mb-6">
                    Productos mas vendidos
                </h2>
                <TopProductsChart
                    data={topProducts}
                />
            </div>
            
        </div>

        </>    
    )
}
