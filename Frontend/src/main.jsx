import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate, } from "react-router-dom";

import Home from "./components/Home/Home.jsx";
import Notes from "./components/Notes/Notes.jsx";
import SelectBranch from "./components/Notes/SelectBranch.jsx";
import FirstYear from "./components/Notes/FirstYear/FirstYear.jsx";
import SecondYear from "./components/Notes/SecondYear/SecondYear.jsx";
import ThirdYear from "./components/Notes/ThirdYear/ThirdYear.jsx";
import FourthYear from "./components/Notes/FourthYear/FourthYear.jsx";
import CoursePage from "./components/Notes/FirstYear/CoursePage.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import About from "./components/About/About.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Syllabus from "./components/Syllabus/Syllabus.jsx";
import SyllabusManager from "./components/Admin/SyllabusManager.jsx";
import AdminRoute from "./components/Admin/AdminRoute.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import NoNotesAvailable from "./components/Notes/NoNotesAvailable.jsx";
import UploadPDF from "./components/Admin/UploadPDF.jsx";
import IMPORTANT_QUESTIONS_MANAGER from "./components/Admin/ImportantQuestionManager.jsx";
import ViewQuestions from "./components/ImportantQuestions/ViewQuestions.jsx";
import PYQ_MANAGER from "./components/Admin/PYQManager.jsx";
import ViewPYQs from "./components/PYQs/ViewPYQs.jsx";
import UserRole from "./components/Admin/UserRole.jsx";
import VerifyOTP from "./components/VerifyOTP.jsx";
import ForgotPassword from "./components/Authentication/ForgotPassword.jsx";
import ResetPassword from "./components/Authentication/ResetPassword.jsx";
import TimeTable from "./components/TimeTable/TimeTable.jsx";
import UserProfile from "./components/Profile/UserProfile.jsx";
import PublicProfile from "./components/Profile/PublicProfile.jsx";
import CompareView from "./components/Profile/CompareView.jsx";
import Platforms from "./components/Profile/Platforms.jsx";
import PPolicy from "./components/Footer/PPolicy.jsx";
import TOS from "./components/Footer/TOS.jsx";
import Pomodoro from "./components/StudyTools/Pomodoro.jsx";
import GPACalculator from "./components/StudyTools/GPACalculator.jsx";
import StudyManager from "./components/StudyTools/StudyManager.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>


      <Route path="/" element={<App />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/u/:username" element={<PublicProfile />} />
        <Route path="/compare" element={<CompareView />} />
        <Route path="/platforms" element={<PrivateRoute><Platforms /></PrivateRoute>} />
        <Route path="/privacy-policy" element={<PPolicy />} />
        <Route path="/terms-of-service" element={<TOS />} />
        <Route path="/important-questions" element={<PrivateRoute><ViewQuestions /></PrivateRoute>} />
        <Route path="/pyqs" element={<PrivateRoute><ViewPYQs /></PrivateRoute>} />


        {/* Private Routes */}
        <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
        <Route path="notes" element={<PrivateRoute><Notes /></PrivateRoute>} />
        <Route path="branch" element={<PrivateRoute><SelectBranch /></PrivateRoute>} />
        <Route path="notes/firstyear" element={<PrivateRoute><FirstYear /></PrivateRoute>} />
        <Route path="notes/secondyear" element={<PrivateRoute><SecondYear /></PrivateRoute>} />
        <Route path="notes/thirdyear" element={<PrivateRoute><ThirdYear /></PrivateRoute>} />
        <Route path="notes/fourthyear" element={<PrivateRoute><FourthYear /></PrivateRoute>} />
        <Route path="NoNotesAvailable" element={<PrivateRoute><NoNotesAvailable /></PrivateRoute>} />
        <Route path="notes/:subjectCode" element={<PrivateRoute><CoursePage /></PrivateRoute>} />
        <Route path="/syllabus" element={<PrivateRoute><Syllabus /></PrivateRoute>} />
        <Route path="/timetable" element={<PrivateRoute><TimeTable /></PrivateRoute>} />

        {/* Study Tools Routes */}
        <Route path="/study/pomodoro" element={<PrivateRoute><Pomodoro /></PrivateRoute>} />
        <Route path="/study/gpa-calculator" element={<PrivateRoute><GPACalculator /></PrivateRoute>} />
        <Route path="/study/tools" element={<PrivateRoute><StudyManager /></PrivateRoute>} />
        <Route path="/study/planner" element={<Navigate to="/study/tools?tab=planner" replace />} />
        <Route path="/study/highlighter" element={<Navigate to="/study/tools?tab=highlighter" replace />} />


        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="admin/upload-notes" element={<PrivateRoute>< UploadPDF /></PrivateRoute>} />
        <Route path="/admin/syllabus-table" element={<AdminRoute><SyllabusManager /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><UserRole /></AdminRoute>} />
        <Route path="/admin/important-questions" element={<AdminRoute><IMPORTANT_QUESTIONS_MANAGER /></AdminRoute>} />
        <Route path="/admin/pyqs" element={<AdminRoute><PYQ_MANAGER /></AdminRoute>} />




        {/* Redirect to login if route does not exist */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </>
  )
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>


    <AuthProvider>
      <RouterProvider router={router} />

    </AuthProvider>
  </React.StrictMode>
);
