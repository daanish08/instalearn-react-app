import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ICourse } from "../../models/ICourse";

const CourseDetails = () => {
  const adminId = 1;
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<ICourse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm<ICourse>();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/instalearn/api/v1/course/${id}`
        );
        setCourse(response.data);
        reset(response.data); // Reset form with fetched data
        setIsLoading(false);
      } catch (error) {
        alert("Failed to fetch course details. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id, reset]);

  const onSubmit = async (data: ICourse) => {
    await axios
      .put(
        `http://localhost:8080/instalearn/admin/A${adminId}/C${course?.courseId}/update`,
        data
      )
      .then(() => {
        alert("Course updated successfully!");
        navigate("/courses");
      })
      .catch(() => {
        alert("Failed to update course. Please try again later.");
      });
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {course && (
        <>
          <div className="card mb-3">
            <img
              src={course.courseURL || "src/assets/image/Course-logo.png"}
              className="card-img-top"
              alt={course.courseName}
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h1 className="card-title">{course.courseName}</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">Course Name</label>
                  <input
                    className="form-control"
                    {...register("courseName")}
                    defaultValue={course.courseName}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Instructor</label>
                  <input
                    className="form-control"
                    {...register("instructor")}
                    defaultValue={course.instructor}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Duration (Hrs)</label>
                  <input
                    className="form-control"
                    type="number"
                    {...register("duration")}
                    defaultValue={course.duration}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    {...register("description")}
                    defaultValue={course.description}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Course URL</label>
                  <input
                    className="form-control"
                    type="url"
                    {...register("courseURL")}
                    defaultValue={course.courseURL}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">GitHub URL</label>
                  <input
                    className="form-control"
                    type="url"
                    {...register("githubURL")}
                    defaultValue={course.githubURL}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Drive URL</label>
                  <input
                    className="form-control"
                    type="url"
                    {...register("driveURL")}
                    defaultValue={course.driveURL}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseDetails;
