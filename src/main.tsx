import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Navbar from "./layout/Navbar.tsx";
import Footer from "./layout/Footer.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <Navbar />
    <App />
    <Footer />
  </>,
);
