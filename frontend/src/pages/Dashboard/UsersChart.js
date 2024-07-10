import React, { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
	BarChart,
	CartesianGrid,
	Bar,
	XAxis,
	YAxis,
	Label,
	ResponsiveContainer,
	Tooltip
} from "recharts";

import Title from "./Title";

import useTickets from "../../hooks/useTickets";

import useUsers from "../../hooks/useUsers";

const UserChart = () => {
	const theme = useTheme();
	const { tickets } = useTickets({ showAll: true, status:"closed" });

    const { users } = useUsers({showAll: true});
    const nomes = [];
    
    users.forEach(user => {
        nomes.push({name: user.name, tickets:0, id: user.id});
            
    });

    const [chartData, setChartData] = useState([nomes]);

	useEffect(() => {
		setChartData(() => {
			let aux = [...nomes];
			

			aux.forEach(a => {
				tickets.forEach(ticket => {
					if(ticket.status === "closed"){
					(ticket.userId) === (a.id) &&
						a.tickets++}
				})
			});
			return aux;
		});
	}, [users,tickets]);
	
	return (
		<React.Fragment>
			<Title>{`Total de Tickets Fechados por Usuários:`}</Title>
			<ResponsiveContainer>
				<BarChart
					data={chartData}
					barSize={40}
					width={730}
					height={250}
					margin={{
						top: 16,
						right: 16,
						bottom: 0,
						left: 24,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" stroke={theme.palette.text.secondary} />
					<YAxis
						type="number"
						allowDecimals={false}
						stroke={theme.palette.text.secondary}
					>
						<Label
							angle={270}
							position="left"
							style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
						>
							Tickets
						</Label>
					</YAxis>
					<Tooltip />
					<Bar dataKey="tickets" fill={theme.palette.primary.main} />
				</BarChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
};

export default UserChart;
