import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Drawer } from "antd";
import styled from "styled-components";
import moment from "moment";
import { VerticalSpacer } from "../../verticalSpacer";
import Input from "../../input";
import { FiUploadCloud } from "react-icons/fi";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { VerticalSpacer } from '../../../verticalSpacer';

const currentDate = moment().format("YYYY-MM-DD");

const UserData = JSON.parse(localStorage.getItem("userDetails"));
const JobData = JSON.parse(localStorage.getItem("jobDetails"));

const Top = styled.div``;
const Bottom = styled.div``;

const Status = styled.div`
  color: ${(props) => {
    switch (props.type) {
      case "pending":
        return "orange";
      case "completed":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "black";
    }
  }};
  background-color: ${(props) => {
    switch (props.type) {
      case "pending":
        return "lightyellow";
      case "completed":
        return "lightgreen";
      case "cancelled":
        return "lightcoral";
      default:
        return "white";
    }
  }};
`;

const Trackwrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  margin-bottom: 2rem;
`;
const Trackline = styled.hr`
  border: 1px dashed #333333;
  height: 60px;
  position: absolute;
  top: 75%;
  left: 9px;
`;
const orderPlaced = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.005em;
  text-align: left;
`;
const orderedContent = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.005em;
  text-align: left;
`;
const Dot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => {
    switch (props.type) {
      case "submitted":
        return "#B2ADAD";
      case "test":
        return "#18425D";
      case "failed":
        return "red";
      case "scheduled":
        return "orange";
      case "passed":
        return "green";
      case "successful":
        return "green";
      case "rejected":
        return "red";
      default:
        return "white";
    }
  }};
`;

const Container = styled.div``;
const Upload = styled.div`
  border: 1px dashed gray;
  border-radius: 20px;
`;

