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
import Header from "./components/shared/header";
import Footer from "./components/shared/footer";
import PendingEnrollments from "./components/admin/PendingEnrollments";

const App = () => {
  return (
    <BrowserRouter>
      <main className="mt-5 pt-2">
        <Header />
        {/* Routing configuration */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/admin/login"
            element={<LoginComponent userType="admin" />}
          />

          <Route
            path="/admin/enrollmentlist"
            element={<PendingEnrollments />}
          />

          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/signup" element={<Signup userType="admin" />} />
          <Route path="/user/signup" element={<Signup userType="user" />} />
          <Route
            path="/course/:id/success"
            element={<GenerateCertificate userId="1" courseId="1" />}
          />
          <Route
            path="/user/login"
            element={<LoginComponent userType="user" />}
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
