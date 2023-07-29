import "./App.css";
import { AboutUs } from "./componets/aboutUs/AboutUs";
import { Catalogs } from "./componets/catalog/Catalogs";
import { Footer } from "./componets/footer/Footer";
import { Header } from "./componets/header/Header";
import { Hero } from "./componets/hero/Hero";
import { SeasonalBouquets } from "./componets/seasonalBouquets/SeasonalBouquets";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Catalogs />
      <SeasonalBouquets />
      <AboutUs />
      <Footer />
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
