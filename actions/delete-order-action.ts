"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteOrder(id: number) {
    try {
        await prisma.$transaction([
            prisma.orderProducts.deleteMany({
                where: {
                    orderId: id
                }
            }),
            prisma.order.delete({
                where: {
                    id: id
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