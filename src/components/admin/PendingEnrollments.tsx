import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PendingEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/instalearn/api/v1/enrollments'); // Replace with your API endpoint
        setEnrollments(response.data);
        console.log(response.data)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  if (loading) {
    return <div>Loading pending enrollments...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (enrollments.length === 0) {
    return <div>No pending enrollments found.</div>;
  }

  return (
    <div className="container">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Enrollment ID</th>
            <th>User</th>
            <th>Course</th>
            <th>Status</th>
            {/* Add other columns as needed */}
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment) => (
            <tr key={enrollment.id}>
              <td>{enrollment.id}</td>
              <td>{enrollment.user.name || 'N/A'}</td> {/*  Handle potential missing user data */}
              <td>{enrollment.course.name || 'N/A'}</td> {/* Handle potential missing course data */}
              <td>{enrollment.status}</td>
              {/* Add other data cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingEnrollments;
