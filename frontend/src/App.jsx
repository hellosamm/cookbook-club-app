import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Features from "./components/Features";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      {/* <Features /> */}
      <main className=" bg-ivory">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
