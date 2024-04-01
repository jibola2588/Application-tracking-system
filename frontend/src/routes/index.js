import {lazy} from 'react'

const LandingPage = lazy(() => import('../pages/home'));
const Register = lazy(() => import('../pages/auth/register.jsx'));
const Login = lazy(() => import('../pages/auth/login.jsx'));
const OtpCode = lazy(() => import('../pages/auth/otp'));
const ResetPassword = lazy(() => import('../pages/auth/resetPassword.jsx'));
const ForgotPassword = lazy(() => import('../pages/auth/forgotPassword.jsx'));
const ResendCode = lazy(() => import('../pages/auth/resendCode.jsx'));
// 
const Dashboard = lazy(() => import('../pages/layout/dashboard'));
const Overview = lazy(() => import('../pages/applicant/overview.jsx'));
const Interview = lazy(() => import('../pages/applicant/interviews.jsx'));
const Jobs = lazy(() => import('../pages/applicant/jobs.jsx'));
const Profile = lazy(() => import('../pages/applicant/profile.jsx'));
const Settings = lazy(() => import('../pages/applicant/settings.jsx'));

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
        path: '/code',
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
        path: '/dashboard',
        element:Dashboard,
        children:[
            {
                path:'',
                element:Overview
            },
            {
                path:'interviews',
                element:Interview
            },
            {
                path:'jobs',
                element:Jobs
            },
            {
                path:'settings',
                element:Settings
            },
            {
                path:'profile',
                element:Profile
            }
        ]
    },
];