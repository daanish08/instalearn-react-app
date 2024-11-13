import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/shared/header";
import Footer from "./components/shared/footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Admin from "./pages/Admin";
import User from "./pages/User";
import Contact from "./pages/Contact";
import CourseDetails from "./components/courses/CourseDetails";

const App = () => {
  return(
    <BrowserRouter>
     <Header/>
     <main className="container mt-5 pt-2">
        {/* Routing configuration */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </main>
     <Footer />
    </BrowserRouter>
  )
};

export default App;
