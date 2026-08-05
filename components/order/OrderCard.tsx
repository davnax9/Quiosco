"use client"

import { completeOrder } from "@/actions/complete-order-action"
import { deleteOrder } from "@/actions/delete-order-action"
import { deleteProductOrder } from "@/actions/delete-product-in-order-action"
import { OrderWithProducts } from "@/src/types"
import { formatCurrency } from "@/src/utils"
import { TrashIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { toast } from "react-toastify"

type OrderCardProps = {
    order: OrderWithProducts
}

export default function OrderCard({ order }: OrderCardProps) {

    const handleClickTrash = async() => {
        const confirmed = window.confirm(
            `¿Estás seguro que deseas eliminar la orden?`
        )

        if (!confirmed) return

        const resp = await deleteOrder(order.id)

        if(!resp.success) {
            toast.error("No pudo ser eliminada la orden")
            return
        }
        
        toast.success("Orden eliminada correctamente")
    }

    const handleTrashProduct = async(id: number, price: number) => {
        const confirmed = window.confirm(
            `¿Estás seguro que deseas eliminar el producto de la orden?`
        )

        if (!confirmed) return
        const resp = await deleteProductOrder(id, order.total - price, order.id)

        if(!resp.success) {
            toast.error("No se pudo eliminar el producto de la orden")
            return
        }   

        toast.success("Se actualizó orden")
    }

    return (
        <section aria-labelledby="summary-heading" className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4">
            <div className="flex justify-between items-center text-red-600 hover:text-red-700">
                <p className='text-2xl font-medium text-gray-900'>Cliente: {order.name}</p>
                <TrashIcon className="w-8 h-8" onClick={handleClickTrash}/>
            </div>
            <p className='text-lg font-medium text-gray-900'>Productos Ordenados: </p>
            <dl className="mt-6 space-y-4">
                {order.orderProducts.map(product => (
                    <div key={product.productId} className="flex items-center gap-2 border border-t border-gray-200 pt-4">
                        <dt className="flex items-center text-sm text-gray-600">
                            <span className="font-black">({product.quantity}) {''}</span>
                        </dt>
                        <dd className="text-sm font-medium text-gray-900">{product.product.name}</dd>
                        <XCircleIcon className="text-red-600 hover:text-red-700 w-5 h-5" onClick={() => handleTrashProduct(product.id, product.product.price)} />
                    </div>
                ))}
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Total a Pagar: {formatCurrency(order.total)}</dt>
                    <dd className="text-base font-medium text-gray-900">{}</dd>
                </div>
            </dl>

            <form action={completeOrder}>
                <input type="hidden" value={order.id} name="order_id" />
                <input
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    value='Marcar Orden Completada'
                />
            </form>
        </section>
    )
}