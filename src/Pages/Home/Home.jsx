import Hero from '../../components/Hero/Hero';
import ProjectSection from '../../components/Project/Project';

import About from '../About/About';
import Blog from '../Blogs/Blog';
import Contact from '../Contact/Contact';


import Skills from './../Skills/Skills';
function Home() {
  return (
    <div>
      <section id="home">
        <Hero />
      </section>
      <section id="about" className="mt-10 md:mt-16">
        <About />
      </section>
      <section id="skills" className="mt-10 md:mt-16">
        <Skills />
      </section>
      {/* <section id="experience" className="mt-10 md:mt-16">
        <Experience />
      </section> */}
      {/* <section id="projects" className="mt-10 md:mt-16">
        <Projects />
      </section> */}
      <section id="projectsection" className="mt-10 md:mt-16">
        <ProjectSection></ProjectSection>
      </section>

      <section id="blog" className="mt-10 md:mt-16">
        <Blog />
      </section>
      <section id="contact" className="mt-10 md:mt-16">
        <Contact />
      </section>
    </div>
  );
}

export default Home;
