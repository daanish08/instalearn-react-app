import { Link } from "react-router-dom";

const About = () => {
  const MissionVisions = [
    {
      head: "Our Mission",
      description:
        "To inspire and empower learners through innovative and effective educational experiences.",
    },
    {
      head: "Our Vision",
      description:
        "To revolutionize education by creating a world where learning is accessible, engaging, and transformative for everyone.",
    },
  ];
  return (
    <>
      <div style={{ backgroundColor: "#211266" }}>
        <div className="px-4 py-5 my-3 mt-0 text-center text-white  ">
          <h1 className="display-3  pb-5 fw-light">About</h1>
          <h3 className="display-5  pb-5 fw-semibold">
            "We are an online community dedicated to making language learning
            engaging and accessible for everyone."
          </h3>
          <Link to="/about#content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="white"
              className="bi bi-arrow-down-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" />
            </svg>
          </Link>
          <i className="bi bi-arrow-down-circle-fill"></i>
        </div>
      </div>
      <div className="container-fluid">
        <div id="content" className="site-content py-5">
          <div className="container">
            <main id="main" className="site-main p-4">
              <article className="mb-5 pt-3">
                <div className="mb-5">
                  <h6 className="text-danger text-center fw-light pb-2">
                    About us
                  </h6>
                  <h2 className="fw-bold  text-center">
                    We connect students and teachers <br />
                    together to create enriching
                    <br />
                    educational experiences.
                  </h2>

                  <p className="lead">
                    <span className="fs-5 ">W</span>e prioritize quality and
                    commitment, ensuring a supportive and engaging learning
                    environment for all."
                  </p>
                </div>
                <div className="d-flex" id="about-comp">
                  {MissionVisions.map((MissionVision, index) => (
                    <div key={index} className="mb-5">
                      <h6 className="text-danger text-left fw-light pb-2">
                        {MissionVision.head}
                      </h6>
                      <h3>{MissionVision.description}</h3>
                    </div>
                  ))}
                </div>

                <div className="mb-5">
                  <img
                    src="https://websitedemos.net/language-tutors-02/wp-content/uploads/sites/700/2020/09/about-us-01-free-img.jpg"
                    alt="About Image"
                    className="img-fluid rounded"
                  />
                </div>
              </article>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
