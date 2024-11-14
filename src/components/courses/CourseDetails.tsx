import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ICourse } from "../../models/ICourse";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<ICourse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/instalearn/api/v1/course/${id}`
        );
        setCourse(response.data);
        console.log(response);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch course details. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handleNavigate = (url: string) => {
    window.open(url, "_blank");
  };

  const handleFinish = () => {
    // Navigate to the generatecertificate component
    navigate(`/course/${id}/success`);
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {course && (
        <div className="card mb-3">
          {/* <img
            src={course.courseURL || "src/assets/image/Course-logo.png"}
            className="card-img-top"
            alt={course.courseName}
            style={{ maxHeight: "400px", objectFit: "cover" }}
          /> */}
          <div className="card-body">
            <h1 className="card-title">{course.courseName}</h1>
            <p className="card-text">
              <strong>Instructor:</strong> {course.instructor || "Tharun"}
            </p>
            <p className="card-text">
              <strong>Duration:</strong> {course.duration || "18"} Hrs
            </p>
            <p className="card-text">
              <strong>Description:</strong>{" "}
              {course.description || "No description available."}
            </p>
            <div className="d-flex justify-content-start">
              {course.githubURL && (
                <button
                  onClick={() => handleNavigate(course.githubURL)}
                  className="btn btn-primary me-2"
                >
                  GitHub
                </button>
              )}
              {course.driveURL && (
                <button
                  onClick={() => handleNavigate(course.driveURL)}
                  className="btn btn-warning me-2"
                >
                  Drive
                </button>
              )}

              {course.courseURL && (
                <button
                  onClick={() => handleNavigate(course.courseURL)}
                  className="btn btn-success me-2"
                >
                  Video
                </button>
              )}

              <div className="ms-auto">
                <button onClick={handleFinish} className="btn btn-success">
                  Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
