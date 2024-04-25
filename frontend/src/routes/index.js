import {lazy} from 'react'

const LandingPage = lazy(() => import('../pages/home'));
const Register = lazy(() => import('../pages/auth/register.jsx'));
const Login = lazy(() => import('../pages/auth/login.jsx'));
const OtpCode = lazy(() => import('../pages/auth/otp'));
const ResetPassword = lazy(() => import('../pages/auth/resetPassword.jsx'));
const ForgotPassword = lazy(() => import('../pages/auth/forgotPassword.jsx'));
const ResendCode = lazy(() => import('../pages/auth/resendCode.jsx'));
const UserDetails = lazy(() => import('../pages/auth/userDetails.jsx'));
// 
const Dashboard = lazy(() => import('../pages/layout/dashboard'));
const Overview = lazy(() => import('../pages/applicant/overview.jsx'));
const Jobs = lazy(() => import('../pages/applicant/jobs.jsx'));
const Profile = lazy(() => import('../pages/applicant/profile.jsx'));
const Settings = lazy(() => import('../pages/applicant/settings.jsx'));
const CreateNewJob = lazy(() => import('../pages/applicant/postJobs.jsx'));
const ApplicationList = lazy(() => import('../pages/applicant/application.jsx'))

// Hr
const JobCreation = lazy(() => import('../pages/hr/create-jobs.jsx'))
const HROverview = lazy(() => import('../pages/hr/overview.jsx'))
const Interview = lazy(() => import('../pages/hr/interview.jsx'));
const Application = lazy(() => import('../pages/hr/application.jsx'));


// const user = JSON.parse(localStorage.getItem('userDetails'))

// element: user?.role === 'Admin' ? HROverview : Overview

export const routes = [
    {
        path: '/',
        element:LandingPage,
    },
    {
        path: '/signup',
        element:Register,
    },
    {
        path: '/login',
        element:Login,
    },
    {
        path: `/code`,
        element:OtpCode,
    },
    {
        path: '/reset-password',
        element:ResetPassword,
    },
    
    {
        path: '/forgot-password',
        element:ForgotPassword,
    },
    {
        path: '/resend-code',
        element:ResendCode,
    },
    {
        path: '/userDetails',
        element:UserDetails,
    },
    {
        path: '/dashboard',
        element:Dashboard,
        children:[
            {
                path:'',
                element: Overview
            },
            {
                path:'applications',
                element:ApplicationList
            },
            {
                path:'applicant',
                element:Application
            },
            {
                path:'jobs',
                element:Jobs
            },
            {
                path:'create-job',
                element:JobCreation
            },
            {
                path:'settings',
                element:Settings
            },
            {
                path:'profile',
                element:Profile
            },
            {
                path:'postJobs',
                element:CreateNewJob
            },
            
        ]
    },
];