import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAttachEmail } from "react-icons/md";

export const sideItems = [
    {
        name:'Dashboard',
        icon:RxDashboard,
        path:'/dashboard'
    },
    // {
    //     name:'Interviews',
    //     icon:MdOutlineMeetingRoom,
    //     path:'/dashboard/interviews'
    // },
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

    {
        name:'Settings',
        icon:IoSettingsOutline,
        path:'/dashboard/settings'
    },
    {
        name:'Create Job Posting',
        icon:CgProfile,
        path:'/dashboard/postJobs'
    },

]