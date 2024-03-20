import {lazy} from 'react'

const Register = lazy(() => import('../pages/register'));
const Login = lazy(() => import('../pages/login'));

export const routes = [
    {
        path: '/',
        element: Register,
    },
    {
        path: '/login',
        element: Login,
    },
];