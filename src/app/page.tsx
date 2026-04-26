<<<<<<< Updated upstream
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
=======
import Hero from './components/hero';
import LoadScreen from './components/LoadScreen';

function App() {
  return (
    <main>
      <LoadScreen />
      <Hero />
    </main>
  );
>>>>>>> Stashed changes
}

export default App;
