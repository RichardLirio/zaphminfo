import React, { useState, useRef } from "react";
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
import { parseISO, format , startOfDay, startOfMonth} from "date-fns";

import { i18n } from "../../translate/i18n";

import Title from "./Title";
import useTickets from "../../hooks/useTickets";

const ChartMonth = () => {
	const theme = useTheme();

	const date = useRef(new Date().toISOString());
	const { tickets } = useTickets({ date: date.current });
	const [mes,setMesdata]= useState("01");

	const [chartData, setChartData,] = useState([
		{ time: "01", amount: 0 },
		{ time: "02", amount: 0 },
		{ time: "03", amount: 0 },
		{ time: "04", amount: 0 },
		{ time: "05", amount: 0 },
		{ time: "06", amount: 0 },
		{ time: "07", amount: 0 },
		{ time: "08", amount: 0 },
		{ time: "09", amount: 0 },
		{ time: "10", amount: 0 },
		{ time: "11", amount: 0 },
		{ time: "12", amount: 0 },
		{ time: "13", amount: 0 },
		{ time: "14", amount: 0 },
		{ time: "15", amount: 0 },
		{ time: "16", amount: 0 },
		{ time: "17", amount: 0 },
		{ time: "18", amount: 0 },
		{ time: "19", amount: 0 },
		{ time: "20", amount: 0 },
		{ time: "21", amount: 0 },
		{ time: "22", amount: 0 },
		{ time: "23", amount: 0 },
		{ time: "24", amount: 0 },
		{ time: "25", amount: 0 },
		{ time: "26", amount: 0 },
		{ time: "27", amount: 0 },
		{ time: "28", amount: 0 },
		{ time: "29", amount: 0 },
		{ time: "30", amount: 0 },
		{ time: "31", amount: 0 },
	]);


	function MonthPicker() {
		return (
		  <label>
			Selecione o mês : 
			<select name="selectedFruit" value={mes}
			onChange={e => {
				setMesdata(e.target.value);
				}}>
			  <option value="01">January</option>
			  <option value="02">February</option>
			  <option value="03">March</option>
			  <option value="04">April</option>
			  <option value="05">May</option>
			  <option value="06">June</option>
			  <option value="07">July</option>
			  <option value="08">August</option>
			  <option value="09">September</option>
			  <option value="10">October</option>
			  <option value="11">November</option>
			  <option value="12">December</option>
			</select>
			<button onClick={() =>setChartData(prevState => {
			let aux = [...prevState];
			let year = format(startOfMonth(parseISO(date.current)), "yyyy");

			aux.forEach(a => {
				tickets.forEach(ticket => {
					format(startOfDay(parseISO(ticket.createdAt)),"dd/MM/yyyy") === (a.time+"/"+mes+"/"+year) ?
						a.amount++ : a.amount = 0;
				});
				
			});
			

			return aux;
		})}>
        	Clique aqui
      		</button>
		  </label>
			
		);}

	// useEffect(() => {
		
	// 	setChartData(prevState => {
	// 		let aux = [...prevState];
	// 		let year = format(startOfMonth(parseISO(date.current)), "yyyy");

	// 		aux.forEach(a => {
	// 			tickets.forEach(ticket => {
	// 				format(startOfDay(parseISO(ticket.createdAt)),"dd/MM/yyyy") === (a.time+"/"+"/"+year) &&
	// 					a.amount++;
	// 			});
	// 		});

	// 		return aux;
	// 	});
	// }, [tickets]);

	
	

	return (
		<React.Fragment>
			<MonthPicker></MonthPicker>
			<Title>{`${i18n.t("dashboard.charts.perMonth.title")}`}</Title>
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

export default ChartMonth;
