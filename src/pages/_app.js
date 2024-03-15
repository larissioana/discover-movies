import "@/styles/globals.css";
import { MovieProvider } from "@/context/moviesContext";
export default function App({ Component, pageProps }) {
  return <MovieProvider>
    <Component {...pageProps} />
  </MovieProvider>
}
