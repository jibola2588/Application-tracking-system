import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@mui/material";

const ScheduleInterviewPopup = ({ isOpen, onClose, onSchedule }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSchedule = () => {
    if (selectedDate) {
      onSchedule(selectedDate);
    }
  };

  return (
    <div className={`popup ${isOpen ? "open" : ""}`}>
      <div className="popup-inner">
        <h2>Schedule Interview</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
        />
        <Button onClick={handleSchedule}>Schedule</Button>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

export default ScheduleInterviewPopup;
