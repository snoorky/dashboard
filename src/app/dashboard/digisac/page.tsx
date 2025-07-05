"use client";

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

export default function Dashboard() {
	return (
		<>
			<div>
				<Navbar />
				<Sidebar />
				<h1>digisac</h1>
			</div>
		</>
	);
}
