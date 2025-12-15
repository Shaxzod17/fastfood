import { FaShoppingCart, FaUserShield } from "react-icons/fa";
import burger from "../img/28c866cd86d7bc0f9c0b4329226ce57a4cc97386.png";
import "../App.css";

function LandingPage() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#0b2f24] via-[#0f3d2e] to-[#144b38] text-white">

            {/* NAVBAR */}
            <nav className="w-full">
                <div className="max-w-[1300px] mx-auto flex items-center justify-between px-6 py-6">

                    <h1 className="text-2xl font-bold tracking-widest">
                        BURGUR
                    </h1>

                    <ul className="hidden md:flex gap-10 text-sm tracking-wide">
                        <li className="cursor-pointer hover:text-yellow-300">Home</li>
                        <li className="cursor-pointer hover:text-yellow-300">Menu</li>
                        <li className="cursor-pointer hover:text-yellow-300">About</li>
                        <li className="cursor-pointer hover:text-yellow-300">Shop</li>
                    </ul>

                    <div className="flex gap-5 text-xl">
                        <FaShoppingCart className="cursor-pointer hover:text-yellow-300" />
                        <FaUserShield className="cursor-pointer hover:text-yellow-300" />
                    </div>

                </div>
            </nav>

            <div className={"max-w-[1300px] mx-auto px-6 py-6"}>
              <div>
                  <h1>THE ULTIMATE</h1>
                  <h1>BURGUR CLUB</h1>
                  <h1>Savor the Flavor, Join the Club!</h1>
              </div>
                <div>
                    <img src="" alt=""/>
                </div>
            </div>

        </div>
    );
}

export default LandingPage;
