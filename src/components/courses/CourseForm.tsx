import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ICourse } from "../../models/ICourse";
import { FaBook, FaClock, FaGithub, FaGoogleDrive, FaLink, FaUser } from "react-icons/fa";


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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        alert(
          `Failed to ${id ? "update" : "add"} course. Please try again later.`
        );
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
    <div className="pt-5 px-5 gradient-background">
      <div className="card mb-3 px-2">
        <div className="card-body">
          <h1 className="card-title gradient-text">
            {id ? "Edit Course" : "Add New Course"} <hr className="text-navy w-25" />
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label className="form-label fw-bold gradient-text">Course Name</label>
                <div className="input-group"> {/* Use input-group for better icon placement */}
                    <span className="input-group-text"> <FaBook /> </span> {/* Icon */}
                    <input
                        className="form-control"
                        {...register("courseName", { required: "Course name is required" })}
                        placeholder="Enter course name"
                    />
                </div>
                {errors.courseName && <span className="text-danger">{errors.courseName.message}</span>}
            </div>
            {/* ... other input fields ... */}
            <div className="mb-3">
                <label className="form-label fw-bold gradient-text">Instructor</label>
                <div className="input-group">
                    <span className="input-group-text"> <FaUser /> </span>
                    <input
                        className="form-control"
                        {...register("instructor", { required: "Instructor name is required" })}
                        placeholder="Enter instructor name"
                    />
                </div>
                {errors.instructor && <span className="text-danger">{errors.instructor.message}</span>}
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold gradient-text">Duration (Hrs)</label>
                <div className="input-group">
                    <span className="input-group-text"> <FaClock /> </span>
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
                </div>
                {errors.duration && <span className="text-danger">{errors.duration.message}</span>}
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold gradient-text">Course URL</label>
                <div className="input-group">
                    <span className="input-group-text"> <FaLink /> </span>
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
                </div>
                {errors.courseURL && <span className="text-danger">{errors.courseURL.message}</span>}
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold gradient-text">GitHub URL</label>
                <div className="input-group">
                    <span className="input-group-text"> <FaGithub /> </span>
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
                </div>
                {errors.githubURL && <span className="text-danger">{errors.githubURL.message}</span>}
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold gradient-text">Drive URL</label>
                <div className="input-group">
                    <span className="input-group-text"> <FaGoogleDrive /> </span>
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
                </div>
                {errors.driveURL && <span className="text-danger">{errors.driveURL.message}</span>}
            </div>
            <button type="submit" className="btn text-white fw-bold" style={{ backgroundColor: '#1e1357' }}>
                {id ? "Update" : "Add Course"}
            </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
