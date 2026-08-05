import prisma from "@/lib/prisma"

export async function getPaymentMethods() {

    const payments = await prisma.order.groupBy({
        by: ["paid_method"],

        _count: {
            paid_method: true
        },

        _sum: {
            total: true
        },

        where: {
            paid: true
        }
    })

    return payments.map(payment => ({
        name: payment.paid_method,
        value: payment._count.paid_method,
        value2: payment._sum.total
    }))
}

export async function getTopProductsLastMonth() {

    const lastMonth = new Date()
    lastMonth.setMonth(lastMonth.getMonth() - 1)

    const topProducts = await prisma.orderProducts.groupBy({
        by: ["productId"],

        where: {
            order: {
                paid: true,
                date: {
                    gte: lastMonth
                }
            }
        },

        _sum: {
            quantity: true
        },

        orderBy: {
            _sum: {
                quantity: "desc"
            }
        },

        take: 5
    })

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: topProducts.map(item => item.productId)
            }
        },

        select: {
            id: true,
            name: true
        }
    })

    return topProducts.map(item => ({
        product: products.find(
            p => p.id === item.productId
        )?.name ?? "Sin nombre",

        quantity: item._sum.quantity ?? 0
    }))
}