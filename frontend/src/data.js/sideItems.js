import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAttachEmail,MdOutlineMeetingRoom } from "react-icons/md";

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
