import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router-dom
import axios from "axios";
import { useAuth } from "../../contexts/authContext";

function UserDashboard() {
  const [userName, setUserName] = useState("");

  const { user } = useAuth();
  const userId = user?.id;
  const [userDashBoardData, setUserDashBoardData] = useState([
    {
      id: 1,
      title: "Enrolled Courses",
      count: 0, // Initialize to 0, will be updated
      route: "/user/enroll-courses",
      buttonTitle: "View Enrolled",
    },
    {
      id: 2,
      title: "Available Courses",
      count: 0, // Initialize to 0, will be updated
      route: "/courses",
      buttonTitle: "View Courses",
    },
  ]);
  const [courseManagementCards, setCourseManagementCards] = useState([
    {
      title: "Enroll New Course",
      description:
        "Efficiently design, implement, and oversee your courses with streamlined processes and comprehensive management tools.",
      buttonText: "Enroll Now",
      route: "/courses",
      image: "/assets/EnrollCourse.jpg",
    },
  ]);

  const [featuredCourses, setFeaturedCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    const fetchUserName = async () => {
      if (userId) {
        try {
          const response = await fetch(
            `http://localhost:8080/instalearn/user/userList/${userId}` // Adjust API endpoint if needed.  The original Angular code uses a different endpoint for username.
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data.userName);
          console.log(data.userName);

          setUserName(data.userName);
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      }
    };

    const fetchDashboardData = async () => {
      try {
        const enrolledCoursesResponse = await fetch(
          `http://localhost:8080/instalearn/api/v1/4/enroll/count`
        );
        const availableCoursesResponse = await fetch(
          "http://localhost:8080/instalearn/api/v1/course/count"
        );

        if (!enrolledCoursesResponse.ok || !availableCoursesResponse.ok) {
          throw new Error("HTTP error fetching dashboard data!");
        }

        const enrolledCount = await enrolledCoursesResponse.json();
        const availableCount = await availableCoursesResponse.json();
        console.log(availableCount);

        setUserDashBoardData([
          { ...userDashBoardData[0], count: enrolledCount },
          { ...userDashBoardData[1], count: availableCount },
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
  
    fetchUserName();
    fetchDashboardData();

    const fetchCourses = async () => {
      try {
        const featuredResponse = await axios.get(
          "http://localhost:8080/instalearn/api/v1/course/list" // Replace with your featured courses API endpoint
        );

        const featuredData = await featuredResponse.data;
        setFeaturedCourses(featuredData);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourses();
  }, [userId]);

  return (
    <div className="ps-5 pe-5 py-4 bg-body-tertiary">
      <div className="mt-2">
        <div className="row">
          <div className="col-md-6 d-flex px-2">
            {userDashBoardData.map((data) => (
              <div key={data.id} className="col-md-12 px-1">
                <div
                  className="card border border-2 mb-3"
                  style={{ backgroundColor: "#1e1357" }}
                >
                  <div className="card-header fw-light fs-4 text-center text-white">
                    {data.title}
                  </div>
                  <div className="card-body  bg-light text-center">
                    <h5 className="card-title text-navy fs-3 text-center pb-2">
                      {data.count}
                    </h5>
                    <Link
                      to={data.route}
                      className="btn text-white fw-bold"
                      style={{ backgroundColor: "#1e1357" }}
                    >
                      {data.buttonTitle}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="card ps-3 py-3 "
        style={{ backgroundColor: "#1e1357", borderRadius: "30px" }}
      >
        <div className="card-body fw-bold fs-4 text-white">
          <div className="row">
            <div className="col-md-8 pt-5 ps-3">
              <h3>
                <i>Welcome {userName}</i>
              </h3>
              <p className="fs-5 fw-light">
                <i>
                  Education is the passport to the future. So learn more & more.
                  <br />A cycle of learning, applying, revising, and improving.
                  <br />
                  <br />
                  <button className="btn btn-light fw-semibold">
                    View Courses
                  </button>
                </i>
              </p>
            </div>
            <div className="col-md-4 text-center">
              <img
                src="../src/assets/image/dashboard.jpg"
                width={250}
                height={250}
                style={{ borderRadius: "20px" }}
                alt="Dashboard Image"
              />
            </div>
          </div>
        </div>
      </div>

      <br />

      {/* Featured Courses Section */}
      <div className="mt-4">
        <h2 className="text-center fw-light">
          <span className="text-navy fw-bold">Featured </span>Courses
          <hr className="text-navy" />
        </h2>
        <div className="row">
          {featuredCourses.map((course) => (
            <div className="col-md-4 mb-4" key={course.id}>
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src="../src/assets/image/dashboard.jpg"
                  width={270}
                  height={300}
                  style={{ borderRadius: "20px" }}
                  alt="Dashboard Image"
                />
                <div className="card-body text-center">
                  <p className="fw-bold ">{course.courseName}</p>
                  <p className="card-text btn btn-dark">View More</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Courses Section */}
      <div className="mt-4">
        <h2 className="text-center fw-light">
          <span className="text-navy fw-bold">Latest </span>Courses
          <hr className="text-navy pb-2" />
        </h2>
        <div className="row">
          {featuredCourses.map((course) => (
            <div className="col-md-4 mb-4" key={course.id}>
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src="../src/assets/image/dashboard.jpg"
                  width={270}
                  height={300}
                  style={{ borderRadius: "20px" }}
                  alt="Dashboard Image"
                />
                <div className="card-body text-center">
                  <p className="fw-bold ">{course.courseName}</p>
                  <p className="card-text btn btn-dark">View More</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <br />
    </div>
  );
}

export default UserDashboard;
