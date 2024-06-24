import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
	BarChart,
	CartesianGrid,
	Bar,
	XAxis,
	YAxis,
	Label,
	ResponsiveContainer,
} from "recharts";
import { parseISO, format , startOfMonth} from "date-fns";

import { i18n } from "../../translate/i18n";

import Title from "./Title";
import useTickets from "../../hooks/useTickets";

const ChartYear = () => {
	const theme = useTheme();

	const date = useRef(new Date().toISOString());
	const { tickets } = useTickets({ date: date.current });
	

	const [chartData, setChartData] = useState([
		{ time: "January", amount: 0 },
		{ time: "February", amount: 0 },
		{ time: "March", amount: 0 },
		{ time: "April", amount: 0 },
		{ time: "March", amount: 0 },
		{ time: "June", amount: 0 },
		{ time: "July", amount: 0 },
		{ time: "August", amount: 0 },
		{ time: "September", amount: 0 },
		{ time: "October", amount: 0 },
		{ time: "November", amount: 0 },
		{ time: "December", amount: 0 },
	]);
	

	useEffect(() => {
		setChartData(prevState => {
			let aux = [...prevState];
			let year = format(startOfMonth(parseISO(date.current)), "yyyy");

			aux.forEach(a => {
				tickets.forEach(ticket => {
					format(startOfMonth(parseISO(ticket.createdAt)), "MMMM/yyyy") === (a.time +"/"+year) &&
						a.amount++;
				});
			});

			return aux;
		});
	}, [tickets]);

	return (
		<React.Fragment>
			<Title>{`${i18n.t("dashboard.charts.perYear.title")}${
				tickets.length
			}`}</Title>
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
					<XAxis dataKey="time" stroke={theme.palette.text.secondary} />
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
					<Bar dataKey="amount" fill={theme.palette.primary.main} />
				</BarChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
};

export default ChartYear;
