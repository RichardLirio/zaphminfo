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
	Tooltip
} from "recharts";
import { parseISO, format , startOfMonth} from "date-fns";

import { i18n } from "../../translate/i18n";

import Title from "./Title";
import useTickets from "../../hooks/useTickets";

const ChartYear = () => {
	const theme = useTheme();

	const date = useRef(new Date().toISOString());
	const { tickets } = useTickets({ showAll: true, status:"closed" });

	const [chartData, setChartData] = useState([
		{ time: "January", tickets: 0 },
		{ time: "February", tickets: 0 },
		{ time: "March", tickets: 0 },
		{ time: "April", tickets: 0 },
		{ time: "March", tickets: 0 },
		{ time: "June", tickets: 0 },
		{ time: "July", tickets: 0 },
		{ time: "August", tickets: 0 },
		{ time: "September", tickets: 0 },
		{ time: "October", tickets: 0 },
		{ time: "November", tickets: 0 },
		{ time: "December", tickets: 0 },
	]);

	useEffect(() => {
		setChartData(prevState => {
			let aux = [...prevState];
			let year = format(startOfMonth(parseISO(date.current)), "yyyy");

			aux.forEach(a => {
				tickets.forEach(ticket => {
					format(startOfMonth(parseISO(ticket.createdAt)), "MMMM/yyyy") === (a.time +"/"+year) &&
						a.tickets++;
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
					<Tooltip />
					<Bar dataKey="tickets" fill={theme.palette.primary.main} />
				</BarChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
};

export default ChartYear;
