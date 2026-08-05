//"use client"

import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// import useSWR from 'swr'

async function getPendingOrders(){
  const orders = await prisma.order.findMany({
        where: {
          status: false
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

  const orders = await getPendingOrders()

  // const url = '/admin/orders/api'
  // const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
  // const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
  //   refreshInterval: 60000
  // })

  // if(isLoading) return 'Cargando...'

  //if(data) return (
  return (
    <>
      <Heading>Administrar Ordenes</Heading>

      <form action={async() => {
        "use server"
        revalidatePath('/admin/orders')
      }}>
        <input type="submit" value='Actualizar ordenes' className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"/>
      </form>

      {orders.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
            {orders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
      ) : <p className="text-center">No hay ordenes pendientes</p> }
    </>
  )
}
