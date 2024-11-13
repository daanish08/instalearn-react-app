import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router-dom

function UserDashboard() {
  const [userName, setUserName] = useState("");
  const [userDashBoardData, setUserDashBoardData] = useState([
    {
      title: "Enrolled Courses",
      count: 0, // Initialize to 0, will be updated
      route: "/user/enroll-courses",
      buttonTitle: "View Enrolled",
    },
    {
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

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage. Adjust as needed.
    const intId = userId ? parseInt(userId, 10) : null; // Parse to integer

    const fetchUserName = async () => {
      if (intId) {
        try {
          const response = await fetch(
            `http://localhost:8080/instalearn/user/userList/${intId}` // Adjust API endpoint if needed.  The original Angular code uses a different endpoint for username.
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setUserName(data.userName);
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      }
    };

    const fetchDashboardData = async () => {
      try {
        const enrolledCoursesResponse = await fetch(
          `http://localhost:8080/instalearn/api/v1/${intId}/enroll/count`
        );
        const availableCoursesResponse = await fetch(
          "http://localhost:8080/instalearn/api/v1/course/count"
        );

        if (!enrolledCoursesResponse.ok || !availableCoursesResponse.ok) {
          throw new Error("HTTP error fetching dashboard data!");
        }

        const enrolledCount = await enrolledCoursesResponse.json();
        const availableCount = await availableCoursesResponse.json();

        setUserDashBoardData([
          { ...userDashBoardData[0], count: enrolledCount },
          { ...userDashBoardData[1], count: availableCount },
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    if (intId) {
      fetchUserName();
      fetchDashboardData();
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="container-fluid px-5 bg-body-tertiary">
      <h1>
        Welcome, <span className="fw-bold text-success">{userName}</span>
      </h1>
      <div className="row text-center mb-4">
        {userDashBoardData.map((data) => (
          <div key={data.title} className="col-md-6">
            <div className="card border mb-3">
              <div className="card-header fw-light bg-success text-white">
                {data.title}
              </div>
              <div className="card-body bg-body-tertiary">
                <h5 className="card-title fs-3 text-muted pb-2">
                  {data.count}
                </h5>
                <Link to={data.route} className="btn btn-success fw-bold">
                  {data.buttonTitle}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* ...rest of the JSX (courseManagementCards) remains largely the same, adapting className instead of style attributes */}
      <div
        className="row mb-2 bg-body-tertiary"
        style={{ paddingLeft: "80px", paddingRight: "80px" }}
      >
        <div className="col-md-12 px-1">
          {courseManagementCards.map((card) => (
            <div
              key={card.title}
              className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
            >
              <div className="col-auto d-none d-lg-block">
                <img
                  src={card.image}
                  alt="Thumbnail"
                  width="300"
                  height="280"
                />
              </div>
              <div className="col p-5 d-flex flex-column position-static">
                <h3 className="mb-1 fw-semibold pt-3">{card.title}</h3>
                <div className="mb-1 text-muted fs-6 pb-3">
                  {card.description}
                </div>
                <Link
                  to={card.route}
                  className="btn btn-success fw-light"
                  style={{ width: "35%" }}
                >
                  {card.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
