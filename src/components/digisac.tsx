"use client";

import {
	ChartNoAxesCombined,
	MessageCircleMore,
	PhoneCallIcon,
	PhoneMissed,
	Users2,
} from "lucide-react";

// const apiData = [
// 	{
// 		name: "Otávio",
// 		avgCallTime: "04:46:47",
// 		avgFirstWaitTime: "00:04:06",
// 		avgFirstWaitAfterBot: "79:04:56",
// 		avgWaitTime: "00:06:37",
// 		messagesSent: 144,
// 		messagesReceived: 132,
// 		totalMessages: 276,
// 		openTickets: 1,
// 		closedTickets: 17,
// 		totalTickets: 18,
// 		totalContacts: 11,
// 		periods: "2025-06",
// 	},
// 	{
// 		name: "Raphael",
// 		avgCallTime: "07:42:15",
// 		avgFirstWaitTime: "00:58:03",
// 		avgFirstWaitAfterBot: "12:39:52",
// 		avgWaitTime: "00:30:45",
// 		messagesSent: 26,
// 		messagesReceived: 54,
// 		totalMessages: 80,
// 		openTickets: 0,
// 		closedTickets: 6,
// 		totalTickets: 6,
// 		totalContacts: 4,
// 		periods: "2025-06",
// 	},
// 	{
// 		name: "Renan - Web",
// 		avgCallTime: "07:22:54",
// 		avgFirstWaitTime: "05:54:21",
// 		avgFirstWaitAfterBot: "24:01:47",
// 		avgWaitTime: "02:44:25",
// 		messagesSent: 97,
// 		messagesReceived: 103,
// 		totalMessages: 200,
// 		openTickets: 0,
// 		closedTickets: 14,
// 		totalTickets: 14,
// 		totalContacts: 9,
// 		periods: "2025-06",
// 	},
// 	{
// 		name: "Vinicius",
// 		avgCallTime: "04:27:04",
// 		avgFirstWaitTime: "00:12:48",
// 		avgFirstWaitAfterBot: "620:14:57",
// 		avgWaitTime: "00:07:59",
// 		messagesSent: 141,
// 		messagesReceived: 198,
// 		totalMessages: 339,
// 		openTickets: 0,
// 		closedTickets: 22,
// 		totalTickets: 22,
// 		totalContacts: 14,
// 		periods: "2025-06",
// 	},
// 	{
// 		name: "Diego",
// 		avgCallTime: "24:35:40",
// 		avgFirstWaitTime: "03:46:47",
// 		avgFirstWaitAfterBot: "02:10:27",
// 		avgWaitTime: "01:14:13",
// 		messagesSent: 13,
// 		messagesReceived: 27,
// 		totalMessages: 40,
// 		openTickets: 1,
// 		closedTickets: 5,
// 		totalTickets: 6,
// 		totalContacts: 6,
// 		periods: "2025-06",
// 	},
// 	{
// 		name: "Jaqueline",
// 		avgCallTime: "00:00:00",
// 		avgFirstWaitTime: "00:00:00",
// 		avgFirstWaitAfterBot: "00:00:00",
// 		avgWaitTime: "00:00:00",
// 		messagesSent: 0,
// 		messagesReceived: 0,
// 		totalMessages: 0,
// 		openTickets: 0,
// 		closedTickets: 0,
// 		totalTickets: 0,
// 		totalContacts: 0,
// 		periods: "2025-06",
// 	},
// 	{
// 		name: "Fátima",
// 		avgCallTime: "00:00:00",
// 		avgFirstWaitTime: "00:00:00",
// 		avgFirstWaitAfterBot: "00:00:00",
// 		avgWaitTime: "00:00:00",
// 		messagesSent: 0,
// 		messagesReceived: 0,
// 		totalMessages: 0,
// 		openTickets: 0,
// 		closedTickets: 0,
// 		totalTickets: 0,
// 		totalContacts: 0,
// 		periods: "2025-06",
// 	},
// ];

// const reportData = [
// 	{
// 		label: "Tempo médio de chamada",
// 		value: apiData.map((item) => item.avgCallTime),
// 		icon: <Clock />,
// 		color: "text-blue-600",
// 	},
// 	{
// 		label: "Tempo médio da primeira espera",
// 		value: apiData.map((item) => item.avgFirstWaitTime),
// 		icon: <Clock />,
// 		color: "text-orange-600",
// 	},
// 	{
// 		label: "Tempo médio após o bot",
// 		value: apiData.map((item) => item.avgFirstWaitAfterBot),
// 		icon: <Clock />,
// 		color: "text-purple-600",
// 	},
// 	{
// 		label: "Tempo médio de espera",
// 		value: apiData.map((item) => item.avgWaitTime),
// 		icon: <Clock />,
// 		color: "text-amber-600",
// 	},
// 	{
// 		label: "Mensagens enviadas",
// 		value: apiData.map((item) => item.messagesSent.toString()),
// 		icon: <MessageCircleMore />,
// 		color: "text-emerald-600",
// 	},
// 	{
// 		label: "Mensagens recebidas",
// 		value: apiData.map((item) => item.messagesReceived.toString()),
// 		icon: <MessageCircleMore />,
// 		color: "text-cyan-600",
// 	},
// ];

const metrics = [
	{
		label: "Total Mensagens",
		value: 935,
		icon: <MessageCircleMore className="w-5 h-5" />,
		color: "text-blue-600 bg-blue-100",
	},
	{
		label: "Tickets Fechados",
		value: 64,
		icon: <PhoneMissed className="w-5 h-5" />,
		color: "text-orange-600 bg-orange-100",
	},
	{
		label: "Tickets Abertos",
		value: 2,
		icon: <PhoneCallIcon className="w-5 h-5" />,
		color: "text-purple-600 bg-purple-100",
	},
	{
		label: "Total Contatos",
		value: 44,
		icon: <Users2 className="w-5 h-5" />,
		color: "text-emerald-600 bg-emerald-100",
	},
];

export default function Digisac() {
	return (
		<main className="px-4 pt-8">
			<div className="flex items-center gap-2 mb-1">
				<ChartNoAxesCombined className="w-7 h-7 text-primary" />
				<h1 className="text-3xl font-bold">Relatórios Digisac</h1>
			</div>
			<p>Acompanhe as métricas de atendimento</p>

			<div className="grid grid-cols-2 gap-4 mt-8">
				{metrics.map((item, index) => (
					<div key={index} className="rounded-xl p-4 bg-white border border-[#e5e7eb]">
						<div className={`flex items-center justify-center w-8 h-8 rounded-lg ${item.color}`}>
							{item.icon}
						</div>
						<h3 className="text-sm text-gray-600 mt-2">{item.label}</h3>
						<span className="text-xl font-bold text-gray-900">{item.value}</span>
					</div>
				))}
			</div>
		</main>
	);
}
