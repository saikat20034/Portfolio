import { useState } from 'react';
import { imgbbImageUpload } from '../../../api/utils/imageUpload';
import Swal from 'sweetalert2';
import { ImSpinner9 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

const AddProjectsPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectImages: [],
    projectBannerImage: null,
    projectGeneralImages: [],
    projectHighlights: ['', ''],
    projectLinks: { live: '', client: '', server: '' },
    additionalFeatures: [''],
    usedTechnologies: [''],
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e, fieldName, index = null) => {
    const { name, value, files } = e.target;

    if (name === 'projectBannerImage') {
      setFormData({ ...formData, projectBannerImage: files[0] });
    } else if (name === 'projectGeneralImages') {
      setFormData({
        ...formData,
        projectGeneralImages: Array.from(files),
      });
    } else if (name.includes('projectHighlights')) {
      const updatedHighlights = [...formData.projectHighlights];
      updatedHighlights[index] = value;
      setFormData({ ...formData, projectHighlights: updatedHighlights });
    } else if (name.includes('additionalFeatures')) {
      const updatedFeatures = [...formData.additionalFeatures];
      updatedFeatures[index] = value;
      setFormData({ ...formData, additionalFeatures: updatedFeatures });
    } else if (name.includes('usedTechnologies')) {
      const updatedTechnologies = [...formData.usedTechnologies];
      updatedTechnologies[index] = value;
      setFormData({ ...formData, usedTechnologies: updatedTechnologies });
    } else if (name in formData.projectLinks) {
      setFormData({
        ...formData,
        projectLinks: { ...formData.projectLinks, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddField = field => {
    if (field === 'projectHighlights') {
      setFormData({
        ...formData,
        projectHighlights: [...formData.projectHighlights, ''],
      });
    } else if (field === 'additionalFeatures') {
      setFormData({
        ...formData,
        additionalFeatures: [...formData.additionalFeatures, ''],
      });
    } else if (field === 'usedTechnologies') {
      setFormData({
        ...formData,
        usedTechnologies: [...formData.usedTechnologies, ''],
      });
    }
  };

  const handleRemoveField = (field, index) => {
    if (field === 'projectHighlights') {
      const updatedHighlights = formData.projectHighlights.filter(
        (_, i) => i !== index
      );
      setFormData({ ...formData, projectHighlights: updatedHighlights });
    } else if (field === 'additionalFeatures') {
      const updatedFeatures = formData.additionalFeatures.filter(
        (_, i) => i !== index
      );
      setFormData({ ...formData, additionalFeatures: updatedFeatures });
    } else if (field === 'usedTechnologies') {
      const updatedTechnologies = formData.usedTechnologies.filter(
        (_, i) => i !== index
      );
      setFormData({ ...formData, usedTechnologies: updatedTechnologies });
    }
  };

  const handleFormSubmit = async e => {
    e.preventDefault();

    // Validation logic
    let errors = {};
    if (!formData.title) errors.title = 'Project title is required.';
    if (!formData.description) errors.description = 'Description is required.';
    if (!formData.projectBannerImage)
      errors.projectBannerImage = 'Banner image is required.';
    if (formData.projectGeneralImages.length === 0)
      errors.projectGeneralImages = 'At least one general image is required.';

    formData.projectHighlights.forEach((highlight, index) => {
      if (!highlight) errors[`highlight${index}`] = 'This field is required.';
    });

    formData.additionalFeatures.forEach((feature, index) => {
      if (!feature) errors[`feature${index}`] = 'This field is required.';
    });
    formData.usedTechnologies.forEach((tech, index) => {
      if (!tech) errors[`technology${index}`] = 'This field is required.';
    });
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
      const bannerImg = await imgbbImageUpload(formData.projectBannerImage);
      let imgCollection = [];
      for (let i = 0; i < formData.projectGeneralImages?.length; i++) {
        imgCollection[i] = await imgbbImageUpload(
          formData.projectGeneralImages[i]
        );
      }
      const projectData = {
        title: formData.title,
        description: formData.description,
        bannerImage: bannerImg,
        allImages: [bannerImg, ...imgCollection],
        highlights: formData.projectHighlights,
        links: formData.projectLinks,
        additionalFeatures: formData.additionalFeatures,
        usedTechnologies: formData.usedTechnologies,
      };

      console.log('Project Data Submitted: ', projectData);
      try {
        const response = await fetch(
          'https://portfolio-server-sigma-mocha.vercel.app/add-project',
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(projectData),
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.insertedId) {
            Swal.fire({
              title: 'Success!',
              text: 'Added New Project',
              icon: 'success',
              confirmButtonText: 'Added',
            });
            setIsSubmitted(false);
            navigate('/');
            // Reset form after successful submission
            setFormData({
              title: '',
              description: '',
              projectImages: [],
              projectBannerImage: null,
              projectGeneralImages: [],
              projectHighlights: [''],
              projectLinks: { live: '', client: '', server: '' },
              additionalFeatures: [''],
              usedTechnologies: [''],
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<Link to="/add-projects">Why do I have this issue?</Link>',
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add Project
        </h1>

        <div className="space-y-4">
          {/* Project Title */}
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                formErrors.title ? 'border-red-500' : ''
              }`}
              type="text"
              id="title"
              name="title"
              placeholder="Enter Project Title"
              value={formData.title}
              onChange={e => handleInputChange(e)}
              required
            />
            {formErrors.title && (
              <p className="text-red-500 text-sm">{formErrors.title}</p>
            )}
          </div>

          {/* Project Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className={`w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                formErrors.description ? 'border-red-500' : ''
              }`}
              id="description"
              name="description"
              placeholder="Project Description"
              rows="4"
              value={formData.description}
              onChange={e => handleInputChange(e)}
              required
            ></textarea>
            {formErrors.description && (
              <p className="text-red-500 text-sm">{formErrors.description}</p>
            )}
          </div>

          {/* Project Banner Image */}
          <div>
            <label
              htmlFor="projectBannerImage"
              className="block text-gray-700 font-medium"
            >
              Banner Image <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                formErrors.projectBannerImage ? 'border-red-500' : ''
              }`}
              type="file"
              id="projectBannerImage"
              name="projectBannerImage"
              accept="image/*"
              onChange={e => handleInputChange(e)}
              required
            />
            {formErrors.projectBannerImage && (
              <p className="text-red-500 text-sm">
                {formErrors.projectBannerImage}
              </p>
            )}
          </div>

          {/* General Images */}
          <div>
            <label
              htmlFor="projectGeneralImages"
              className="block text-gray-700 font-medium"
            >
              General Images <span className="text-red-500">*</span>
            </label>
            <input
              className={`w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                formErrors.projectGeneralImages ? 'border-red-500' : ''
              }`}
              type="file"
              id="projectGeneralImages"
              name="projectGeneralImages"
              multiple
              accept="image/*"
              onChange={e => handleInputChange(e)}
              required
            />
            {formErrors.projectGeneralImages && (
              <p className="text-red-500 text-sm">
                {formErrors.projectGeneralImages}
              </p>
            )}
          </div>

          {/* Project Highlights */}
          <div>
            <label
              htmlFor="projectHighlights"
              className="block text-gray-700 font-medium"
            >
              Project Highlights <span className="text-red-500">*</span>
            </label>
            {formData.projectHighlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-4 mt-2">
                <input
                  type="text"
                  name="projectHighlights"
                  value={highlight}
                  onChange={e =>
                    handleInputChange(e, 'projectHighlights', index)
                  }
                  placeholder={`Highlight ${index + 1}`}
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField('projectHighlights', index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField('projectHighlights')}
              className="bg-[#010127] text-white px-4 py-2 mt-1 rounded-lg hover:bg-opacity-90"
            >
              + Add More Highlight
            </button>
          </div>

          {/* Used Technologies */}
          <div>
            <label
              htmlFor="usedTechnologies"
              className="block text-gray-700 font-medium"
            >
              Used Technologies <span className="text-red-500">*</span>
            </label>
            {formData.usedTechnologies.map((tech, index) => (
              <div key={index} className="flex items-center gap-4 mb-2">
                <input
                  className={`w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                    formErrors[`technology${index}`] ? 'border-red-500' : ''
                  }`}
                  type="text"
                  name={`usedTechnologies-${index}`}
                  value={tech}
                  onChange={e =>
                    handleInputChange(e, 'usedTechnologies', index)
                  }
                  placeholder={`Technology #${index + 1}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField('usedTechnologies', index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField('usedTechnologies')}
              className="bg-[#010127] text-white px-4 py-2 mt-1 rounded-lg hover:bg-opacity-90"
            >
              + Add More Tech
            </button>
          </div>

          {/* Project Links */}
          <div className="border-2 p-4 rounded-lg">
            <label className="block text-gray-700 font-medium">
              Project Links
            </label>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="live"
                  className="block text-gray-700 font-medium"
                >
                  Live Link
                </label>
                <input
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  name="live"
                  value={formData.projectLinks.live}
                  onChange={e => handleInputChange(e)}
                />
              </div>
              <div>
                <label
                  htmlFor="client"
                  className="block text-gray-700 font-medium"
                >
                  Client Link
                </label>
                <input
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  name="client"
                  value={formData.projectLinks.client}
                  onChange={e => handleInputChange(e)}
                />
              </div>
              <div>
                <label
                  htmlFor="server"
                  className="block text-gray-700 font-medium"
                >
                  Server Link
                </label>
                <input
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  type="text"
                  name="server"
                  value={formData.projectLinks.server}
                  onChange={e => handleInputChange(e)}
                />
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div>
            <label
              htmlFor="additionalFeatures"
              className="block text-gray-700 font-medium"
            >
              Additional Features <span className="text-red-500">*</span>
            </label>
            {formData.additionalFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 mt-2">
                <input
                  type="text"
                  name="additionalFeatures"
                  value={feature}
                  onChange={e =>
                    handleInputChange(e, 'additionalFeatures', index)
                  }
                  placeholder={`Feature ${index + 1}`}
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField('additionalFeatures', index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField('additionalFeatures')}
              className="bg-[#010127] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 mt-1"
            >
              + Add More Feature
            </button>
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
              'Submit Project'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectsPage;
