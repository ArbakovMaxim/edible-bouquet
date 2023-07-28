import "./App.css";
import { Cart } from "./componets/Cart/Cart";
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
      <Cart />
    </div>
  );
}

export default App;
