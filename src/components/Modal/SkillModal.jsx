/* eslint-disable react/prop-types */
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { RxCross2 } from 'react-icons/rx';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
function SkillModal({ isOpen, setIsOpen, skill }) {
  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none "
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full mt-14 md:mt-4 items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-lg md:max-w-lg rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 bg-[#695E9F]/50"
              data-aos="zoom-in"
            >
              <DialogTitle
                as="h2"
                className="text-xl font-medium text-white flex justify-between items-center"
              >
                <span> Title: {skill.SkillTitle}</span>
                <span
                  onClick={close}
                  className="border p-2 rounded-full hover:scale-110 duration-300 ease-in-out hover:bg-red-500 hover:border-red-500"
                >
                  <RxCross2 />
                </span>
              </DialogTitle>
              <hr className="mt-2 border-b border-[#695E9F]" />
              <p className="mt-2 text-sm/6 text-white">
                <strong>Description:</strong> {skill?.SkillDescription}
              </p>
              <p className="mt-2 text-sm/6 text-white">
                <strong>Experience:</strong> {skill?.Experience}
              </p>

              <div className="mt-4 text-sm/6 text-white">
                <strong>Projects:</strong>
                <ul className="list-disc list-inside mt-1">
                  {skill?.Projects?.map((project, index) => (
                    <li key={index}>
                      <strong>{project.name}:</strong> {project.description}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 text-sm/6 text-white">
                <strong>Certifications:</strong>
                <ul className="list-disc list-inside mt-1">
                  {skill?.Certifications?.map((certification, index) => (
                    <li key={index}>{certification}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 text-sm/6 text-white">
                <strong>Libraries & Tools:</strong>
                <ul className="list-disc list-inside mt-1">
                  {skill?.Tools?.map((tool, index) => (
                    <li key={index}>{tool}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Got it
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
export default SkillModal;
