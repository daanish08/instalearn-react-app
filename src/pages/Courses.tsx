import axios from "axios";
import { useEffect, useState } from "react";
import { ICourse } from "../models/ICourse";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/courses/CourseCard";
import { Helmet } from "react-helmet-async";

const Courses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courseList, setCourseList] = useState<ICourse[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getCourses() {
      try {
        const response = await axios.get(
          "http://localhost:8080/instalearn/api/v1/course/list"
        );
        console.log(response.data);
        setIsLoading(false);
        setCourseList(response.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setIsLoading(false);
        setError("Failed to fetch course data. Please try again later.");
      }
    }
    getCourses();
  }, []);

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
      await axios.delete(`http://localhost:8080/instalearn/admin/A1/C2/delete`);
      console.log(`Course with id: ${id} deleted successfully`);

      // Update the course list to remove the deleted course
      setCourseList(courseList.filter((course) => course.courseId !== id));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Failed to delete the course. Please try again later.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Courses</title>
      </Helmet>
      <div className="container py-3 bg-body-tertiary">
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
                  key={course.courseId} // Use course.id as the key
                  course={course}
                  handleView={handleView} // Pass the function, not the result
                  handleUpdate={handleUpdate} // Pass the function
                  handleDelete={handleDelete} // Pass the function
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Courses;
