import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { imgbbImageUpload } from '../../../api/utils/imageUpload';
import { ImSpinner9 } from 'react-icons/im';

const UpdateSkills = () => {
  const [projects, setProjects] = useState([{ name: '', description: '' }]);
  const [certifications, setCertifications] = useState(['']);
  const [tools, setTools] = useState(['']);
  // const [showProjects, setShowProjects] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [image, setImage] = useState(null);
  const [skill, setSkill] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://portfolio-server-sigma-mocha.vercel.app/update-skills/${id}`
        );
        const data = await response.json();
        setSkill(data);

        // Pre-fill form with fetched data
        setProjects(data?.Projects || [{ name: '', description: '' }]);
        setCertifications(data?.Certifications || ['']);
        setTools(data?.Tools || ['']);
        setImage(data?.Image);
      } catch (error) {
        console.error('Failed to fetch skill data:', error);
      }
    })();
  }, [id]);

  const handleAddProject = () => {
    setProjects([...projects, { name: '', description: '' }]);
  };

  // const handleRemoveProject = index => {
  //   const updatedProjects = projects.filter((_, i) => i !== index);
  //   setProjects(updatedProjects);
  // };

  const handleAddCertification = () => {
    setCertifications([...certifications, '']);
  };

  // const handleRemoveCertification = index => {
  //   const updatedCertifications = certifications.filter((_, i) => i !== index);
  //   setCertifications(updatedCertifications);
  // };

  const handleAddTool = () => {
    setTools([...tools, '']);
  };

  // const handleRemoveTool = index => {
  //   const updatedTools = tools.filter((_, i) => i !== index);
  //   setTools(updatedTools);
  // };

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
      Image: imageUrl || skill.Image,
      Projects: validProjects,
      Certifications: validCertifications,
      Tools: validTools,
    };

    try {
      const response = await fetch(
        `https://portfolio-server-sigma-mocha.vercel.app/skill/update/${id}`,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Skill updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        setIsSubmitted(false);
        navigate('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  return (
    <div className="min-h-screen py-10 px-6 font-lexend">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Update Skills and Its Description
        </h1>
        <div className="space-y-4">
          <div className="w-full flex gap-4">
            <div className="w-full">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="skillTitle"
              >
                Skill Name
              </label>
              <input
                className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none"
                type="text"
                name="skillTitle"
                placeholder="Skill Title"
                defaultValue={skill?.SkillTitle || ''}
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
                Experience in Year
              </label>
              <input
                className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none"
                type="number"
                name="experience"
                placeholder="Experience (in years)"
                defaultValue={skill?.Experience || ''}
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
              Description
            </label>
            <textarea
              className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none"
              rows="4"
              name="skillDescription"
              placeholder="Skill Description"
              defaultValue={skill?.SkillDescription || ''}
            ></textarea>
            {formErrors.skillDescription && (
              <p className="text-red-500 text-sm">
                {formErrors.skillDescription}
              </p>
            )}
          </div>

          <div className="flex items-start gap-4">
            {/* Image Input */}
            <div className="w-full">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="image"
              >
                Skill Logo
              </label>
              <input
                className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {/* Image Preview */}
            {image && (
              <div className="w-32 h-[53px] object-cover object-center">
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* Projects */}
          <h2 className="text-lg font-semibold text-gray-700 mt-6">Projects</h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index}>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  Project Name
                </label>
                <input
                  className="w-full mb-2 bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none"
                  type="text"
                  placeholder="Project Name"
                  value={project.name}
                  onChange={e =>
                    handleProjectChange(index, 'name', e.target.value)
                  }
                />
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="description"
                >
                  Project Description
                </label>
                <textarea
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none"
                  rows="2"
                  placeholder="Project Description"
                  value={project.description}
                  onChange={e =>
                    handleProjectChange(index, 'description', e.target.value)
                  }
                ></textarea>
              </div>
            ))}
            <button
              type="button"
              className="bg-[#010127] text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
              onClick={handleAddProject}
            >
              + Add Project
            </button>
          </div>

          {/* Certifications */}
          <h2 className="text-lg font-semibold text-gray-700 mt-6">
            Certifications
          </h2>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div key={index}>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="CertificationName"
                >
                  Certification Name
                </label>
                <input
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none"
                  type="text"
                  placeholder="Certification Name"
                  value={cert}
                  onChange={e =>
                    setCertifications(
                      certifications.map((c, i) =>
                        i === index ? e.target.value : c
                      )
                    )
                  }
                />
              </div>
            ))}
            <button
              type="button"
              className="bg-[#010127] text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
              onClick={handleAddCertification}
            >
              + Add Certification
            </button>
          </div>

          {/* Tools */}
          <h2 className="text-lg font-semibold text-gray-700 mt-6">Tools</h2>
          <div className="space-y-4">
            {tools.map((tool, index) => (
              <div key={index}>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="toolName"
                >
                  Tools Name
                </label>
                <input
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none"
                  type="text"
                  placeholder="Tool Name"
                  value={tool}
                  onChange={e =>
                    setTools(
                      tools.map((t, i) => (i === index ? e.target.value : t))
                    )
                  }
                />
              </div>
            ))}
            <button
              type="button"
              className="bg-[#010127] text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
              onClick={handleAddTool}
            >
              + Add Tool
            </button>
          </div>
        </div>
        <button
          type="submit"
          className={`bg-[#010127] text-white px-8 py-4 rounded-lg hover:bg-opacity-90 w-full flex justify-center ${
            isSubmitted ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitted ? (
            <ImSpinner9 className="animate-spin" />
          ) : (
            'Update Project'
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateSkills;
