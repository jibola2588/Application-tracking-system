import {lazy} from 'react'

const Register = lazy(() => import('../pages/register'));
const Login = lazy(() => import('../pages/login'));
const Home = lazy(() => import('../pages/home'));


export const routes = [
    {
        path: '/signup',
        element: Register,
    },
    {
        path: '/login',
        element: Login,
    },
    {
        path: '/',
        element: Home,
    },
];