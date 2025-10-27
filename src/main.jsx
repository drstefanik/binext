
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import SignupSchool from "./pages/auth/SignupSchool.jsx";
import SignupStudent from "./pages/auth/SignupStudent.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminFolders from "./pages/admin/Folders.jsx";
import AdminFiles from "./pages/admin/Files.jsx";
import AdminSchools from "./pages/admin/Schools.jsx";
import SchoolLayout from "./pages/school/SchoolLayout.jsx";
import SchoolDashboard from "./pages/school/Dashboard.jsx";
import SchoolDownloads from "./pages/school/Downloads.jsx";
import StudentLayout from "./pages/student/StudentLayout.jsx";
import StudentDashboard from "./pages/student/Dashboard.jsx";
import StudentDownloads from "./pages/student/Downloads.jsx";
import Protected from "./routes/Protected.jsx";
import "./styles/tailwind.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup-school", element: <SignupSchool /> },
      { path: "signup-student", element: <SignupStudent /> },
      {
        path: "admin",
        element: (
          <Protected roles={["admin"]}>
            <AdminLayout />
          </Protected>
        ),
        children: [
          { index: true, element: <AdminFolders /> },
          { path: "folders", element: <AdminFolders /> },
          { path: "files", element: <AdminFiles /> },
          { path: "schools", element: <AdminSchools /> },
        ],
      },
      {
        path: "school",
        element: (
          <Protected roles={["school"]}>
            <SchoolLayout />
          </Protected>
        ),
        children: [
          { index: true, element: <SchoolDashboard /> },
          { path: "downloads", element: <SchoolDownloads /> },
        ],
      },
      {
        path: "student",
        element: (
          <Protected roles={["student"]}>
            <StudentLayout />
          </Protected>
        ),
        children: [
          { index: true, element: <StudentDashboard /> },
          { path: "downloads", element: <StudentDownloads /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
