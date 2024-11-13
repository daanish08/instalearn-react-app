import { useState, useEffect } from "react";
import axios from "axios";
import { IFeedback } from "../models/IFeedback";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/instalearn/admin/feedbacks/list"
        ); // Replace '/api/users' with your API endpoint
        console.log(response);
        setFeedbacks(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unexpected error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container py-3">
      <h1 className="pt-3 pb-2 gradient-text">
        <span className="fw-light">Feedback</span> Details{" "}
        <hr className="text-navy" />
      </h1>
      <table className="table table-hover text-center">
        <thead>
          <tr>
            <th>FeedbackID</th>
            <th>Name</th>
            <th>Comment</th>
            <th>Contact</th>
            <th>Enquiry Type</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.contactId}>
              <td>{feedback.contactId}</td>
              <td>{feedback.name}</td>
              <td>{feedback.comment}</td>
              <td>{feedback.contact}</td>
              <td>{feedback.enquiryType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Feedback;
