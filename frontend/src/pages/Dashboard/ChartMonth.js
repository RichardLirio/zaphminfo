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
	const { tickets } = useTickets({ showAll: true , status:"closed"});
	const [mes,setMesdata]= useState("01");

	const [chartData, setChartData,] = useState([
		{ dia: "01", amount: 0 },
		{ dia: "02", amount: 0 },
		{ dia: "03", amount: 0 },
		{ dia: "04", amount: 0 },
		{ dia: "05", amount: 0 },
		{ dia: "06", amount: 0 },
		{ dia: "07", amount: 0 },
		{ dia: "08", amount: 0 },
		{ dia: "09", amount: 0 },
		{ dia: "10", amount: 0 },
		{ dia: "11", amount: 0 },
		{ dia: "12", amount: 0 },
		{ dia: "13", amount: 0 },
		{ dia: "14", amount: 0 },
		{ dia: "15", amount: 0 },
		{ dia: "16", amount: 0 },
		{ dia: "17", amount: 0 },
		{ dia: "18", amount: 0 },
		{ dia: "19", amount: 0 },
		{ dia: "20", amount: 0 },
		{ dia: "21", amount: 0 },
		{ dia: "22", amount: 0 },
		{ dia: "23", amount: 0 },
		{ dia: "24", amount: 0 },
		{ dia: "25", amount: 0 },
		{ dia: "26", amount: 0 },
		{ dia: "27", amount: 0 },
		{ dia: "28", amount: 0 },
		{ dia: "29", amount: 0 },
		{ dia: "30", amount: 0 },
		{ dia: "31", amount: 0 },
	]);


	function MonthPicker() {
		return (
		  <label>
			Selecione o mês : 
			<select name="selectedFruit" value={mes}
			onChange={e => {
				setMesdata(e.target.value);
				setChartData(prevState => {
					let aux = [...prevState];
					let year = format(startOfMonth(parseISO(date.current)), "yyyy");
		
					aux.forEach(a => {
						tickets.forEach(ticket => {
							if (format(startOfDay(parseISO(ticket.createdAt)),"dd/MM/yyyy") === (a.dia+"/"+mes+"/"+year) )
								{
									a.amount = 0;
								}
						});
						
					});
					return aux;
				});
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
					if (format(startOfDay(parseISO(ticket.createdAt)),"dd/MM/yyyy") === (a.dia+"/"+mes+"/"+year) )
						{
							a.amount++ ;
						}
				});
				
			});
			

			return aux;
		})}>
        	Clique aqui
      		</button>
		  </label>
			
		);}


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
					<XAxis dataKey="dia" stroke={theme.palette.text.secondary} />
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
