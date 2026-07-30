import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// User Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// User Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

// Admin Components
import Sidebar from "./pages/admin/common/Sidebar";
import Topbar from "./pages/admin/common/Topbar";

// Admin Pages
import Overview from "./pages/admin/pages/Overview";
import AllUser from "./pages/admin/pages/AllUser";
import Product from "./pages/admin/pages/Product";

// User Layout
const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

// Admin Layout
const AdminLayout = () => (
  <div className="flex min-h-screen">
    <Sidebar />

    <div className="flex-1">
      <Topbar />

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Overview />} />
          <Route path="users" element={<AllUser />} />
          <Route path="products" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;