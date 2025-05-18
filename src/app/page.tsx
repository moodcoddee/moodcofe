import Footer from "./components/footer";
import Hero from "./components/hero";
import { IBM_Plex_Mono } from "next/font/google";

const IBM = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    variable: "--font-imb",
});

function App() {
    return (
        <main className={`${IBM.variable} font-sans bg-bg`}>
            <Hero />
            <Footer />
        </main>
    );
}

export default App;
