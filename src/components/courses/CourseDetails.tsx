import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ICourse } from "../models/ICourse.ts";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
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
        <>
          <div className="card mb-3">
            <img
              src={course.imageUrl || "src/assets/image/Course-logo.png"}
              className="card-img-top"
              alt={course.courseName}
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h1 className="card-title">{course.courseName}</h1>
              <p className="card-text">
                <strong>Instructor:</strong> {course.instructor || "Tharun"}
              </p>
              <p className="card-text">
                <strong>Duration:</strong> {course.duration || "18"} Hrs
              </p>
              <p className="card-text">
                <strong>Description:</strong> {course.description || "No description available."}
              </p>
              {/* Add more course details as needed */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseDetails;
