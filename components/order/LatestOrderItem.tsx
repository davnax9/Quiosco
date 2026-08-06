"use client"

import { paidOrder } from "@/actions/paid-order-action"
import { OrderWithProducts } from "@/src/types"
import { formatCurrency } from "@/src/utils"
import { BanknotesIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { toast } from "react-toastify"
import PaymentModal from "./PaymenthModal"

type LatestOrderItemProps = {
    order: OrderWithProducts
}

export default function LatestOrderItem({order}: LatestOrderItemProps) {

  const [isOpen, setIsOpen] = useState(false)
//   const [paymentMethod, setPaymentMethod] = useState("")

  const handlePaid = async(paymentMethod: string) => {
    const result = await paidOrder(order.id, paymentMethod)

    if (!result.success) {
        toast.error("No se pudo marcar como pagada")
        return
    }
    
    setIsOpen(false)
    toast.success("Orden pagada correctamente")
  }

  return (
    <>
        <div className="bg-white shadow p-5 space-y-5 rounded-lg">
            <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-slate-600">Cliente: {order.name} <span className="text-sm">({formatCurrency(order.total)})</span></p>
                <BanknotesIcon className="text-green-600 hover:text-green-700 w-7 h-7" onClick={() => setIsOpen(true)}/>
            </div>
            <ul role="list" className="divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500">
                {order.orderProducts.map(product => (
                    <li key={product.id} className="flex py-6 text-lg">
                        <p><span className="font-bold">({product.quantity}) {''}</span>{product.product.name}</p>
                    </li>
                ))}
            </ul>
        </div>
                
        <PaymentModal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onConfirm={handlePaid}
        />
    </>
  )
}
