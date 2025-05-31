import { useState, useEffect } from 'react';
import { imgbbImageUpload } from '../../../api/utils/imageUpload'; // Assuming you have a similar image upload utility
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AddExperience.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';

const UpdateExperience = () => {
  const [skills, setSkills] = useState(['']);
  const [classType, setClassType] = useState('inactive');
  const [companyLogo, setCompanyLogo] = useState(null);
  const [, setFormErrors] = useState({});
  const { id } = useParams();
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

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        const response = await fetch(
          `https://portfolio-server-sigma-mocha.vercel.app/get-experience/${id}`
        );
        const data = await response.json();
        if (data) {
          setExperienceData({
            fromDate: new Date(data.FromDate),
            toDate:
              data.ToDate === 'Present' ? 'Present' : new Date(data.ToDate),
            role: data.Role,
            location: data.Location,
            companyName: data.CompanyName,
            description: data.Description,
          });
          setSkills(data.Skills || ['']);
          setClassType(data.classType || 'inactive');
          setCompanyLogo(data.CompanyLogo);
        }
      } catch (error) {
        console.error('Error fetching experience data:', error);
      }
    };

    fetchExperienceData();
  }, [id]);

  const handleClassTypeChange = e => {
    setClassType(e.target.value);
    if (e.target.value === 'active') {
      setExperienceData(prevState => ({
        ...prevState,
        toDate: '',
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

    const formatDate = date => {
      const options = { year: 'numeric', month: 'long' };
      return new Date(date).toLocaleDateString('en-US', options);
    };

    const formattedFromDate = fromDate ? formatDate(fromDate) : '';
    const formattedToDate =
      finalToDate === 'Present' ? 'Present' : formatDate(finalToDate);
    const mergedDate = `${formattedFromDate} - ${formattedToDate}`;

    const logoUrl = await imgbbImageUpload(companyLogo);
    const formData = {
      FromDate: fromDate,
      ToDate: finalToDate,
      Role: role,
      Location: location,
      CompanyName: companyName,
      Description: description,
      Skills: skills.filter(skill => skill.trim() !== ''),
      classType,
      CompanyLogo: logoUrl,
      MergedDate: mergedDate,
    };

    try {
      const response = await fetch(
        `https://portfolio-server-sigma-mocha.vercel.app/experience/update/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Experience Updated Successfully!',
          icon: 'success',
          confirmButtonText: 'Great',
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
      console.error('Error in submission:', error);
    }
  };

  const handleSkillChange = (index, event) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = event.target.value;
    setSkills(updatedSkills);
  };

  const handleAddSkill = () => {
    setSkills([...skills, '']);
  };

  const handleRemoveSkill = index => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  return (
    <div className="min-h-screen py-10 px-6 font-lexend">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Update Experience
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

        <div className="flex gap-4 flex-col md:flex-row">
          {/* From Date */}
          <div className="mb-4 w-full">
            <label
              htmlFor="fromDate"
              className="block text-sm font-medium text-gray-700"
            >
              From Date
            </label>
            <DatePicker
              placeholderText="From Date"
              selected={experienceData.fromDate}
              onChange={date =>
                setExperienceData({ ...experienceData, fromDate: date })
              }
              dateFormat="dd/MM/yyyy"
              showMonthYearPicker
              className="mt-2 w-full px-4 py-2 border rounded-md outline-none"
            />
          </div>

          {/* To Date */}
          <div className="mb-4 w-full">
            <label
              htmlFor="toDate"
              className="block text-sm font-medium text-gray-700"
            >
              To Date
            </label>
            {classType === 'active' ? (
              <input
                type="text"
                value="Present"
                readOnly
                className="mt-2 w-full px-4 py-2 border rounded-md bg-gray-100 outline-none"
              />
            ) : (
              <DatePicker
                placeholderText="To Date"
                selected={
                  experienceData.toDate === 'Present'
                    ? null
                    : experienceData.toDate
                }
                onChange={date =>
                  setExperienceData({ ...experienceData, toDate: date })
                }
                dateFormat="MM/yyyy"
                showMonthYearPicker
                className="mt-2 w-full px-4 py-2 border rounded-md"
              />
            )}
          </div>
        </div>

        {/* Role */}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <input
            type="text"
            id="role"
            value={experienceData.role}
            onChange={e =>
              setExperienceData({ ...experienceData, role: e.target.value })
            }
            className="mt-2 w-full px-4 py-2 border rounded-md outline-none"
          />
        </div>
        {/* Company Name */}
        <div className="mb-4">
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-700"
          >
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            value={experienceData.companyName}
            onChange={e =>
              setExperienceData({
                ...experienceData,
                companyName: e.target.value,
              })
            }
            className="mt-2 w-full px-4 py-2 border rounded-md outline-none"
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            value={experienceData.location}
            onChange={e =>
              setExperienceData({ ...experienceData, location: e.target.value })
            }
            className="mt-2 w-full px-4 py-2 border rounded-md outline-none"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={experienceData.description}
            onChange={e =>
              setExperienceData({
                ...experienceData,
                description: e.target.value,
              })
            }
            className="mt-2 w-full px-4 py-2 border rounded-md outline-none"
          />
        </div>

        {/* Skills */}
        <div className="mb-4">
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-gray-700"
          >
            Skills
          </label>
          {skills.map((skill, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={skill}
                onChange={e => handleSkillChange(index, e)}
                className="w-full px-4 py-2 border rounded-md outline-none"
              />
              <button
                type="button"
                onClick={() => handleRemoveSkill(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
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
        </div>

        {/* Company Logo */}
        {/* Company Logo */}
        <div className="mb-4">
          <label
            htmlFor="companyLogo"
            className="block text-sm font-medium text-gray-700"
          >
            Company Logo
          </label>
          <div className="flex gap-2 items-center">
            <div className="w-full">
              <input
                type="file"
                onChange={e => setCompanyLogo(e.target.files[0])}
                className="mt-2 w-full px-4 py-2 border rounded-md outline-none"
              />
            </div>
            {companyLogo && (
              <div className="w-32 h-[48px] mt-2 object-cover object-center">
                <img
                  src={companyLogo}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg border"
                />
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`bg-[#010127] text-white px-8 py-4 rounded-lg hover:bg-opacity-90 w-full flex justify-center ${
            isSubmitted ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitted ? (
            <ImSpinner9 className="animate-spin" />
          ) : (
            'Update Experience'
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateExperience;
