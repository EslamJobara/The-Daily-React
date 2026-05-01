import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { Toaster } from "react-hot-toast";

export default function App() {
  const location = useLocation();
  const showNavBarFooter =
    location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1a1b22",
            color: "#fff",
            borderRadius: "8px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#00d2ff",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ff4b4b",
              secondary: "#fff",
            },
          },
        }}
      />
      {showNavBarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/edit-post" element={<EditPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {showNavBarFooter && <Footer />}
    </>
  );
}
