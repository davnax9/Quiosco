"use client"

import { formatCurrency } from "@/src/utils"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

const COLORS = [
    "#FFD75E",
    "#8C9EFF",
    "#B53F28",
    "#28B59D"
]

type Props = {
    data: {
        name: string
        value: number
    }[],
    tipo: number
}

export default function PaymentChart({ data, tipo }: Props) {

    return (

        <ResponsiveContainer width="100%" height={350}>

            <PieChart>

                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey={tipo === 1 ? 'value' : 'value2'}
                    nameKey="name"
                    label={({ value }) =>
                        tipo === 1
                            ? value
                            : formatCurrency(value)
                    }
                >

                    {data.map((entry, index) => (
                        <Cell
                            key={entry.name}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}

                </Pie>

                <Tooltip formatter={(value: number) => formatCurrency(value)}/>

                <Legend />

            </PieChart>

        </ResponsiveContainer>
    )
}