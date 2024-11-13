import React, { useState, useEffect } from 'react';

interface Enrollment {
  id: number;
  username: string;
  courseTitle: string;
  status: string;
}

const ApproveCourses: React.FC = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEnrollmentList();
  }, []);

  const loadEnrollmentList = async () => {
    try {
      const response = await fetch('http://localhost:8080/instalearn/admin/A1/approvals');
      if (!response.ok) {
        throw new Error(`Error fetching enrollments: ${response.statusText}`);
      }
      const data: Enrollment[] = await response.json();
      setEnrollments(data);
    } catch (error) {
      setError(error.message);
      console.error('Error loading enrollments:', error);
    }
  };

  const updateStatus = (updatedEnrollment: Enrollment) => {
    // Implement logic to update the enrollment status, possibly involving another API call
    console.log('Update Status:', updatedEnrollment);
    setEnrollments((prevEnrollments) =>
      prevEnrollments.map((enr) =>
        enr.id === updatedEnrollment.id ? { ...enr, status: updatedEnrollment.status } : enr
      )
    );
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container py-3">
    <h1 className="pt-3 pb-2 gradient-text">
      <span className="fw-light">Approve</span> Enrollment Status
      <hr className="text-navy" />
    </h1>

      <table className="table table-bordered mt-4 table-hover">
        <thead className="table-success" style={{ color: 'blue' }}>
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
          {enrollments.map((enrollment) => (
            <tr key={enrollment.id}>
              <td>{enrollment.id}</td>
              <td>{enrollment.username}</td>
              <td>{enrollment.courseTitle}</td>
              <td>{enrollment.status}</td>
              <td>
                <select
                  className="form-select"
                  value={enrollment.status}
                  onChange={(e) =>
                    setEnrollments((prevEnrollments) =>
                      prevEnrollments.map((enr) =>
                        enr.id === enrollment.id
                          ? { ...enr, status: e.target.value }
                          : enr
                      )
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
                  className="bg-navy border-0 py-1 mb-3  rounded-pill text-white px-3"
                  style={{ backgroundColor: "#000B58" }}
                  onClick={() => updateStatus(enrollment)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveCourses;
