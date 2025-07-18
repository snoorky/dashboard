"use client";

import { useAuth } from "@/utils/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) router.push("/");
	}, [user, loading, router]);

	if (!user) return null;

	return (
		<>
		</>
	);
}
