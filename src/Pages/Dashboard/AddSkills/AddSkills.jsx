import { useState } from 'react';
import { imgbbImageUpload } from '../../../api/utils/imageUpload';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';

const AddSkills = () => {
  const [projects, setProjects] = useState([{ name: '', description: '' }]);
  const [certifications, setCertifications] = useState(['']);
  const [tools, setTools] = useState(['']);
  const [showProjects, setShowProjects] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [image, setImage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const handleAddProject = () => {
    setProjects([...projects, { name: '', description: '' }]);
  };

  const handleRemoveProject = index => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  const handleAddCertification = () => {
    setCertifications([...certifications, '']);
  };

  const handleRemoveCertification = index => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
  };

  const handleAddTool = () => {
    setTools([...tools, '']);
  };

  const handleRemoveTool = index => {
    const updatedTools = tools.filter((_, i) => i !== index);
    setTools(updatedTools);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    const errors = {};
    const skillTitle = e.target.skillTitle.value.trim();
    const experience = e.target.experience.value.trim();
    const skillDescription = e.target.skillDescription.value.trim();

    if (!skillTitle) errors.skillTitle = 'Skill Title is required';
    if (!experience) errors.experience = 'Experience is required';
    if (!skillDescription)
      errors.skillDescription = 'Skill Description is required';
    if (!image) errors.image = 'Image is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitted(true);
    const validProjects = projects.filter(
      project => project.name.trim() !== '' && project.description.trim() !== ''
    );
    const validCertifications = certifications.filter(
      cert => cert.trim() !== ''
    );
    const validTools = tools.filter(tool => tool.trim() !== '');
    const imageUrl = await imgbbImageUpload(image);
    const formData = {
      SkillTitle: skillTitle,
      SkillDescription: skillDescription,
      Experience: experience,
      Image: imageUrl,
      Projects: validProjects,
      Certifications: validCertifications,
      Tools: validTools,
    };
    if (imageUrl) {
      try {
        const response = await fetch(
          'https://portfolio-server-sigma-mocha.vercel.app/add-skills',
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.insertedId) {
            Swal.fire({
              title: 'Success!',
              text: 'Added New Skills',
              icon: 'success',
              confirmButtonText: 'Added',
            });
            setIsSubmitted(true);
            navigate('/');
            e.target.reset();
            setProjects([{ name: '', description: '' }]);
            setCertifications(['']);
            setTools(['']);
            setImage(null);
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<Link to="/add-skills">Why do I have this issue?</Link>',
          });
        }
      } catch (error) {
        console.error('Error in submission:', error);
      }
    }
  };

  return (
    <div className="min-h-screen py-10 px-6 font-lexend">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center ">
          Add Skills and Its Description
        </h1>
        <div className="space-y-4">
          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="skillTitle"
              >
                Skill Title
              </label>
              <input
                className={`w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                  formErrors.skillTitle ? 'border-red-500' : ''
                }`}
                type="text"
                name="skillTitle"
                placeholder="Skill Title"
              />
              {formErrors.skillTitle && (
                <p className="text-red-500 text-sm">{formErrors.skillTitle}</p>
              )}
            </div>
            <div className="w-full">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="experience"
              >
                Experience inYear
              </label>
              <input
                className={`w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                  formErrors.experience ? 'border-red-500' : ''
                }`}
                type="number"
                name="experience"
                placeholder="Experience (in years)"
              />
              {formErrors.experience && (
                <p className="text-red-500 text-sm">{formErrors.experience}</p>
              )}
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="skillDescription"
            >
              Skill Description
            </label>
            <textarea
              className={`w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                formErrors.skillDescription ? 'border-red-500' : ''
              }`}
              rows="4"
              name="skillDescription"
              placeholder="Skill Description"
            ></textarea>
            {formErrors.skillDescription && (
              <p className="text-red-500 text-sm">
                {formErrors.skillDescription}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="image"
            >
              Skill Logo
            </label>
            <input
              className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {formErrors.image && (
              <p className="text-red-500 text-sm">{formErrors.image}</p>
            )}
          </div>

          <h2 className="text-lg font-semibold text-gray-700 mt-6">
            Any Projects using this Skill?
          </h2>
          <div className="flex gap-4 rounded-lg overflow-hidden">
            <label className="w-1/2 text-center py-2 cursor-pointer border-2 rounded-lg border-gray-200 bg-gray-100 hover:bg-indigo-100 focus-within:bg-indigo-100 transition-colors">
              <input
                className="hidden"
                type="radio"
                name="projects"
                value="yes"
                onChange={() => setShowProjects(true)}
              />
              Yes
            </label>
            <label className="w-1/2 text-center py-2 cursor-pointer border-2 rounded-lg border-gray-200 bg-gray-100 hover:bg-indigo-100 focus-within:bg-indigo-100 transition-colors">
              <input
                className="hidden"
                type="radio"
                name="projects"
                value="no"
                onChange={() => setShowProjects(false)}
              />
              No
            </label>
          </div>

          {showProjects && (
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="projectName"
                    >
                      Project Name
                    </label>
                    <input
                      className="w-full mb-2 bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Project Name"
                      value={project.name}
                      onChange={e =>
                        handleProjectChange(index, 'name', e.target.value)
                      }
                    />
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="companyName"
                    >
                      Project Description
                    </label>
                    <textarea
                      className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      rows="2"
                      placeholder="Project Description"
                      value={project.description}
                      onChange={e =>
                        handleProjectChange(
                          index,
                          'description',
                          e.target.value
                        )
                      }
                    ></textarea>
                  </div>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 w-40 hover:bg-opacity-90"
                    onClick={() => handleRemoveProject(index)}
                  >
                    Remove Project
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="bg-[#010127] text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
                onClick={handleAddProject}
              >
                + Add More Project
              </button>
            </div>
          )}

          <h2 className="text-lg font-semibold text-gray-700 mt-6">
            Any Certifications on this Skill?
          </h2>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-end gap-4">
                <div className="w-full">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="certificateName"
                  >
                    Certificate Name
                  </label>
                  <input
                    className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Certification Name"
                    value={cert}
                    onChange={e => {
                      const updatedCertifications = [...certifications];
                      updatedCertifications[index] = e.target.value;
                      setCertifications(updatedCertifications);
                    }}
                  />
                </div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
                  onClick={() => handleRemoveCertification(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="bg-[#010127] text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
              onClick={handleAddCertification}
            >
              + Add More Certification
            </button>
          </div>

          <h2 className="text-lg font-semibold text-gray-700 mt-6">
            Libraries and Tools
          </h2>
          <div className="space-y-4">
            {tools.map((tool, index) => (
              <div key={index} className="flex items-end gap-4">
                <div className="w-full">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="toolName"
                  >
                    Tools Name
                  </label>
                  <input
                    className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Library or Tool Name"
                    value={tool}
                    onChange={e => {
                      const updatedTools = [...tools];
                      updatedTools[index] = e.target.value;
                      setTools(updatedTools);
                    }}
                  />
                </div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
                  onClick={() => handleRemoveTool(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="bg-[#010127] text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
              onClick={handleAddTool}
            >
              + Add More Tool
            </button>
          </div>

          <div className="flex justify-center mt-8">
            <button
              className={`bg-[#010127] text-white px-8 py-4 rounded-lg hover:bg-opacity-90 w-full flex justify-center ${
                isSubmitted ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitted ? (
                <ImSpinner9 className="animate-spin" />
              ) : (
                'Add Project'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSkills;
