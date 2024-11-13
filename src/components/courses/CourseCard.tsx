import React from 'react';

interface ICourse {
  id: number;
  courseName: string;
  instructor: string | null;
  duration: number | null;
  imageUrl: string | null;
}

interface CourseCardProps {
  course: ICourse;
  handleUpdate: (courseId: number) => void;
  handleDelete: (courseId: number) => void;
}

const getRandomGradient = () => {
  const gradients = [
    "linear-gradient(135deg, #2C3E50, #4CA1AF)", // Dark blue to teal
    "linear-gradient(135deg, #232526, #414345)", // Dark gray to lighter gray
    "linear-gradient(135deg, #0F2027, #2C5364)", // Black to dark cyan
    "linear-gradient(135deg, #3A1C71, #D76D77)", // Dark purple to dark pink
    "linear-gradient(135deg, #1C1C1C, #383838)", // Dark gray to medium gray
  ];

  return gradients[Math.floor(Math.random() * gradients.length)];
};


const CourseCard: React.FC<CourseCardProps> = ({ course, handleUpdate, handleDelete }) => {
  const cardStyle = {
    background: getRandomGradient(), // Example gradient
    width: "100%",
    borderRadius: "10px",
    color: "white",
  };

  return (
    <div className="col-md-4" style={{ maxHeight: "600px" }}>
      <div className="card" style={cardStyle}>
        <img
          src={course.imageUrl || "src/assets/image/Course-logo.png"}
          className="card-img-top img-fluid"
          alt={course.courseName}
          style={{
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            maxHeight: "200px", // Adjust as needed
            objectFit: "cover",
          }}
        />
        <div className="card-body">
          <h5 className="card-title fw-bold fs-4">{course.courseName}</h5>
          <p className="card-text">
            {course.instructor || "Tharun"} | {course.duration || "18"} Hrs
          </p>
          <hr />
          <div className="d-flex justify-content-between">
            <button className="btn btn-success me-3">View</button> {/*Simplified button*/}
            <button onClick={() => handleUpdate(course.id)} className="btn btn-primary me-3">
              Edit
            </button> {/*Simplified button*/}
            <button onClick={() => handleDelete(course.id)} className="btn btn-danger">
              Delete
            </button> {/*Simplified button*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
