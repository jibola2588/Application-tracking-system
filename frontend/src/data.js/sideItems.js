import { RxDashboard } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAttachEmail } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { TbUsersGroup } from "react-icons/tb";

export const sideItems = [
    {
        name:'Dashboard',
        icon:RxDashboard,
        path:'/dashboard'
    },
    {
        name:'Jobs',
        icon:MdOutlineAttachEmail,
        path:'/dashboard/jobs'
    },
    {
        name:'Applications',
        icon:BsPersonWorkspace,
        path:'/dashboard/applications'
    },
    {
        name:'Profile',
        icon:CgProfile,
        path:'/dashboard/profile'
    },
]

export const HrSideNav = [ 
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
        name:'Applicant',
        icon:TbUsersGroup,
        path:'/dashboard/applicant'
    },
]
