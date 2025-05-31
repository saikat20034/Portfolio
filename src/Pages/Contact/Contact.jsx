import { RxCross1 } from 'react-icons/rx';
import './Contact.css';
import { BsFillSendFill } from 'react-icons/bs';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { ImSpinner9 } from 'react-icons/im';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    )
      newErrors.email = 'Invalid email format';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }
    setIsSubmitted(true);
    try {
      const response = await fetch(
        'https://portfolio-server-sigma-mocha.vercel.app/send-email',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Email Sent!',
          text: 'Your message has been sent successfully.',
        });
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.error || 'Failed to send email.',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'An Error Occurred',
        text: 'There was an issue sending the email. Please try again later.',
      });
    }
  };

  return (
    <div className="font-manrope mb-[1px]">
      <div className="min-h-screen bg-primary py-6 flex flex-col justify-center sm:py-24">
        <div className="relative py-3 sm:max-w-xl md:min-w-[600px] sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-[#135dde] to-[#675C9C] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="text-white relative px-4 py-10 bg-blue-950 shadow-lg sm:rounded-3xl sm:p-10">
            <div className="text-center pb-6">
              <h1 className="text-3xl ">
                Let’s <span className="text-[#DC143C]">C</span>
                onnect!
              </h1>
              <p className="text-gray-300">
                Reach out to me by filling out the form below.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} noValidate>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-white mb-1"
                  htmlFor="name"
                >
                  Your Name
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-white mb-1"
                  htmlFor="email"
                >
                  Your Email
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-white mb-1"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.subject ? 'border-red-500' : ''
                  }`}
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-white mb-1"
                  htmlFor="name"
                >
                  Your Message
                </label>
                <textarea
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.message ? 'border-red-500' : ''
                  }`}
                  placeholder="Type your message here..."
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="deleteButton"
                  onClick={() =>
                    setFormData({
                      name: '',
                      email: '',
                      subject: '',
                      message: '',
                    })
                  }
                >
                  <span className="text">Reset</span>
                  <span className="icon">
                    <RxCross1 className="cross text-xl" />
                  </span>
                </button>
                <button
                  type="submit"
                  className={` sendButton ${
                    isSubmitted ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                      <BsFillSendFill className="arrowIcon" />
                    </div>
                  </div>
                  <span>
                    {isSubmitted ? (
                      <ImSpinner9 className="animate-spin" />
                    ) : (
                      'Send'
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
