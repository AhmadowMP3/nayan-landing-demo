import { useEffect } from "react";
import Nav from "./components/Nav";
import Film from "./sections/Film";
import { startSmoothScroll } from "./lib/smoothScroll";
import { prefersReducedMotion } from "./lib/motion";

export default function App() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    return startSmoothScroll();
  }, []);

  return (
    <>
      <main>
        <Film />
      </main>
      <Nav />
    </>
  );
}
