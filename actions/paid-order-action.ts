"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function paidOrder(id: number, paymentMethod: string) {
    try {
        await prisma.order.update({
            where: {
                id: id
            },
            data: {
                paid: true,
                paid_method: paymentMethod
            }
        })
    
        revalidatePath("/orders")
    
        return {
            success: true
        }
        
    } catch (error) {
        return {
            success: false,
        }
    }


}