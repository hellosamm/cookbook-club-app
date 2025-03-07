import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Features from "./components/Home";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      {/* <Features /> */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
