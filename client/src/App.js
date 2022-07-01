import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Services from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import Liturgy from "./pages/Liturgy";
import ChildSafety from "./pages/ChildSafety";
import LoginForm from "./components/LoginForm";
import { ToastContainer } from "react-toastify";
import Donate from "./pages/Donate";
import Booking from "./components/Booking";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/liturgy" element={<Liturgy />} />
          <Route path="/liturgy-booking" element={<Booking />} />
          <Route path="/child-safety" element={<ChildSafety />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
        <hr />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100vw",
          }}
        >
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
