import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Admin from "./components/Admin.jsx";
import Login from "./components/Login.jsx";
import Cart from "./components/Cart.jsx";
import AdminSetup from "./components/AdminSetup.jsx";

function App() {
    return (
        <div>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/order" element={<Cart />} />
                        <Route path="/admin-setup" element={<AdminSetup />} />
                    </Routes>
            </BrowserRouter>
        </div>

    );
}

export default App;
