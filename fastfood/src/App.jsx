import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Admin from "./components/Admin.jsx";
import Login from "./components/Login.jsx";

function App() {
    return (
        <div>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
            </BrowserRouter>
        </div>

    );
}

export default App;
