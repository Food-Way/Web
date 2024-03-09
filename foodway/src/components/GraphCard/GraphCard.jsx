import React from 'react';
import { BarChart, Bar, Rectangle, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const GraphCard = () => {
    const data = [
        {
            name: 'Segunda',
            quantidade: 2400,
        },
        {
            name: 'Terça',
            quantidade: 1398,
        },
        {
            name: 'Quarta',
            quantidade: 9800,
        },
        {
            name: 'Quinta',
            quantidade: 3908,
        },
        {
            name: 'Sexta',
            quantidade: 4800,
        },
        {
            name: 'Sábado',
            quantidade: 3800,
        },
        {
            name: 'Domingo',
            quantidade: 4300,
        },
    ];
    return (
        <BarChart
            width={600}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 50,
                left: 0,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="quantidade" fill="var(--primary)" activeBar={<Rectangle fill="#8B0000" stroke="var(--primary)" />} />
        </BarChart>
    );
};

export default GraphCard;
