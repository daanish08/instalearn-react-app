import axios from "axios";
import { useEffect, useState } from "react";
import { ICourse } from "../models/ICourse";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/courses/CourseCard";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../contexts/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Courses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courseList, setCourseList] = useState<ICourse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const role = user?.role;
  const userId = user?.id;
  console.log(role);

  useEffect(() => {
    async function getCourses() {
      const apiUrl = `http://localhost:8080/instalearn/api/v1/course/user/${userId}/list`;
      try {
        const response = await axios.get(apiUrl);
        setIsLoading(false);
        setCourseList(response.data);
      } catch (error) {
        setIsLoading(false);
        setError("Failed to fetch course data. Please try again later.");
      }
    }
    if (userId) getCourses();
  }, [user]);

  const navigate = useNavigate();

  const handleView = (id: number) => {
    console.log(id);
    navigate(`/courses/${id}`);
  };

  const handleUpdate = (id: number) => {
    console.log(`Update course with id: ${id}`);
    navigate(`/courses/update/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      // Sending DELETE request to the API
      await axios.delete(
        `http://localhost:8080/instalearn/admin/A${userId}/C${id}/delete`
      );
      console.log(`Course with id: ${id} deleted successfully`);

      // Update the course list to remove the deleted course
      setCourseList(courseList.filter((course) => course.courseId !== id));

      // Show success toast
      toast.success("Course deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete the course. Please try again later.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Courses</title>
      </Helmet>
      <div className="container py-4 bg-body-tertiary">
        <div className="row ">
          <h1 className="pt-3 pb-2 gradient-text">
            <span className="fw-light">Available </span>Courses{" "}
            <hr className="text-navy" />
          </h1>

          {isLoading && (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}

          {!isLoading &&
            !error &&
            courseList.map((course: ICourse) => {
              return (
                <CourseCard
                  key={course.courseId}
                  course={course}
                  handleView={handleView}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                  role={role}
                />
              );
            })}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Courses;
