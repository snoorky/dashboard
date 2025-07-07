"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import Header from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { useAuth } from "../contexts/authContext";

export default function Dashboard() {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) router.push("/");
	}, [user, loading, router]);

	if (loading) return <p>Carregando...</p>;

	if (!user) return null;

	return (
		<div className="flex">
			<Sidebar />
			<Navbar />

			<div className="flex flex-col min-h-screen w-full xl:ml-44">
				<Header />
			</div>
		</div>
	);
}
