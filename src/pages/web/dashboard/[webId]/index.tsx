import { useRouter } from "next/router";

const WebDashboard = () => {
	const router = useRouter();

	console.log("router: ", router);
	return <h1>Web Dashboard</h1>;
};

export default WebDashboard;
