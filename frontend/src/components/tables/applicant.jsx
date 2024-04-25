import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import moment from "moment";
import styled from "styled-components";
import TablePagination from "@mui/material/TablePagination";
import Application from "../modals/hr/applications";
import Axios from "axios";
import ScheduleInterviewPopup from "../interviewCalendar";

const Container = styled.div``;
const Top = styled.div``;
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
const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  background-color: ${(props) => props.backgroundColor || "transparent"};
  color: ${(props) => props.color || "#333"};
  border: 1px solid ${(props) => props.borderColor || "#ccc"};
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  &:hover {
    background-color: ${(props) => props.hoverBackgroundColor || "#f5f5f5"};
    color: ${(props) => props.hoverColor || "#333"};
    border-color: ${(props) => props.hoverBorderColor || "#ccc"};
  }
`;

const Bottom = styled.div``;

const currentDate = moment().format("YYYY-MM-DD");

export default function ApplicantTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [showSchedulePopup, setShowSchedulePopup] = useState(false); // State for showing Schedule Interview popup

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:8000/appliedJob/list`
        );
        setAppliedJobs(response.data);
        console.log(response.data, "list check");
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };
    fetchAppliedJobs();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const filteredJobs = appliedJobs.filter(
    (job) =>
      job._id.toLowerCase().includes(search.toLowerCase()) ||
      job.companyName.toLowerCase().includes(search.toLowerCase()) ||
      job.designation.toLowerCase().includes(search.toLowerCase()) ||
      job.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleClick = (data) => {
    console.log("id is here", data);
    setOpen(true);
    setItem(data);
  };

   const handleScheduleInterview = async (id) => {
    try {
      await Axios.put(`http://localhost:8000/appliedJob/schedule/${id}`, {
        interviewDate: moment().add(7, 'days').format("YYYY-MM-DD"), // Example: Schedule interview after 7 days
      });
      console.log("Interview scheduled for applicant with ID:", id);
      const response = await Axios.get(`http://localhost:8000/appliedJob/list`);
      setAppliedJobs(response.data);
      setShowSchedulePopup(false);
    } catch (error) {
      console.error("Error scheduling interview:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await Axios.put(`http://localhost:8000/appliedJob/reject/${id}`);
      console.log("Applicant rejected with ID:", id);
      const response = await Axios.get(`http://localhost:8000/appliedJob/list`);
      setAppliedJobs(response.data);
    } catch (error) {
      console.error("Error rejecting applicant:", error);
    }
  };

  return (
    <Container>
      {open && item && (
        <Application open={open} onclose={onClose} item={item} />
      )}
       <ScheduleInterviewPopup
        isOpen={showSchedulePopup}
        onClose={() => setShowSchedulePopup(false)}
        onSchedule={handleScheduleInterview}
      />
  
      {/* <VerticalSpacer size='1rem' /> */}
      <Top className="flex justify-end">
        <div className="flex">
          <span className="border border-silver rounded-md flex items-center gap-1 px-2 mb-2">
            <CiSearch style={{ color: "silver" }} />
            <input
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
              className="border-none bg-transparent outline-none flex-1 py-2"
            />
          </span>
        </div>
      </Top>
      <Bottom>
        {appliedJobs ? (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th>Applicant id</th>
                <th>Date</th>
                <th>Applicant name</th>
                <th>Designation</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((job, index) => (
                  <tr
                    key={index}
                    className="text-left border-b border-[#e7e5e5] cursor-pointer"
                    onClick={() => handleClick(job)}
                  >
                    <td>{job._id}</td>
                    <td>{job.appliedAt}</td>
                    <td>{`${job.firstName} ${job.lastName}`}</td>
                    <td>{job.designation}</td>
                    <td className="flex items-start">
                      <Status type={job.status} className="py-1 px-2 rounded-md">
                        {job.status}
                      </Status>
                    </td>
                    <td>
                    {(
                    <ActionButtons>
                    <Button
                      backgroundColor="#4CAF50"
                      color="#FFF"
                      onClick={() => handleScheduleInterview(job._id)}
                      disabled={job.status === "rejected"}
                    >
                      Schedule Interview
                    </Button>
                    <Button
                      backgroundColor="#f44336"
                      color="#FFF"
                      onClick={() => handleReject(job._id)}
                      disabled={job.status === "rejected"}
                    >
                      Reject
                    </Button>
                  </ActionButtons>
                    )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
            <table className="w-full">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th>Applicant id</th>
                <th>Date</th>
                <th>Applicant name</th>
                <th>Designation</th>
                <th>Status</th>
              </tr>
            </thead>
            <tr>
                <td colSpan="5" className="text-center pt-10 text-xl0 text-gray-500">
                  No data found
                </td>
            </tr>
          </table>
        
        )}
        <TablePagination
          component="div"
          count={appliedJobs ? appliedJobs.length : 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Bottom>
    </Container>
  );
}
