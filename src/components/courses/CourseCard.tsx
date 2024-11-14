import React, { useState } from "react";
import { ICourse } from "../../models/ICourse";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";

interface CourseCardProps {
  course: ICourse;
  handleUpdate: (courseId: number) => void;
  handleDelete: (courseId: number) => void;
  handleView: (courseId: number) => void;
  role: string | null | undefined;
}

const getRandomLogo = () => {
  const logos = [
    "src/assets/image/course-logo-1.png",
    "src/assets/image/course-logo-2.png",
    "src/assets/image/course-logo-3.png",
    "src/assets/image/course-logo-4.png",
    "src/assets/image/course-logo-5.png",
    "src/assets/image/course-logo-6.png",
  ];

  return logos[Math.floor(Math.random() * logos.length)];
};
const getRandomGradient = () => {
  const gradients = [
    "linear-gradient(135deg, #2C3E50, #4CA1AF)", // Dark blue to teal
    "linear-gradient(135deg, #232526, #414345)", // Dark gray to lighter gray
    "linear-gradient(135deg, #0F2027, #2C5364)", // Black to dark cyan
    "linear-gradient(135deg, #3A1C71, #D76D77)", // Dark purple to dark pink
    "linear-gradient(135deg, #1C1C1C, #383838)", // Dark gray to medium gray
    // New gradients
    "linear-gradient(to right, #f7971e, #ffd200)", // Orange to Yellow
    "linear-gradient(to right, #49D49D, #A2D9CE)", // Green to Light Green
    "linear-gradient(to right, #8E2DE2, #4A00E0)", // Purple to Dark Purple
    "linear-gradient(to bottom, #007bff, #0069d9)", // Blue to Darker Blue
    "linear-gradient(to right, #ff5733, #c70039)", // Red to Dark Red
    "linear-gradient(to right, #e6b8af, #946f5f)", // Pink to Brown
    "linear-gradient(to right, #2980B9, #6DD5FA)", // Blue to Light Blue
    "linear-gradient(to right, #FF416C, #FF4B2B)", // Pink/Red to Orange
    "linear-gradient(to bottom, #7474BF, #348AC7)", // Purple to Blue
    "linear-gradient(to right, #00b09b, #96c93d)", // Teal to Green
    "radial-gradient(circle, #FF6138, #FF9848)", // Orange Radial
    "radial-gradient(ellipse at center, #1E3C72, #2A5298)", // Blue Radial
  ];

  return gradients[Math.floor(Math.random() * gradients.length)];
};

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  handleUpdate,
  handleDelete,
  handleView,
  role,
}) => {

  const {user} =useAuth();
  const id= user?.id;
  
  
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState(false);

  const handleEnroll = async (courseId: number) => {
    try {

      const count = await axios.get(`http://localhost:8080/instalearn/api/v1/${id}/enroll/count`);
      console.log(count);
      
      
      const response = await axios.post(`http://localhost:8080/instalearn/api/v1/U${id}/C${courseId}/enroll`);
      console.log(response);
      
      if (response.status === 200 || response.status === 201) {
        setEnrolled(true);
        toast.success("Enrolled successfully! Redirecting to dashboard...");     
        setTimeout(() => {
          navigate(`/user/dashboard`);
        }, 3000);
      }
    } catch (error) {
      toast.error("Failed to enroll. Please try again later.");
      console.error("Enrollment error:", error);
    }
  };

  const cardStyle = {
    background: getRandomGradient(),
    borderRadius: "10px",
    color: "white",
  };

  return (
    <div
      className="col-md-4 "
      style={{ minHeight: "400px", overflowY: "auto" }}
    >
      <div className="card border border-0" style={cardStyle}>
        <img
          src={getRandomLogo()}
          className="card-img-top img-fluid"
          alt={course.courseName}
          style={{
            width: "230px",
            height: "130px",
            paddingTop: "10px",
            paddingLeft: "70px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        />
        <div className="card-body text-center ">
          <h5 className="card-title fw-semibold fs-4">{course.courseName}</h5>
          <p className="card-text">
            {course.instructor || "Tharun"} | {course.duration || "18"} Hrs
          </p>
          <hr />
          <div className="d-flex ps-5">
            {role === "ADMIN" && (
              <>
                <button
                  onClick={() => handleView(course.courseId)}
                  className="btn btn-primary me-3"
                >
                  View
                </button>
                <button
                  onClick={() => handleUpdate(course.courseId)}
                  className="btn btn-success me-3"
                >
                  UPDATE
                </button>
                <button
                  onClick={() => handleDelete(course.courseId)}
                  className="btn btn-danger"
                >
                  DELETE
                </button>
              </>
            )}

            {!role && (
              <button
                onClick={() => {
                  navigate(`/user/login`);
                }}
                className="btn btn-warning  px-4 mx-4"
                disabled={enrolled}
              >
                {enrolled ? "ENROLLED" : "ENROLLING"}
              </button>
            )}
            {role === "USER" && (
              <button
                onClick={() => handleEnroll(course.courseId)} // Pass courseId when calling handleEnroll
                className="btn btn-warning px-4 mx-4"
                disabled={enrolled}
              >
                {enrolled ? "ENROLLED" : "ENROLL NOW"}
              </button>
            )}
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default CourseCard;
