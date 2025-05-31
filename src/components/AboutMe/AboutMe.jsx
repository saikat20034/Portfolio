import { LuDownload } from 'react-icons/lu';
import './AboutMe.css';
function AboutMe() {
  return (
    <div>
      <section className=" mx-auto mt-4 md:mt-7 lg:mt-10 px-2">
        <div className="flex flex-col md:flex-row gap-4 px-3 py-4 md:py-8">
          <div className="md:flex-1">
            <img
              className="rounded-xl w-full"
              src="/images/about.jpg"
              alt="About Me"
            />
          </div>
          <div className="md:flex-1 flex flex-col justify-center lg:pl-3">
            <h2 className="font-medium lg:font-semibold text-xl lg:text-2xl">
              <span className="text-lg font-medium">Hello! 👋 there,</span>{' '}
              <br />I am <span className="text-[#DC143C]">Mazharul</span>, a
              dedicated web developer
            </h2>
            <p className="text-[#4F5A6C] mt-4 text-sm lg:text-base">
              I am passionate about crafting elegant and functional digital
              solutions. With a solid foundation in HTML5, CSS3, and JavaScript,
              coupled with expertise in ReactJS, NodeJS, ExpressJS, Tailwind
              CSS, and MongoDB, I specialize in creating seamless and dynamic
              web applications. I thrive on turning ideas into reality and am
              constantly seeking new challenges to push my skills to the next
              level. Let’s collaborate and bring your vision to life!
            </p>
            <div className="mt-2 md:mt-4 flex justify-center md:justify-start">
              <a
                href="/public/CV_Resume/Mazharul_Resume_FS.pdf"
                download="Asadul's CV.pdf"
              >
                <button className="cssbuttons-io-button">
                  Download CV
                  <div className="icon">
                    <LuDownload color="white" />
                  </div>
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutMe;
