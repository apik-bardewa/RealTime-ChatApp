
import About from "./About";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Navbar/>
      <Hero/>
      <About/>
      <Footer/>
    </div>
  );
};

export default Home;