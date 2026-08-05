"use client"

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts"

type Props = {
    data: {
        product: string
        quantity: number
    }[]
}

export default function TopProductsChart({ data }: Props) {

    return (

        <ResponsiveContainer
            width="100%"
            height={350}
        >

            <BarChart
                data={data}
                layout="vertical"
                margin={{
                    top: 20,
                    right: 30,
                    left: 10,
                    bottom: 20
                }}
            >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                    // dataKey="product"
                    type="number"
                />

                <YAxis 
                    type="category"
                    dataKey="product"
                    width={100}
                />

                <Tooltip />

                <Bar
                    dataKey="quantity"
                    fill="#22c55e"
                    radius={[8, 8, 0, 0]}
                />

            </BarChart>

        </ResponsiveContainer>

    )
}