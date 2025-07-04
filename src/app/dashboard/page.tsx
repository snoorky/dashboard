"use client";

import { Navbar } from "@/components/navbar";
import { useAuth } from "../contexts/authContext";

export default function Dashboard() {
	const { company, user } = useAuth();

	return (
		<>
			<div>
				<h1>Olá.. {company?.business_name}</h1>
				<h2>Nome: {user?.email}</h2>
				<Navbar />
			</div>
		</>
	);
}
