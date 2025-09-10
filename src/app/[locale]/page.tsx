import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Hero } from "./components/Hero/Hero";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
