import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/AuthProvider.jsx';
import Register from "./Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Lounge from "./components/Lounge";
import LinkPage from "./components/LinkPage";
import RequireAuth from "./components/RequireAuth.jsx";
import './index.css'

// This is a lookup an optional lookup table it can make it easier to deal with codes that are matched with some value and it gives autocompletion. Now you donn't have to remember cryptic numbers.
// You may also want to avoid this if you don't want people to easily understand your descriptions
const ROLES = { 
    "User": 2001,
    "Editor": 1984,
    "Admin": 5150
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            // public routes
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "linkpage",
                element: <LinkPage />
            },
            {
                path: "unauthhorized",
                element: <Unauthorized />
            },
            // we want to protect these routes
            {
                element: <RequireAuth allowedRoles={[ROLES.User]}/>,
                children: [
                    {
                        index: true,
                        element: <Home /> 
                    }
                ]
            },
            {
                element: <RequireAuth allowedRoles={[ROLES.Editor]}/>,
                children: [
                    {
                        path: "editor",
                        element: <Editor />
                    }
                ]
            },
            {
                element: <RequireAuth allowedRoles={[ROLES.Admin]}/>,
                children: [
                    {
                        path: "admin",
                        element: <Admin />
                    }
                ]
            },
            {
                element: <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]}/>,
                children: [
                    {
                        path: "lounge",
                        element: <Lounge />
                    }
                ]
            },
            // catch all
            {
                path: "*",
                element: <Missing />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>,
);