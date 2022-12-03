//import '../styles/globals.css'
import "../styles/style.css";
import Navbar from "../components/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
	console.log("pageProps:", pageProps);
	return (
		<QueryClientProvider client={queryClient}>
			<Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png">
				<Component {...pageProps} />
			</Navbar>
		</QueryClientProvider>
	);
}

export default MyApp;
