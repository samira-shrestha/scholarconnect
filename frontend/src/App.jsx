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

// University
import UniversityDashboard from "./pages/university/UniversityDashboard.jsx";
import ManagePrograms from "./pages/university/ManagePrograms.jsx";
import UniversityApplications from "./pages/university/UniversityApplications.jsx";

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

      <Route path="/university/login" element={<Login role="university" />} />
      <Route path="/university/register" element={<Register role="university" />} />

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

      {/* University Portal */}
      <Route
        path="/university"
        element={
          <PrivateRoute>
            <RoleRoute role="university">
              <PortalLayout />
            </RoleRoute>
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<UniversityDashboard />} />
        <Route path="programs" element={<ManagePrograms />} />
        <Route path="applications" element={<UniversityApplications />} />
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