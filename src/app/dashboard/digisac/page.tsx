"use client"

import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/authContext";
import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import Header from "@/components/header";
import Digisac from "@/components/digisac";
import { Sidebar } from "@/components/sidebar";

export default function Dashboard() {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) router.push("/");
	}, [user, loading, router]);

	return (
		<div className="flex">
			<Sidebar />
			<Navbar />

			<div className="flex flex-col min-h-screen w-full xl:ml-44">
				<Header />
				<Digisac />
			</div>
		</div>
	);
}
