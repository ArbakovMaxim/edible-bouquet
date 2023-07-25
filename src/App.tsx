import "./App.css";
import { Catalogs } from "./componets/catalog/Catalogs";
import { Header } from "./componets/header/Header";
import { Hero } from "./componets/hero/Hero";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Catalogs />
    </div>
  );
}

export default App;
