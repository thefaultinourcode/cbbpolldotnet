//import '../styles/globals.css'
import "../styles/style.css";
import Navbar from "../components/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
	console.log("pageProps:", pageProps);
	let user;
	if(pageProps.user){
		console.log('user:',pageProps.user);
		user = pageProps.user.name;
	}
	else{
		console.log('no user');
		console.log('user:', pageProps.user);
		user = null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<Navbar cbbLogo="/static/CBBlogo2.png" homefieldLogo="/static/SponsoredByHomefield.png" user={user}>
				<Component {...pageProps} />
			</Navbar>
		</QueryClientProvider>
	);
}

export default MyApp;
