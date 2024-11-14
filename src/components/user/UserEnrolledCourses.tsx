import { useState, useEffect } from "react";
import { IEnrollment } from "../../models/IEnrollment";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

function UserEnrolledCourses() {

  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    console.log(userId);
    if (userId) {
      fetchEnrollments(userId);
    }
  }, [user]);

  const fetchEnrollments = async (userId: number) => {
    try {
      const response = await fetch(
        `http://localhost:8080/instalearn/api/v1/${userId}/enroll/courses`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Set default status to APPROVED if not provided by the API
      const updatedEnrollments = data.map((enrollment: IEnrollment) => ({
        ...enrollment,
        status: enrollment.status || "APPROVED", // Default to APPROVED
      }));
      setEnrollments(updatedEnrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  return (
    <div className="container py-3">
      <h1 className="pt-3 pb-2 gradient-text">
        <span className="fw-light">Enrolled</span> Courses
        <hr className="text-navy" />
      </h1>

      <table className="table table-bordered mt-3 table-hover">
        <thead>
          <tr style={{ color: "blue" }}>
            <th>Enrollment ID</th>
            <th>Course Title</th>
            <th>Current Status</th>
            <th>Action</th>
            <th>Certificate</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment: IEnrollment) => (
            <tr key={enrollment.enrollmentId}>
              <td>{enrollment.enrollmentId}</td>
              <td>{enrollment.course.courseName}</td>
              <td>{enrollment.status}</td>
              <td>
                <button
                  className={`btn fw-bold btn-success`}
                  style={{ width: "100px" }}
                  onClick={() => {
                    // Handle navigation or action based on status
                    if (enrollment.status === "APPROVED") {
                      // Navigate to course details
                      window.location.href = `/courses/${enrollment.course.courseId}`; // Or use React Router
                    }
                  }}
                  disabled={enrollment.status !== "APPROVED"}
                >
                  {enrollment.status === "APPROVED"
                    ? "View"
                    : enrollment.status}
                </button>
              </td>
              <td>
                <button
                  className={`btn fw-semibold btn-dark bg-${enrollment.status.toLowerCase()}`}
                  style={{ width: "100px" }}
                  onClick={() => {
                    if (enrollment.status === "APPROVED") {
                      navigate(`/course/${enrollment.course.courseId}/success`); // Or use React Router
                    }
                  }}
                  disabled={enrollment.status !== "APPROVED"}
                >
                  {enrollment.status === "APPROVED" ? "Download" : "Waiting"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserEnrolledCourses;
