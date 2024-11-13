import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const getRandomGradient = () => {
  const gradients = [
    "linear-gradient(135deg, #2C3E50, #4CA1AF)", // Dark blue to teal
    "linear-gradient(135deg, #232526, #414345)", // Dark gray to lighter gray
    "linear-gradient(135deg, #0F2027, #2C5364)", // Black to dark cyan
    "linear-gradient(135deg, #3A1C71, #D76D77)", // Dark purple to dark pink
    "linear-gradient(135deg, #1C1C1C, #383838)", // Dark gray to medium gray
  ];

  return gradients[Math.floor(Math.random() * gradients.length)];
};

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

  const developerData = [
    {
      profile: "src/assets/image/hero.jpg",
      name: "Mohammed Daanish M",
      title: "Software Engineer",
      company: "Ford Motors Company",
    },
    {
      profile: "src/assets/image/hero.jpg",
      name: "Vignesh U",
      title: "Software Engineer",
      company: "Ford Motors Company",
    },
    {
      profile: "src/assets/image/hero.jpg",
      name: "Tharun D",
      title: "Software Engineer",
      company: "Ford Motors Company",
    },
    {
      profile: "src/assets/image/hero.jpg",
      name: "Suriya T",
      title: "Software Engineer",
      company: "Ford Motors Company",
    },
  ];

  const scrollToContent = () => {
    const contentElement = document.getElementById("content");
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("Element with id 'content' not found");
    }
  };
  return (
    <>
      <Helmet>
        <title>About</title>
      </Helmet>
      <div className="gradient-background text-navy">
        <div
          className="px-4   mt-0 text-center"
          style={{ paddingTop: "100px" }}
        >
          <h1 className="display-2  pb-5  fw-semibold  ">ABOUT</h1>
          <h3 className="display-5  pb-5  fw-semibold gradient-text">
            "We are an online community dedicated to making language learning
            engaging and accessible for everyone."
          </h3>
          <button onClick={scrollToContent} className="btn btn-link p-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="navy"
              className="bi bi-arrow-down-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" />
            </svg>
          </button>
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

                <div className="row">
                  {developerData.map((developer) => {
                    const cardStyle = {
                      background: getRandomGradient(),
                      width: "100%",
                      height: "205px",
                      borderRadius: "10px",
                      color: "white",
                    };

                    return (
                      <div className="col-md-12 px-5 py-3">
                        <div className="card border-0" style={cardStyle}>
                          <div className="d-flex flex-row justify-content-between">
                            {" "}
                            {/* Added classes */}
                            <img
                              src={developer.profile}
                              className="card-img-top img-fluid px-2 py-2"
                              alt={developer.name}
                              style={{
                                borderRadius: "10px",
                                maxHeight: "200px", // Adjust as needed
                                width: "200px",
                                objectFit: "cover", // Prevents distortion
                              }}
                            />
                            <div className="card-body pt-5">
                              <h5 className="card-title fw-bold fs-3">
                                {developer.name}
                              </h5>
                              <p className="card-text ">
                                {developer.title} | {developer.company}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
