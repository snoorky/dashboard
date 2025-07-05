import { Navbar } from "@/components/navbar";
// import { Sidebar } from "@/components/sidebar";
import Header from "@/components/header";
import Digisac from "@/components/digisac";

export default async function Dashboard() {
	return (
		<div className="flex">
			{/* <Sidebar /> */}
			<Navbar />

			<div className="flex flex-col min-h-screen w-full xl:ml-48">
				<Header />
				<Digisac />
			</div>
		</div>
	);
}
