import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Admin from "./components/Admin.jsx";

function App() {
    return (
        <div>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
            </BrowserRouter>
        </div>

    );
}

export default App;
