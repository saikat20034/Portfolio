import { useState } from 'react';
import { imgbbImageUpload } from '../../../api/utils/imageUpload'; // Assuming you have a similar image upload utility
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AddExperience.css';
import { useNavigate } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';
const AddExperience = () => {
  const [skills, setSkills] = useState(['']);
  const [classType, setClassType] = useState('inactive');
  const [companyLogo, setCompanyLogo] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [experienceData, setExperienceData] = useState({
    fromDate: '',
    toDate: '',
    role: '',
    location: '',
    companyName: '',
    description: '',
  });

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const handleAddSkill = () => {
    setSkills([...skills, '']);
  };

  const handleRemoveSkill = index => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleCompanyLogoChange = e => {
    const file = e.target.files[0];
    if (file) setCompanyLogo(file);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setExperienceData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClassTypeChange = e => {
    setClassType(e.target.value);
    if (e.target.value === 'active') {
      setExperienceData(prevState => ({
        ...prevState,
        toDate: '', // Reset toDate when classType is active
      }));
    }
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    const errors = {};
    const { fromDate, toDate, role, location, description, companyName } =
      experienceData;

    if (!fromDate) errors.fromDate = 'From Date is required';
    if (!role) errors.role = 'Role is required';
    if (!location) errors.location = 'Location is required';
    if (!description) errors.description = 'Description is required';
    if (!companyLogo) errors.companyLogo = 'Company Logo is required';
    if (!companyName) errors.companyName = 'Company Name is required';

    // Validate if at least one skill is entered
    if (skills.every(skill => skill.trim() === '')) {
      errors.skills = 'At least one skill is required';
    }

    if (!classType) errors.classType = 'Class Type is required';

    // To Date is required or Present must be selected
    if (!toDate && classType !== 'active')
      errors.toDate = 'To Date or Present is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
setIsSubmitted(true);
    // If Present is selected, set the toDate to "Present"
    const finalToDate = classType === 'active' ? 'Present' : toDate;

    // Merge the FromDate and ToDate into a string in "Month Year - Month Year" format
    const formatDate = date => {
      const options = { year: 'numeric', month: 'long' };
      return new Date(date).toLocaleDateString('en-US', options);
    };

    const formattedFromDate = fromDate ? formatDate(fromDate) : '';
    const formattedToDate =
      finalToDate === 'Present' ? 'Present' : formatDate(finalToDate);

    const mergedDate = `${formattedFromDate} - ${formattedToDate}`;

    const logoUrl = await imgbbImageUpload(companyLogo);
    const fromData = {
      FromDate: fromDate,
      ToDate: finalToDate,
      Role: role,
      CompanyName: companyName,
      Location: location,
      Description: description,
      Skills: skills.filter(skill => skill.trim() !== ''),
      classType,
      CompanyLogo: logoUrl,
      MergedDate: mergedDate, // Add merged date string here
    };

    try {
      const response = await fetch(
        'https://portfolio-server-sigma-mocha.vercel.app/add-new-experience',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fromData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.insertedId) {
          Swal.fire({
            title: 'Success!',
            text: 'Experience Added Successfully!',
            icon: 'success',
            confirmButtonText: 'Great',
          });

          // Reset form after successful submission
          e.target.reset();
          setExperienceData({
            fromDate: '',
            toDate: '',
            role: '',
            location: '',
            companyName: '',
            description: '',
          });
          setSkills(['']);
          setCompanyLogo(null);
          setClassType('inactive');
          setIsSubmitted(false);
          navigate('/');
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    } catch (error) {
      console.error('Error in submission:', error);
    }
  };

  return (
    <div className="min-h-screen py-10 px-6 font-lexend">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add Experience
        </h1>

        {/* Active/Inactive Radio Buttons */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 mt-6">
            Class Type
          </h2>
          <div className="flex gap-4">
            <label className="w-1/2 text-center py-2 cursor-pointer border-2 rounded-lg border-gray-200 bg-gray-100 hover:bg-indigo-100 focus-within:bg-indigo-100 transition-colors">
              <input
                className="hidden"
                type="radio"
                name="classType"
                value="inactive"
                checked={classType === 'inactive'}
                onChange={handleClassTypeChange}
              />
              Inactive
            </label>
            <label className="w-1/2 text-center py-2 cursor-pointer border-2 rounded-lg border-gray-200 bg-gray-100 hover:bg-indigo-100 focus-within:bg-indigo-100 transition-colors">
              <input
                className="hidden"
                type="radio"
                name="classType"
                value="active"
                checked={classType === 'active'}
                onChange={handleClassTypeChange}
              />
              Active
            </label>
          </div>
        </div>
        {/* Company Name */}
        <div className="mt-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="companyName"
          >
            Company Name
          </label>
          <input
            id="companyName"
            className={`w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
              formErrors.companyName ? 'border-red-500' : ''
            }`}
            type="text"
            name="companyName"
            placeholder="Enter Company Name"
            value={experienceData.companyName}
            onChange={handleInputChange}
          />
          {formErrors.companyName && (
            <p className="text-red-500 text-sm">{formErrors.companyName}</p>
          )}
        </div>

        {/* From Date */}
        <div className="space-y-4 mt-6">
          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="fromDate"
              >
                From Date
              </label>
              <DatePicker
                placeholderText="From Date"
                className={`w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                  formErrors.fromDate ? 'border-red-500' : ''
                }`}
                selected={
                  experienceData.fromDate
                    ? new Date(experienceData.fromDate)
                    : null
                }
                onChange={date =>
                  setExperienceData(prevState => ({
                    ...prevState,
                    fromDate: date,
                  }))
                }
                dateFormat="dd-MM-yyyy"
              />
              {formErrors.fromDate && (
                <p className="text-red-500 text-sm">{formErrors.fromDate}</p>
              )}
            </div>
            <div className="w-full">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="toDate"
              >
                To Date
              </label>
              <DatePicker
                placeholderText="To Date"
                className={`w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                  formErrors.toDate ? 'border-red-500' : ''
                }`}
                selected={
                  experienceData.toDate ? new Date(experienceData.toDate) : null
                }
                onChange={date =>
                  setExperienceData(prevState => ({
                    ...prevState,
                    toDate: date,
                  }))
                }
                dateFormat="dd-MM-yyyy"
                disabled={classType === 'active'}
              />
              {formErrors.toDate && (
                <p className="text-red-500 text-sm">{formErrors.toDate}</p>
              )}
            </div>
          </div>
          {/* Role */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="role"
            >
              Role
            </label>
            <input
              id="role"
              className={`w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                formErrors.role ? 'border-red-500' : ''
              }`}
              type="text"
              name="role"
              placeholder="Role"
              value={experienceData.role}
              onChange={handleInputChange}
            />
            {formErrors.role && (
              <p className="text-red-500 text-sm">{formErrors.role}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="location"
            >
              Location
            </label>
            <input
              id="location"
              className={`w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                formErrors.location ? 'border-red-500' : ''
              }`}
              type="text"
              name="location"
              placeholder="Location"
              value={experienceData.location}
              onChange={handleInputChange}
            />
            {formErrors.location && (
              <p className="text-red-500 text-sm">{formErrors.location}</p>
            )}
          </div>

          {/* Job Description */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              Job Description
            </label>
            <textarea
              id="description"
              className={`w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                formErrors.description ? 'border-red-500' : ''
              }`}
              rows="4"
              name="description"
              placeholder="Job Description"
              value={experienceData.description}
              onChange={handleInputChange}
            ></textarea>
            {formErrors.description && (
              <p className="text-red-500 text-sm">{formErrors.description}</p>
            )}
          </div>

          {/* Company Logo */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="companyLogo"
            >
              Company Logo
            </label>
            <input
              id="companyLogo"
              className={`w-full p-3 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:shadow-outline ${
                formErrors.companyLogo ? 'border-red-500' : ''
              }`}
              type="file"
              accept="image/*"
              onChange={handleCompanyLogoChange}
            />
            {formErrors.companyLogo && (
              <p className="text-red-500 text-sm">{formErrors.companyLogo}</p>
            )}
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                  placeholder="Add Skill"
                  value={skill}
                  onChange={e => handleSkillChange(index, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="bg-red-500 text-white px-6 py-[10px] rounded-lg hover:bg-opacity-90"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-[#010127] text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
            >
              + Add Skill
            </button>
            {formErrors.skills && (
              <p className="text-red-500 text-sm">{formErrors.skills}</p>
            )}
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
              'Add Experience'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExperience;
