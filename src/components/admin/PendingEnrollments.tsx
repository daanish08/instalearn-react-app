import React, { useState, useEffect } from "react";
import { IEnrollment } from "../../models/IEnrollment";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../contexts/authContext";

const ApproveCourses: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const [enrollments, setEnrollments] = useState<IEnrollment[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    console.log(user);
    
    if (userId) {
      loadEnrollmentList();
    }
  }, [userId]);

  const loadEnrollmentList = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/instalearn/admin/A${userId}/approvals`
      );
      if (!response.ok) {
        throw new Error(`Error fetching enrollments: ${response.statusText}`);
      }
      const data: IEnrollment[] = await response.json();
      setEnrollments(data);
    } catch (error) {
      console.error("Error loading enrollments:", error);
    }
  };

  const onEnrollmentStatusChange = (
    enrollmentId: number,
    newStatus: string
  ) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [enrollmentId]: newStatus,
    }));
  };

  const updateStatus = async (enrollment: IEnrollment) => {
    const updatedStatus =
      selectedStatus[enrollment.enrollmentId] || enrollment.status;

    if (!user || updatedStatus === "Pending") return;

    const updateUrl =
      updatedStatus === "Approved"
        ? `http://localhost:8080/instalearn/admin/A${user.id}/approvals/E${enrollment.enrollmentId}/approve`
        : `http://localhost:8080/instalearn/admin/A${user.id}/approvals/E${enrollment.enrollmentId}/reject`;

    await axios
      .put(updateUrl)
      .then(() => {
        toast.success("Enrollment updated successfully");
        loadEnrollmentList();
      })
      .catch(() => {
        toast.error(
          `Failed to update status for enrollment ID ${enrollment.enrollmentId}`
        );
        loadEnrollmentList();
      });
  };

  return (
    <div className="container py-3">
      <h1 className="pt-3 pb-2 gradient-text">
        <span className="fw-light">Approve</span> Enrollment Status
        <hr className="text-navy" />
      </h1>

      <table className="table table-bordered mt-4 table-hover">
        <thead className="table" style={{ color: "blue" }}>
          <tr>
            <th>Enrollment ID</th>
            <th>Username</th>
            <th>Course Title</th>
            <th>Current Status</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.length> 0 ? enrollments.map((enrollment) => (
            <tr key={enrollment.enrollmentId}>
              <td>{enrollment.enrollmentId}</td>
              <td>{enrollment.user.userName}</td>
              <td>{enrollment.course.courseName}</td>
              <td>{enrollment.status}</td>
              <td>
                <select
                  className="form-select"
                  value={
                    selectedStatus[enrollment.enrollmentId] || enrollment.status
                  }
                  onChange={(e) =>
                    onEnrollmentStatusChange(
                      enrollment.enrollmentId,
                      e.target.value
                    )
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
              <td>
                <button
                  className="bg-navy border-0 py-1 mb-3 rounded-pill text-white px-3"
                  style={{ backgroundColor: "#000B58" }}
                  onClick={() => updateStatus(enrollment)}
                >
                  Update
                </button>
              </td>
            </tr>
          )): 
          <p className="alert alert-danger text-center text-muted mt-3 fw-bold">No enrollments found.</p>}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveCourses;
