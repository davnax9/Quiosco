"use client"

import { Dialog,DialogPanel,DialogTitle} from "@headlessui/react"
import { useState } from "react"

type PaymentModalProps = {
  open: boolean
  onClose: () => void
  onConfirm: (paymentMethod: string) => void
}

export default function PaymentModal({open, onClose, onConfirm}: PaymentModalProps) {

  const [paymentMethod, setPaymentMethod] = useState("")

  const handleConfirm = () => {
    if (!paymentMethod) return

    onConfirm(paymentMethod)
    setPaymentMethod("")
  }

  const handleClose = () => {
    setPaymentMethod("")
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">

      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* Contenedor */}
      <div className="fixed inset-0 flex items-center justify-center p-4">

        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

          <DialogTitle className="text-xl font-bold">Confirmar pago</DialogTitle>

          <p className="mt-2 text-gray-500">Selecciona la forma de pago.</p>

          <select
            className="mt-5 w-full rounded-md border p-2"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Seleccione...</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Transferencia">Transferencia</option>
          </select>

          <div className="mt-6 flex justify-end gap-3">

            <button onClick={handleClose} className="rounded bg-gray-200 px-4 py-2">
              Cancelar
            </button>

            <button onClick={handleConfirm} className="rounded bg-green-600 px-4 py-2 text-white">
              Confirmar
            </button>

          </div>

        </DialogPanel>

      </div>

    </Dialog>
  )
}