"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteProduct(id: number) {
    try {
        await prisma.product.delete({
            where: {
                id: id
            }
        })
    
        revalidatePath("/admin/products")
    
        return {
            success: true
        }
        
    } catch (error) {
        return {
            success: false,
        }
    }


}