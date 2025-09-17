import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Hero } from "./components/Hero/Hero";
import { Projects } from "./components/Projects/Projects";
import { Skills } from "./components/Skills";
import { IconoirProvider } from "iconoir-react";

export default function HomePage() {
  return (
    <main>
      <IconoirProvider
        iconProps={{
          strokeWidth: 2,
          width: "1em",
          height: "1em",
        }}
      >
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </IconoirProvider>
    </main>
  );
}
