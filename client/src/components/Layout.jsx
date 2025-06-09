// src/components/Layout.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen p-4 bg-gray-50">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
