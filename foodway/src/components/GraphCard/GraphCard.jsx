import React from 'react';
import { BarChart, Bar, Rectangle, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const GraphCard = (props) => {
    var data = [];
    props.dashData.map((item) => {
        data.push({
            nome: item.name,
            quantidade: item.quantity
        })
    })

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
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="quantidade" fill="var(--primary)" activeBar={<Rectangle fill="#8B0000" stroke="var(--primary)" />} />
        </BarChart>
    );
};

export default GraphCard;
