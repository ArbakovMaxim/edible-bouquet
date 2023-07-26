import "./App.css";
import { AboutUs } from "./componets/aboutUs/AboutUs";
import { Catalogs } from "./componets/catalog/Catalogs";
import { Footer } from "./componets/footer/Footer";
import { Header } from "./componets/header/Header";
import { Hero } from "./componets/hero/Hero";
import { SeasonalBouquets } from "./componets/seasonalBouquets/SeasonalBouquets";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Catalogs />
      <SeasonalBouquets />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default App;
