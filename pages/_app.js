//import '../styles/globals.css'
import "../styles/style.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
	console.log("pageProps:", pageProps);
	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
		</QueryClientProvider>
	);
}

export default MyApp;
