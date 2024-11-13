import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router-dom

function AdminDashboard() {
  const [userName, setUserName] = useState("");

  const [adminDashBoardData, setAdminDashBoardData] = useState([
    {
      title: "Users List",
      count: 0,
      route: "/admin/users",
      buttonTitle: "View Users",
    },
    {
      title: "Feedbacks",
      count: 0,
      route: "/admin/feedback-details",
      buttonTitle: "View Feedbacks",
    },
    {
      title: "Courses",
      count: 0,
      route: "/courses",
      buttonTitle: "View Courses",
    },
    {
      title: "Pending Approvals",
      count: 0,
      route: "/admin/approve-courses",
      buttonTitle: "View Approvals",
    },
  ]);

  // const [courseManagementCards, setCourseManagementCards] = useState([
  //   {
  //     title: "Enroll New Course",
  //     description:
  //       "Efficiently design, implement, and oversee your courses with streamlined processes and comprehensive management tools.",
  //     buttonText: "Enroll Now",
  //     route: "/courses",
  //     image: "/assets/EnrollCourse.jpg",
  //   },
  // ]);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    console.log(userId);

    const intId = userId ? parseInt(userId, 10) : null; // Parse to integer

    const fetchUserName = async () => {
      if (intId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/instalearn/admin/AdminList/${intId}` // Adjust API endpoint if needed.  The original Angular code uses a different endpoint for username.
          );
          const data = response.data;
          console.log(data);
          setUserName(data.userName);
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      }
    };

    const fetchDashboardData = async () => {
      try {
        const userCountResponse = await fetch(
          `http://localhost:8080/instalearn/admin/usersCount`
        );
        const feedbackCountResponse = await fetch(
          "http://localhost:8080/instalearn/admin/feedbacks/count"
        );
        const courseCountResponse = await fetch(
          "http://localhost:8080/instalearn/api/v1/course/count"
        );
        const availableCoursesResponse = await fetch(
          "http://localhost:8080/instalearn/api/v1/course/count"
        );

        if (!userCountResponse.ok || !availableCoursesResponse.ok) {
          throw new Error("HTTP error fetching dashboard data!");
        }

        const usersCount = await userCountResponse.json();
        const feedbackCount = await feedbackCountResponse.json();
        const courseCount = await courseCountResponse.json();
        const pendingApprovalCount = await availableCoursesResponse.json();

        setAdminDashBoardData([
          { ...adminDashBoardData[0], count: usersCount },
          { ...adminDashBoardData[1], count: feedbackCount },
          { ...adminDashBoardData[2], count: courseCount },
          { ...adminDashBoardData[3], count: pendingApprovalCount },
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    // if (intId) {
    fetchUserName();
    fetchDashboardData();
    // }
  }, []);

  return (
    <div className="ps-5 pe-5 py-4 bg-body-tertiary">
      <div className="mt-2">
        <div className="row">
          <div className="col-md-3 d-flex px-1">
            {adminDashBoardData.map((data) => (
              <div key={data.title} className="col-md-12 px-1">
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

      {/* WELCOME */}
      <div
        className="card ps-3 py-3 "
        style={{ backgroundColor: "#1e1357", borderRadius: "50px" }}
      >
        <div className="card-body fw-bold fs-4 text-white">
          <div className="row">
            <div className="col-md-8 pt-5 ps-3">
              <h3>
                <i>Welcome Daanish</i>
              </h3>
              <p className="fs-5 fw-light">
                <i>
                  Education is the passport to the future. So learn more & more.
                  <br />A cycle of learning, applying, revising, and improving.
                  <br />
                  <br />
                </i>
              </p>
            </div>
            <div className="col-md-4 text-center">
              <img
                src="../src/assets/image/dashboard-hero.jpg"
                width={250}
                height={250}
                style={{ borderRadius: "20px" }}
                alt="man smiling"
              />
            </div>
          </div>
        </div>
      </div>

      <br />

      {/* CREATE COURSE */}
      <div
        className="card ps-3 py-3 "
        style={{ backgroundColor: "#1e1357", borderRadius: "50px" }}
      >
        <div className="card-body fw-bold fs-4 text-white">
          <div className="row">
            <div className="col-md-8 pt-5 ps-3">
              <h3>
                <i>Create a Course</i>
              </h3>
              <p className="fs-5 fw-light">
                <i>
                  Share Your{" "}
                  <span className=" fw-bold gradient-">Knowledge</span>, Shape
                  the <span className=" fw-bold gradient-">Future</span>.
                  <br />
                  <br />
                  <Link
                    to={"/admin/create-courses"}
                    className="btn btn-light fw-semibold"
                  >
                    Create Now
                  </Link>
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

      {/* update the course */}
      <div
        className="card ps-3 py-3 "
        style={{ backgroundColor: "#1e1357", borderRadius: "50px" }}
      >
        <div className="card-body fw-bold fs-4 text-white">
          <div className="row">
            <div className="col-md-8 pt-5 ps-3">
              <h3>
                <i>Update the Course</i>
              </h3>
              <p className="fs-5 fw-light">
                <i>
                Quickly refresh your course content
                  <br />
                  <br />
                  <Link
                    to={"/admin/create-courses"}
                    className="btn btn-light fw-semibold"
                  >
                    Update Now
                  </Link>
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
    </div>
  );
}

export default AdminDashboard;
