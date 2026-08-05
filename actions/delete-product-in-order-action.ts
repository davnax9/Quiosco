"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteProductOrder(id: number, total: number, orderId: number) {
    try {
        await prisma.$transaction([
            prisma.orderProducts.delete({
                where: {
                    id: id
                }
            }),
            prisma.order.update({
                where: {
                    id: orderId
                },
                data: {
                    total: total
                }
            })
        ])       

        revalidatePath("/admin/orders")
    
        return {
            success: true
        }
        
    } catch (error) {
        return {
            success: false,
        }
    }
}