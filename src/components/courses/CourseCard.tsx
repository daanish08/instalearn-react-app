import React from "react";
import { ICourse } from "../../models/ICourse";

interface CourseCardProps {
  course: ICourse;
  handleUpdate: (courseId: number) => void;
  handleDelete: (courseId: number) => void;
  handleView: (courseId: number) => void; // Added handleView
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
}) => {
  const cardStyle = {
    background: getRandomGradient(),
    borderRadius: "10px",
    color: "white",
  };

  return (
    <div className="col-md-4 " style={{minHeight: "400px", overflowY: "auto"}}>
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
            <button
              onClick={() => handleView(course.courseId)}
              className="btn btn-primary me-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-binoculars"
                viewBox="0 0 16 16"
              >
                <path d="M3 2.5A1.5 1.5 0 0 1 4.5 1h1A1.5 1.5 0 0 1 7 2.5V5h2V2.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5v2.382a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V14.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 14.5v-3a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5v3A1.5 1.5 0 0 1 5.5 16h-3A1.5 1.5 0 0 1 1 14.5V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882zM4.5 2a.5.5 0 0 0-.5.5V3h2v-.5a.5.5 0 0 0-.5-.5zM6 4H4v.882a1.5 1.5 0 0 1-.83 1.342l-.894.447A.5.5 0 0 0 2 7.118V13h4v-1.293l-.854-.853A.5.5 0 0 1 5 10.5v-1A1.5 1.5 0 0 1 6.5 8h3A1.5 1.5 0 0 1 11 9.5v1a.5.5 0 0 1-.146.354l-.854.853V13h4V7.118a.5.5 0 0 0-.276-.447l-.895-.447A1.5 1.5 0 0 1 12 4.882V4h-2v1.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm4-1h2v-.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm4 11h-4v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zm-8 0H2v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5z" />
              </svg>
            </button>
            <button
              onClick={() => handleUpdate(course.courseId)}
              className="btn btn-success me-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="white"
                className="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
              </svg>
            </button>
            <button
              onClick={() => handleDelete(course.courseId)}
              className="btn btn-danger"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="white"
                className="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
