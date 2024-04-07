import { RxDashboard } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAttachEmail } from "react-icons/md";

export const sideItems = [
    {
        name:'Dashboard',
        icon:RxDashboard,
        path:'/dashboard'
    },
    {
        name:'Create jobs',
        icon:RxDashboard,
        path:'/dashboard/create-job'
    },
    {
        name:'Interview',
        icon:RxDashboard,
        path:'/dashboard/interview'
    },
    {
        name:'Applicant',
        icon:RxDashboard,
        path:'/dashboard/applicant'
    },
    {
        name:'Jobs',
        icon:MdOutlineAttachEmail,
        path:'/dashboard/jobs'
    },
    {
        name:'Profile',
        icon:CgProfile,
        path:'/dashboard/profile'
    },

]
