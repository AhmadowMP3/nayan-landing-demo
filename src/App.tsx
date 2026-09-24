import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "./components/Nav";
import Film from "./sections/Film";
import Discover from "./sections/Discover";
import Points from "./sections/Points";
import Specs from "./sections/Specs";
import Testimonial from "./sections/Testimonial";
import Services from "./sections/Services";
import Amenities from "./sections/Amenities";
import Cta from "./sections/Cta";
import Footer from "./sections/Footer";
import { startSmoothScroll } from "./lib/smoothScroll";
import { prefersReducedMotion } from "./lib/motion";

export default function App() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    return startSmoothScroll();
  }, []);

  // Web fonts change text heights — re-measure every trigger once they're in.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      <main>
        <Film />
        <Discover />
        <Points />
        <Specs />
        <Testimonial />
        <Services />
        <Amenities />
        <Cta />
      </main>
      <Footer />
      <Nav />
    </>
  );
}
