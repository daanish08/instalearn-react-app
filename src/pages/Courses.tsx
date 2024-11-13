import axios from "axios";
import { useEffect, useState } from "react";
import { ICourse } from "../models/ICourse";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/courses/CourseCard";


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
      } catch (error) {
        setIsLoading(false);
        setError("Failed to fetch course data. Please try again later.");
      }
    }
    getCourses();
  }, []);

  const navigate = useNavigate();

  const handleView = (id: string) => {
    console.log(id);
    navigate(`/courses/${id}`);
  };
  
  const handleUpdate = (id: number) => {
    // Implement update functionality here
    console.log(`Update course with id: ${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      // Sending DELETE request to the API
      await axios.delete(`http://localhost:8080/instalearn/api/v1/course/delete/${id}`);
      console.log(`Course with id: ${id} deleted successfully`);
  
      // Update the course list to remove the deleted course
      setCourseList(courseList.filter(course => course.courseID !== id));
    } catch (error) {
      alert("Failed to delete the course. Please try again later.");
      // setError("Failed to delete the course. Please try again later.");
    }
  };
  

  return (
    <>
      <div className="container row">
        <h1>
          Your Courses
          <hr />
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
            key={course.id}
            course={course}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
              // <div
              //   className="col-md-4"
              //   key={course.id}
              //   style={{ maxHeight: "600px" }}
              // >
              //   <div className="card" style={cardStyle}>
              //     <img
              //       src={course.imageUrl || "src/assets/image/Course-logo.png"}
              //       className="card-img-top"
              //       alt={course.courseName}
              //       style={{
              //         borderTopLeftRadius: "10px",
              //         borderTopRightRadius: "10px",
              //       }}
              //     />
              //     <div className="card-body">
              //       <h5 className="card-title fw-bold fs-4">
              //         {course.courseName}
              //       </h5>
              //       <p className="card-text">
              //         {course.instructor || "Tharun"} |{" "}
              //         {course.duration || "18 Hrs"} Hrs
              //       </p>
              //       <hr />
              //       <div className="d-flex justify-content-between">
              //         <button className="btn btn-success me-3">
              //           <svg
              //             xmlns="http://www.w3.org/2000/svg"
              //             width="16"
              //             height="16"
              //             fill="currentColor"
              //             className="bi bi-eye"
              //             viewBox="0 0 16 16"
              //           >
              //             <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
              //             <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              //           </svg>
              //         </button>
              //         <button
              //           onClick={() => handleUpdate(course.id)}
              //           className="btn btn-primary me-3"
              //         >
              //           <svg
              //             xmlns="http://www.w3.org/2000/svg"
              //             width="16"
              //             height="16"
              //             fill="currentColor"
              //             className="bi bi-pencil"
              //             viewBox="0 0 16 16"
              //           >
              //             <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
              //           </svg>
              //         </button>
              //         <button
              //           onClick={() => handleDelete(course.id)}
              //           className="btn btn-danger"
              //         >
              //           <svg
              //             xmlns="http://www.w3.org/2000/svg"
              //             width="16"
              //             height="16"
              //             fill="currentColor"
              //             className="bi bi-trash"
              //             viewBox="0 0 16 16"
              //           >
              //             <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              //             <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              //           </svg>
              //         </button>
              //       </div>
              //     </div>
              //   </div>
              // </div>
            );
          })}
      </div>
    </>
  );
};

export default Courses;
