//"use client"

import LatestOrderItem from "@/components/order/LatestOrderItem";
import Logo from "@/components/ui/Logo";
import prisma from "@/lib/prisma";
//import useSWR from 'swr'

async function getReadyOrders(){
  const orders = await prisma.order.findMany({
        where: {
          status: true,
          paid: false
        },
        include: {
          orderProducts: {
              include: {
                product: true
              }
          }
        }
    })

    return orders
}

export default async function OrdersPage() {

  // const url = '/orders/api'
  // const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
  // const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
  //   refreshInterval: 60000,
  //   revalidateOnFocus: false
  // })

  //if(isLoading) return <p>Cargando...</p>

  const orders = await getReadyOrders()

  return (
    <>
        <h1 className="text-center mt-20 text-6xl font-black">Ordenes Pendientes de pago</h1>

        <Logo />

        {orders.length ? (
            <div className="grid grid-cols-3 gap-5 max-w-7xl mx-auto mt-10">
                {orders.map(order => (
                    <LatestOrderItem order={order} key={order.id} />
                ))}
            </div>
        ) : <p className="text-center my-10">No hay ordenes listas</p>}

    </>
  )
}
