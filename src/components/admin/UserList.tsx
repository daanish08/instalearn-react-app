import { useState, useEffect } from "react";
import { IEnrollment } from "../../models/IEnrollment";

function UserEnrolledStatus() {
  const [enrollments, setEnrollments] = useState([]);
  const [userId, setUserId] = useState(0); // Initialize userId

  useEffect(() => {
    // Simulate getting user ID (replace with actual authentication mechanism)
    const storedUserId = localStorage.getItem("userId"); // Or from context, etc.
    const parsedUserId = parseInt(storedUserId || "0", 10); // Handle null or non-numeric strings
    setUserId(parsedUserId);

    // Fetch enrollments only if userId is available
    if (userId) {
      fetchEnrollments(userId);
    }
  }, []);

  const fetchEnrollments = async (userId: number) => {
    try {
      const response = await fetch(`/api/enrollments/${userId}`); // Replace with your API endpoint
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
      // Handle error appropriately (e.g., display error message)
    }
  };

  return (
    <div className="container-fluid mt-4 px-5">
      <h2>
        Enrolled <span className="fw-semibold text-success">Courses</span>
        <hr />
      </h2>

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
                  className={`btn fw-bold btn-${enrollment.status.toLowerCase()}`}
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
                  className={`btn fw-semibold text-white bg-${enrollment.status.toLowerCase()}`}
                  style={{ width: "100px" }}
                  onClick={() => {
                    // Handle certificate download or action
                    if (enrollment.status === "APPROVED") {
                      // Navigate to certificate download or display
                      window.location.href = `/courses/${enrollment.course.courseId}/completed`; // Or use React Router
                    }
                  }}
                  disabled={enrollment.status !== "APPROVED"}
                >
                  {enrollment.status === "APPROVED" ? "Download" : "Complete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserEnrolledStatus;
