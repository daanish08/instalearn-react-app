import React, { useState, useEffect } from 'react';

interface Enrollment {
  id: number;
  username: string;
  courseTitle: string;
  status: string;
}

const mockEnrollments: Enrollment[] = [
  { id: 1, username: 'john_doe', courseTitle: 'React Basics', status: 'Pending' },
  { id: 2, username: 'jane_smith', courseTitle: 'Advanced Angular', status: 'Approved' },
  { id: 3, username: 'alice_jones', courseTitle: 'Vue Mastery', status: 'Rejected' },
  // Add more mock data as needed
];

const ApproveCourses: React.FC = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  useEffect(() => {
    loadEnrollmentList();
  }, []);

  const loadEnrollmentList = () => {
    // Simulate fetching data from a service
    setEnrollments(mockEnrollments);
    console.log('Loaded enrollments:', mockEnrollments);
  };

  const updateStatus = (updatedEnrollment: Enrollment) => {
    // Logic to update enrollment status
    console.log('Update Status:', updatedEnrollment);
    setEnrollments((prevEnrollments) =>
      prevEnrollments.map((enr) =>
        enr.id === updatedEnrollment.id ? { ...enr, status: updatedEnrollment.status } : enr
      )
    );
  };

  return (
    <div className="container-fluid mt-4 px-5">
      <h2 className="text-left fw-light">
        Approve <span className="fw-semibold text-success">Enrollment Status</span>
        <hr />
      </h2>

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
                  className="btn btn-success"
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
