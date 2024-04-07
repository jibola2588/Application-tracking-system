import { useState } from "react";
// import { useSelector } from 'react-redux';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const CreateNewJob = () => {
  // const user = useSelector(state => state.User.userData);
  const router = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    experience: "",
    salary: "",
    locations: [],
    qualifications: "",
    skills: [],
    timePosted: "",
    applicantsCount: 0,
    daysLeft: 0,
  });
  const [error, setError] = useState({
    title: "",
    company: "",
    experience: "",
    salary: "",
    locations: "",
    qualifications: "",
    skills: "",
    timePosted: "",
    applicantsCount: "",
    daysLeft: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title) {
      setError({ ...error, title: "Title field is required" });
      return;
    }

    if (!formData.company) {
      setError({ ...error, company: "Company field is required" });
      return;
    }

    if (!formData.experience) {
      setError({ ...error, experience: "Experience field is required" });
      return;
    }

    if (!formData.salary) {
      setError({ ...error, salary: "Salary field is required" });
      return;
    }

    if (!formData.locations.length) {
      setError({ ...error, locations: "Location field is required" });
      return;
    }

    if (!formData.qualifications) {
      setError({
        ...error,
        qualifications: "Qualifications field is required",
      });
      return;
    }

    if (!formData.skills.length) {
      setError({ ...error, skills: "Skills field is required" });
      return;
    }

    if (!formData.timePosted) {
      setError({ ...error, timePosted: "Time Posted field is required" });
      return;
    }

    if (!formData.applicantsCount) {
      setError({
        ...error,
        applicantsCount: "Applicants Count field is required",
      });
      return;
    }

    if (!formData.daysLeft) {
      setError({ ...error, daysLeft: "Days Left field is required" });
      return;
    }

    try {
      const response = await Axios.post(
        "http://localhost:8000/jobs/post",
        formData
      );
      if (response) {
        toast.success("Job posted successfully!");
        setTimeout(() => {
          router("/dashboard/jobs");
        }, 2000);
      }
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Failed to post job. Please try again later.");
    }
  };

  // const skills = [
  //   "Prototyping",
  //   "Wireframe",
  //   "Figma",
  //   "Adobe XD",
  //   "Design system",
  // ];

  // const handleSkillChange = (e) => {
  //   const skill = e.target.value;
  //   const isChecked = e.target.checked;

  //   if (isChecked) {
  //     setFormData({ ...formData, skills: [...formData.skills, skill] });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       skills: formData.skills.filter((s) => s !== skill),
  //     });
  //   }
  // };

  return (
    <>
      <div className="w-full py-20 flex items-center justify-center flex-col">
        <h1 className="text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl">
          Enter Job Details
        </h1>
        <form
          onSubmit={handleSubmit}
          className="sm:w-1/2 w-full px-4 mx-4 h-full"
        >
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label htmlFor="title" className="mb-1 text-base font-semibold">
              Title :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              type="text"
              id="title"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter title of job"
            />
            {error.title && (
              <p className="text-sm text-red-500">{error.title}</p>
            )}
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label htmlFor="company" className="mb-1 text-base font-semibold">
              Company :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              type="text"
              id="company"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter Company of job"
            />
            {error.company && (
              <p className="text-sm text-red-500">{error.company}</p>
            )}
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label
              htmlFor="experience"
              className="mb-1 text-base font-semibold"
            >
              Experience :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              type="text"
              id="experience"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter required experience"
            />
            {error.experience && (
              <p className="text-sm text-red-500">{error.experience}</p>
            )}
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label htmlFor="salary" className="mb-1 text-base font-semibold">
              Salary :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, salary: e.target.value })
              }
              type="text"
              id="salary"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter salary"
            />
            {error.salary && (
              <p className="text-sm text-red-500">{error.salary}</p>
            )}
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label htmlFor="locations" className="mb-1 text-base font-semibold">
              Locations :
            </label>
            <input
              onChange={(e) =>
                setFormData({
                  ...formData,
                  locations: e.target.value.split(","),
                })
              }
              type="text"
              id="locations"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter locations separated by commas"
            />
            {error.locations && (
              <p className="text-sm text-red-500">{error.locations}</p>
            )}
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label
              htmlFor="qualifications"
              className="mb-1 text-base font-semibold"
            >
              Qualifications :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, qualifications: e.target.value })
              }
              type="text"
              id="qualifications"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter required qualifications"
            />
            {error.qualifications && (
              <p className="text-sm text-red-500">{error.qualifications}</p>
            )}
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label htmlFor="skills" className="mb-1 text-base font-semibold">
              Skills :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, skills: e.target.value })
              }
              type="text"
              id="skills"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter required skills"
            />
            {error.skills && (
              <p className="text-sm text-red-500">{error.skills}</p>
            )}
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label
              htmlFor="timePosted"
              className="mb-1 text-base font-semibold"
            >
              Time Posted :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, timePosted: e.target.value })
              }
              type="date"
              id="timePosted"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter time posted"
            />
            {error.timePosted && (
              <p className="text-sm text-red-500">{error.timePosted}</p>
            )}
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label
              htmlFor="applicantsCount"
              className="mb-1 text-base font-semibold"
            >
              Applicants Count :
            </label>
            <input
              onChange={(e) =>
                setFormData({
                  ...formData,
                  applicantsCount: parseInt(e.target.value),
                })
              }
              type="number"
              id="applicantsCount"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter number of applicants"
            />
            {error.applicantsCount && (
              <p className="text-sm text-red-500">{error.applicantsCount}</p>
            )}
          </div>
          <div className="w-full mb-4 flex flex-col items-start justify-center">
            <label htmlFor="daysLeft" className="mb-1 text-base font-semibold">
              Days Left :
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, daysLeft: parseInt(e.target.value) })
              }
              type="number"
              id="daysLeft"
              className="w-full py-2 px-3 mb-2 border border-indigo-600 rounded"
              placeholder="Enter days left"
            />
            {error.daysLeft && (
              <p className="text-sm text-red-500">{error.daysLeft}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-indigo-600 text-white font-semibold tracking-widest"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateNewJob;
