import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CourseDetails from "./components/courses/CourseDetails";
import LoginComponent from "./components/shared/Login";
import Signup from "./components/shared/Signup";
import GenerateCertificate from "./pages/GenerateCertificate";
import UserList from "./components/admin/UserList";

import PendingEnrollments from "./components/admin/PendingEnrollments";
import CourseForm from "./components/courses/CourseForm";
import UserDashboard from "./components/user/DashBoard";
import UserEnrolledCourses from "./components/user/UserEnrolledCourses";
import { AuthProvider } from "./contexts/authContext";
import Feedback from "./pages/Feedback";
import AdminDashboard from "./components/admin/Dashboard";
import Profile from "./components/shared/Profile";
import { ToastContainer } from "react-toastify";
import Header from "./components/shared/header";
import Footer from "./components/shared/footer";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <main className="mt-5 pt-2 bg-body-tertiary">
          <Header />
          {/* Routing configuration */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/admin/create-courses" element={<CourseForm />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/courses/update/:id" element={<CourseForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/admin/login"
              element={<LoginComponent userType="admin" />}
            />

            <Route
              path="/admin/approve-courses"
              element={<PendingEnrollments />}
            />

            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/signup" element={<Signup userType="admin" />} />
            <Route path="/user/signup" element={<Signup userType="user" />} />
            <Route
              path="/course/:id/success"
              element={<GenerateCertificate />}
            />
            <Route
              path="/user/login"
              element={<LoginComponent userType="user" />}
            />

            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route
              path="/user/enroll-courses"
              element={<UserEnrolledCourses />}
            />

            <Route path="/admin/feedback-details" element={<Feedback />} />

            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/user/profile" element={<Profile />} />
          </Routes>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </main>
      </AuthProvider>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
