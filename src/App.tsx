import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "./components/Nav";
import Film from "./sections/Film";
import Discover from "./sections/Discover";
import Points from "./sections/Points";
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
      </main>
      <Nav />
    </>
  );
}
