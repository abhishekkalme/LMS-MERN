import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate, } from "react-router-dom";

import LoadingBar from "./components/Header/LoadingBar.jsx";

const Home = lazy(() => import("./components/Home/Home.jsx"));
const Notes = lazy(() => import("./components/Notes/Notes.jsx"));
const SelectBranch = lazy(() => import("./components/Notes/SelectBranch.jsx"));
const FirstYear = lazy(() => import("./components/Notes/FirstYear/FirstYear.jsx"));
const SecondYear = lazy(() => import("./components/Notes/SecondYear/SecondYear.jsx"));
const ThirdYear = lazy(() => import("./components/Notes/ThirdYear/ThirdYear.jsx"));
const FourthYear = lazy(() => import("./components/Notes/FourthYear/FourthYear.jsx"));
const CoursePage = lazy(() => import("./components/Notes/FirstYear/CoursePage.jsx"));
const Login = lazy(() => import("./components/Login.jsx"));
const Register = lazy(() => import("./components/Register.jsx"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute.jsx"));
const About = lazy(() => import("./components/About/About.jsx"));
const Contact = lazy(() => import("./components/Contact/Contact.jsx"));
const Syllabus = lazy(() => import("./components/Syllabus/Syllabus.jsx"));
const SyllabusManager = lazy(() => import("./components/Admin/SyllabusManager.jsx"));
const AdminRoute = lazy(() => import("./components/Admin/AdminRoute.jsx"));
const AdminDashboard = lazy(() => import("./components/Admin/AdminDashboard.jsx"));
const NoNotesAvailable = lazy(() => import("./components/Notes/NoNotesAvailable.jsx"));
const UploadPDF = lazy(() => import("./components/Admin/UploadPDF.jsx"));
const IMPORTANT_QUESTIONS_MANAGER = lazy(() => import("./components/Admin/ImportantQuestionManager.jsx"));
const ViewQuestions = lazy(() => import("./components/ImportantQuestions/ViewQuestions.jsx"));
const PYQ_MANAGER = lazy(() => import("./components/Admin/PYQManager.jsx"));
const ViewPYQs = lazy(() => import("./components/PYQs/ViewPYQs.jsx"));
const UserRole = lazy(() => import("./components/Admin/UserRole.jsx"));
const VerifyOTP = lazy(() => import("./components/VerifyOTP.jsx"));
const ForgotPassword = lazy(() => import("./components/Authentication/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("./components/Authentication/ResetPassword.jsx"));
const TimeTable = lazy(() => import("./components/TimeTable/TimeTable.jsx"));
const UserProfile = lazy(() => import("./components/Profile/UserProfile.jsx"));
const PublicProfile = lazy(() => import("./components/Profile/PublicProfile.jsx"));
const CompareView = lazy(() => import("./components/Profile/CompareView.jsx"));
const Platforms = lazy(() => import("./components/Profile/Platforms.jsx"));
const PPolicy = lazy(() => import("./components/Footer/PPolicy.jsx"));
const TOS = lazy(() => import("./components/Footer/TOS.jsx"));
const Pomodoro = lazy(() => import("./components/StudyTools/Pomodoro.jsx"));
const GPACalculator = lazy(() => import("./components/StudyTools/GPACalculator.jsx"));
const StudyManager = lazy(() => import("./components/StudyTools/StudyManager.jsx"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Suspense fallback={<LoadingFallback />}><Home /></Suspense>} />
        <Route path="/login" element={<Suspense fallback={<LoadingFallback />}><Login /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={<LoadingFallback />}><Register /></Suspense>} />
        <Route path="/about" element={<Suspense fallback={<LoadingFallback />}><About /></Suspense>} />
        <Route path="/contact-us" element={<Suspense fallback={<LoadingFallback />}><Contact /></Suspense>} />
        <Route path="/verify-otp" element={<Suspense fallback={<LoadingFallback />}><VerifyOTP /></Suspense>} />
        <Route path="/forgot-password" element={<Suspense fallback={<LoadingFallback />}><ForgotPassword /></Suspense>} />
        <Route path="/reset-password/:token" element={<Suspense fallback={<LoadingFallback />}><ResetPassword /></Suspense>} />
        <Route path="/u/:username" element={<Suspense fallback={<LoadingFallback />}><PublicProfile /></Suspense>} />
        <Route path="/compare" element={<Suspense fallback={<LoadingFallback />}><CompareView /></Suspense>} />
        <Route path="/platforms" element={<Suspense fallback={<LoadingFallback />}><PrivateRoute><Platforms /></PrivateRoute></Suspense>} />
        <Route path="/privacy-policy" element={<PPolicy />} />
<Route path="/terms-of-service" element={<Suspense fallback={<LoadingFallback />}><TOS /></Suspense>} />
        <Route path="/important-questions" element={<Suspense fallback={<LoadingFallback />}><PrivateRoute><ViewQuestions /></PrivateRoute></Suspense>} />
        <Route path="/pyqs" element={<Suspense fallback={<LoadingFallback />}><PrivateRoute><ViewPYQs /></PrivateRoute></Suspense>} />


        {/* Private Routes */}
        <Route path="/profile" element={<Suspense fallback={<LoadingFallback />}><PrivateRoute><UserProfile /></PrivateRoute></Suspense>} />
        <Route path="notes" element={<Suspense fallback={<LoadingFallback />}><PrivateRoute><Notes /></PrivateRoute></Suspense>} />
        <Route path="branch" element={<Suspense fallback={<LoadingFallback />}><PrivateRoute><SelectBranch /></PrivateRoute></Suspense>} />
        <Route path="notes/firstyear" element={<Suspense fallback={<LoadingFallback />}><PrivateRoute><FirstYear /></PrivateRoute></Suspense>} />
        <Route path="notes/secondyear" element={<Suspense fallback={<LoadingFallback />}><PrivateRoute><SecondYear /></PrivateRoute></Suspense>} />
        <Route path="notes/thirdyear" element={<Suspense fallback={<LoadingFallback />}><PrivateRoute><ThirdYear /></PrivateRoute></Suspense>} />
        <Route path="notes/fourthyear" element={<Suspense fallback={<LoadingFallback />}><PrivateRoute><FourthYear /></PrivateRoute></Suspense>} />
        <Route path="NoNotesAvailable" element={<Suspense fallback={<LoadingFallback />}><PrivateRoute><NoNotesAvailable /></PrivateRoute></Suspense>} />
        <Route path="notes/:subjectCode" element={<Suspense fallback={<LoadingFallback />}><PrivateRoute><CoursePage /></PrivateRoute></Suspense>} />
        <Route path="/syllabus" element={<Suspense fallback={<LoadingFallback />}><PrivateRoute><Syllabus /></PrivateRoute></Suspense>} />
        <Route path="/timetable" element={<Suspense fallback={<LoadingFallback />}><PrivateRoute><TimeTable /></PrivateRoute></Suspense>} />

        {/* Study Tools Routes */}
        <Route path="/study/pomodoro" element={<Suspense fallback={<LoadingFallback />}><PrivateRoute><Pomodoro /></PrivateRoute></Suspense>} />
        <Route path="/study/gpa-calculator" element={<Suspense fallback={<LoadingFallback />}><PrivateRoute><GPACalculator /></PrivateRoute></Suspense>} />
        <Route path="/study/tools" element={<Suspense fallback={<LoadingFallback />}><PrivateRoute><StudyManager /></PrivateRoute></Suspense>} />
        <Route path="/study/planner" element={<Navigate to="/study/tools?tab=planner" replace />} />
        <Route path="/study/highlighter" element={<Navigate to="/study/tools?tab=highlighter" replace />} />


        {/* Admin Routes */}
        <Route path="/admin" element={<Suspense fallback={<LoadingFallback />}><AdminRoute><AdminDashboard /></AdminRoute></Suspense>} />
        <Route path="admin/upload-notes" element={<Suspense fallback={<LoadingFallback />}><AdminRoute><UploadPDF /></AdminRoute></Suspense>} />
        <Route path="/admin/syllabus-table" element={<Suspense fallback={<LoadingFallback />}><AdminRoute><SyllabusManager /></AdminRoute></Suspense>} />
        <Route path="/admin/users" element={<Suspense fallback={<LoadingFallback />}><AdminRoute><UserRole /></AdminRoute></Suspense>} />
        <Route path="/admin/important-questions" element={<Suspense fallback={<LoadingFallback />}><AdminRoute><IMPORTANT_QUESTIONS_MANAGER /></AdminRoute></Suspense>} />
        <Route path="/admin/pyqs" element={<Suspense fallback={<LoadingFallback />}><AdminRoute><PYQ_MANAGER /></AdminRoute></Suspense>} />



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
