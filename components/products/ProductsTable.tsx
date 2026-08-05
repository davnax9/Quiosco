"use client"
import { Category, Product } from "@/src/generated/prisma/client"
import { formatCurrency } from "@/src/utils"
import Link from "next/link"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import { deleteProduct } from "@/actions/delete-product-action"
import { toast } from "react-toastify"

type ProductTableProps = {
    products: ({
        category: Category;
    } & Product)[]
}

export default function ProductTable({products}: ProductTableProps) {

    const handleClick = async (id: number) => {
        const confirmed = window.confirm(
            `¿Estás seguro que deseas eliminar?`
        )

        if (!confirmed) return

        const result = await deleteProduct(id)

        if (!result.success) {
            toast.error("No se pudo eliminar el producto")
            return
        }

        toast.success("Producto eliminado correctamente")
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 mt-20">
            <div className="mt-8 flow-root ">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 ">
                        <table className="min-w-full divide-y divide-gray-300 ">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        Producto
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Precio
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Costo
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Categoría
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Acciones</span>Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                            {product.name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {formatCurrency(product.price)}
                                        </td> 
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {formatCurrency(product.cost)}
                                        </td> 
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {product.category.name}
                                        </td>
                                        {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"> */}
                                        <td className="whitespace-nowrap py-4 px-4">
                                            <div className="flex justify-center gap-3">
                                                <Link href={`/admin/products/${product.id}/edit`} className="text-indigo-600 hover:text-indigo-800">
                                                    {/* <PencilSquareIcon className='w-8 h-8' /><span className="sr-only">, {product.name}</span> */}
                                                    <PencilSquareIcon className='w-4 h-4' />
                                                </Link>
                                                <button onClick={() => handleClick(product.id)} className="text-red-600 hover:text-red-800">
                                                    <TrashIcon className='w-4 h-4' />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}