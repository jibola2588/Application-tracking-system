import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <ToastContainer />
    <App />
  </React.StrictMode>,
)
