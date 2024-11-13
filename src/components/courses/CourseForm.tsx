import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ICourse } from "../../models/ICourse";

const CourseForm = () => {
  const adminId = 1;
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<ICourse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICourse>();

  useEffect(() => {
    if (id) {
      const fetchCourseDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/instalearn/api/v1/course/${id}`
          );
          setCourse(response.data);
          reset(response.data); // Reset form with fetched data
        } catch (error) {
          alert("Failed to fetch course details. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchCourseDetails();
    } else {
      setIsLoading(false);
    }
  }, [id, reset]);

  const onSubmit = async (data: ICourse) => {
    const url = id
      ? `http://localhost:8080/instalearn/admin/A${adminId}/C${course?.courseId}/update`
      : `http://localhost:8080/instalearn/admin/A${adminId}/addCourse`;

    const method = id ? axios.put : axios.post;

    method(url, data)
      .then(() => {
        alert(`Course ${id ? "updated" : "added"} successfully!`);
        navigate("/courses");
        reset();
      })
      .catch(() => {
        alert(`Failed to ${id ? "update" : "add"} course. Please try again later.`);
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
      <div className="card mb-3">
        <div className="card-body">
          <h1 className="card-title">{id ? "Edit Course" : "Add New Course"}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Course Name</label>
              <input
                className="form-control"
                {...register("courseName", { required: "Course name is required" })}
                placeholder="Enter course name"
              />
              {errors.courseName && (
                <span className="text-danger">{errors.courseName.message}</span>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Instructor</label>
              <input
                className="form-control"
                {...register("instructor", { required: "Instructor name is required" })}
                placeholder="Enter instructor name"
              />
              {errors.instructor && (
                <span className="text-danger">{errors.instructor.message}</span>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Duration (Hrs)</label>
              <input
                className="form-control"
                type="number"
                {...register("duration", {
                  required: "Duration is required",
                  min: { value: 1, message: "Duration must be at least 1 hour" },
                  max: { value: 100, message: "Duration can't exceed 100 hours" },
                })}
                placeholder="Enter course duration"
              />
              {errors.duration && (
                <span className="text-danger">{errors.duration.message}</span>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                })}
                placeholder="Enter course description"
              />
              {errors.description && (
                <span className="text-danger">{errors.description.message}</span>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Course URL</label>
              <input
                className="form-control"
                type="url"
                {...register("courseURL", {
                  pattern: {
                    value: /^(https?:\/\/)?([\w.-]+)+([/?#]\S*)?$/,
                    message: "Enter a valid URL",
                  },
                })}
                placeholder="Enter course URL"
              />
              {errors.courseURL && (
                <span className="text-danger">{errors.courseURL.message}</span>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">GitHub URL</label>
              <input
                className="form-control"
                type="url"
                {...register("githubURL", {
                  pattern: {
                    value: /^(https?:\/\/)?([\w.-]+)+([/?#]\S*)?$/,
                    message: "Enter a valid URL",
                  },
                })}
                placeholder="Enter GitHub URL"
              />
              {errors.githubURL && (
                <span className="text-danger">{errors.githubURL.message}</span>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Drive URL</label>
              <input
                className="form-control"
                type="url"
                {...register("driveURL", {
                  pattern: {
                    value: /^(https?:\/\/)?([\w.-]+)+([/?#]\S*)?$/,
                    message: "Enter a valid URL",
                  },
                })}
                placeholder="Enter Drive URL"
              />
              {errors.driveURL && (
                <span className="text-danger">{errors.driveURL.message}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              {id ? "Save Changes" : "Add Course"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
