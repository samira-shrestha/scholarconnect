import React from "react";
import { Routes, Route } from "react-router-dom";

// Public
import Landing from "./pages/public/Landing.jsx";
import Login from "./pages/public/Login.jsx";
import Register from "./pages/public/Register.jsx";

// Guards + layout
import PortalLayout from "./components/PortalLayout.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";

// Student
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import ProgramList from "./pages/student/ProgramList.jsx";
import ProgramDetail from "./pages/student/ProgramDetail.jsx";
import MyApplications from "./pages/student/MyApplications.jsx";

// college
import ManagePrograms from "./pages/college/ManagePrograms.jsx";
import CollegeApplications from "./pages/college/CollegeApplications.jsx";
import CollegeDashboard from "./pages/college/CollegeDashboard.jsx";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

//Email Verify Page
import VerifyEmail from "./pages/public/VerifyEmail.jsx"

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/student/login" element={<Login role="student" />} />
      <Route path="/student/register" element={<Register role="student" />} />

      <Route path="/verify-email/:token" element={<VerifyEmail />} />

      <Route path="/college/login" element={<Login role="college" />} />
      <Route path="/college/register" element={<Register role="college" />} />

      {/* NEW ADMIN ROUTES */}
      <Route path="/admin/login" element={<Login role="admin" />} />
      <Route path="/admin/register" element={<Register role="admin" />} />

      {/* Student Portal */}
      <Route
        path="/student"
        element={
          <PrivateRoute>
            <RoleRoute role="student">
              <PortalLayout />
            </RoleRoute>
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="programs" element={<ProgramList />} />
        <Route path="programs/:id" element={<ProgramDetail />} />
        <Route path="applications" element={<MyApplications />} />
      </Route>

      {/* college Portal */}
      <Route
        path="/college"
        element={
          <PrivateRoute>
            <RoleRoute role="college">
              <PortalLayout />
            </RoleRoute>
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<CollegeDashboard />} />
        <Route path="programs" element={<ManagePrograms />} />
        <Route path="applications" element={<CollegeApplications />} />
      </Route>

      {/* ADMIN PORTAL */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <RoleRoute role="admin">
              <PortalLayout />
            </RoleRoute>
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />

      </Route>
    </Routes>
  );
}