const Jobs = ({ open, onclose, item }) => {
  const [openModal, setOpenModal] = useState(true);
  const navigate = useNavigate();

  const toggleModal = () => {
    setOpenModal(false);
  };

  const [file, setFile] = useState(null);

  function handleUpload(e) {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile({
        name: uploadedFile.name,
        type: uploadedFile.type,
        size: uploadedFile.size,
      });
    } else {
      setFile(null);
    }
  }

  useEffect(() => {
    if (file) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [file]);

  const [trackArray, setTrackArray] = useState([
    {
      status: "submitted",
      title: "Application received",
      date: currentDate,
    },
    {
      status: "test",
      title: "Test conducted",
      date: currentDate,
    },
    {
      status: "scheduled",
      title: "Interview scheduled",
      date: currentDate,
    },
    {
      status: "passed",
      title: "Interview passed",
      date: currentDate,
    },
    {
      status: "successful",
      title: "Applicantion successful",
      date: currentDate,
    },
  ]);

  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
  };

  const handleApply = async () => {
    try {
      const { fname, lname, email, phone } = formData;
      const data = {
        user: UserData._id, // Insert user ID here
        job: JobData._id, // Assuming item contains job ID
        firstName: fname,
        lastName: lname,
        email: email,
        companyName: item?.company,
        designation: item?.title,
        about: "", // Add other fields if needed
        phoneNumber: phone,
        cv: file ? file.name : "",
        status: "pending", // Default status
      };

      const response = await Axios.post(
        "http://localhost:8000/appliedJob/post",
        data
      );

      if (response.status === 201) {
        toast.success("Job application submitted successfully"); 
        navigate('/dashboard/applications');
      } else {
        throw new Error("Failed to submit job application");
      }
      console.log(response, "RESP");
    } catch (error) {
      console.error("Error submitting job application:", error);
    }
  };

  return (
    <>
      <Drawer title="Job details" onClose={onclose} open={open} width={800}>
        {openModal ? (
          <section>
            <Top className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[17px] leading-8">Company name</span>
                <span className="text-[17px]  leading-8">{item?.company}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[17px] leading-8">Applicant Date</span>
                <span className="text-[17px]  leading-8">
                  {item?.timePosted}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[17px] leading-8">Title</span>
                <span className="text-[17px]  leading-8">{item?.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[17px] leading-8">Experience level</span>
                <span className="text-[17px] leading-8">
                  {item?.experience}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[17px] leading-8">Qualifications</span>
                <span className="text-[17px]  leading-8">
                  {item?.qualifications}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[17px] leading-8">Skills</span>
                {/* <span className='text-[17px]  leading-8'>{item?.title}</span> */}
                <div className="flex flex-col">
                  {item?.skills.map((skill, index) => (
                    <span key={index} className="pl-8">
                      <ul className="list-none">
                        <li className="font-medium text-base">{skill}</li>
                      </ul>
                    </span>
                  ))}
                </div>
              </div>
             {item?.desc && <div className="flex items-start justify-between">
                <span className="text-[17px] leading-8">Description</span>
                <span className="text-[17px]  leading-8 max-w-lg break-words">
                  {item?.desc}
                </span>
              </div>}
              <div className="flex items-center justify-between">
                <span className="text-[17px] leading-8">Location</span>
                <span className="text-[17px]  leading-8">
                  {item?.locations}
                </span>
              </div>

              {/* <div className='flex items-center justify-between'>
            <span className='text-[17px] leading-8'>Days left</span>
            <span className='text-[17px]  leading-8'>{item?.daysLeft}</span>
          </div> */}
            </Top>
            <VerticalSpacer size="3rem" />
            <Bottom className="flex justify-end">
              <button
                onClick={toggleModal}
                className="bg-[#18425D] py-3 px-3 rounded-md flex items-center justify-center text-white w-[50%] font-medium "
              >
                Apply
              </button>
            </Bottom>
          </section>
        ) : (
          <section>
            <h3 className="font-medium text-lg">{item.company}</h3>
            <p>{item.title}</p>
            <div className="space-y-5 mt-4">
              <h3>Apply with the following details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <Input
                  value={formData.fname}
                  onChange={handleChange}
                  label="First name"
                  id="fname"
                  type="text"
                  name="fname"
                  placeholder="Enter your first name"
                  customclassname="bg-transparent"
                />

                <Input
                  value={formData.lname}
                  onChange={handleChange}
                  label="Last name"
                  id="lname"
                  type="text"
                  name="lname"
                  placeholder="Enter your last name"
                  customclassname="bg-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <Input
                  value={formData.email}
                  onChange={handleChange}
                  label="Email address"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  customclassname="bg-transparent"
                />
                <Input
                  value={formData.phone}
                  onChange={handleChange}
                  label="Phone number"
                  id="phone"
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  customclassname="bg-transparent"
                />
              </div>
            </div>
            <div>
              <Container>
                <VerticalSpacer size="2rem" />
                <div className="max-w-lg mx-auto">
                  <label htmlFor="upload">
                    <Upload
                      className={` ${
                        file ? "h-[330px]" : "h-[200px]"
                      }mt-6 relative`}
                    >
                      <span className="mt-10 flex justify-center">
                        <FiUploadCloud className="text-4xl" />
                      </span>
                      <input
                        id="upload"
                        type="file"
                        className="absolute top-0 left-0 h-[100%] w-[100%] outline-none border-none hidden"
                        onChange={handleUpload}
                      />
                      <p className="mt-5 mb-3 text-center">
                        upload your resume
                      </p>
                      {file && (
                        <p className="pl-32">
                          Name: {file.name}
                          <br />
                          Type: {file.type}
                          <br />
                          {/* Size: {file.size} bytes */}
                        </p>
                      )}
                    </Upload>
                  </label>
                </div>
              </Container>
            </div>
            <div className="flex gap-4 items-center mt-8">
              <button
                onClick={handleApply}
                className={
                  "w-[50%] bg-primary400 text-white rounded-md py-2 flex items-center justify-center cursor-pointer"
                }
              >
                Apply
              </button>
              <button className="w-[50%] border border-primary400 text-primary400 rounded-md py-2 flex items-center justify-center cursor-pointer">
                Apply with your profile
              </button>
            </div>
          </section>
        )}
      </Drawer>
    </>
  );
};
export default Jobs;
