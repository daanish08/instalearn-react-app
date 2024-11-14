import logo from "../../assets/image/graduate.png";
import verified from "../../assets/image/verified.png";
import payPerPerson from "../../assets/image/payPerPerson.png";
import price from "../../assets/image/price.png";
import tutorial from "../../assets/image/tt1.png";
import certificate from "../../assets/image/certify.png";
import { useNavigate } from "react-router-dom";

const features = [
  {
    imgTag: logo,
    title: "Expert Tutors",
    description:
      "Connect with knowledgeable tutors who illuminate the path to understanding.",
  },
  {
    imgTag: verified,
    title: "Verified Profiles",
    description:
      "Access trustworthy profiles, ensuring quality and authenticity.",
  },
  {
    imgTag: payPerPerson,
    title: "Pay Per Lesson",
    description:
      "Enjoy flexibility with a pay-per-lesson model tailored to your needs.",
  },
  {
    imgTag: price,
    title: "Affordable Prices",
    description:
      "Experience quality education at prices that won't break the bank.",
  },
];

const Subsection = () => {
  const navigate = useNavigate();
  const scrollToList = () => {
    document.getElementById("list")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="">
      <div className="px-3 mt-4 bg-light-blue">
        <div
          className="px-4 py-5 my-3 mt-0 text-center text-white fw-semibold"
          id="home"
        >
          <p className="lead mb-4 text-white">
            In look for a technical Course?
          </p>
          <h1 className="display-4 text-white">
            Start{" "}
            <u>
              <span className="fw-bold">learning</span>
            </u>{" "}
            a new language
            <br />
            today{" "}
            <u>
              <span className="fw-bold">with the </span>
            </u>
            <br /> best online courses!
          </h1>
          <br />
          <a href="#list" className="text-center" onClick={scrollToList}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              fill="white"
              className="bi bi-arrow-down-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="px-4" id="list">
        <div className="px-4 pt-5  pb-4 mt-0 text-left fw-bold" id="home">
          <p className=" lead mb-1 text-white">Many Hours of Courses</p>
          <h2 className="display-4 text-white fw-semibold">
            Learn the best tools and platforms
          </h2>
          <p className="lead text-white">
            We focus on industry leading platforms so that you can be
            <br /> prepared for your next job. Then we teach all <br />
            we can do about them.
          </p>
          <button
            className="bg-navy border-0 py-1 mb-3  rounded-pill text-white px-3"
            style={{ backgroundColor: "#000B58" }}
            onClick={() => navigate("/courses")}
          >
            View All Courses
          </button>
          {/* <hr /> */}
        </div>

        <div className=" px-2 ">
          <div className="container-fluid  ">
            <div className="row">
              {/* Features */}

              {features.map((feature) => {
                // CORRECTED: Removed type annotation and extra {}
                return (
                  <div className="col-md-3 text-center mb-4">
                    <div className="card h-100 border-0 ">
                      <div className="card-body bg-tertiary rounded">
                        <img
                          src={feature.imgTag}
                          alt={feature.title}
                          className="img-fluid mb-4"
                        />{" "}
                        <h4 className="card-subtitle mb-1 text-center">
                          {feature.title}
                        </h4>
                        <p
                          className="card-text text-center text-muted"
                          style={{ fontSize: 15 }}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <hr className=" text-navy my-3" />
          </div>
        </div>

        <div className="row px-4 ">
          <div className="col-md-8 pb-3">
            <p className="lead mb-2 text-navy">INTERACTIVE LEARNING</p>
            <h1 className="text-navy fw-semibold">Collaborate with Peers</h1>
            <p className="lead text-navy">
              Join study groups, participate in forums, and collaborate on
              projects
              <br /> with fellow learners from around the globe.
            </p>
          </div>
          <div className="col-md-4">
            <img src={tutorial} alt="img" width={200} height={202} />
          </div>{" "}
          <hr className="text-navy" />
        </div>

        <div className="row px-4 ">
          <div className="col-md-4">
            <img src={certificate} alt="img" width={200} height={202} />
          </div>
          <div className="col-md-8 pb-3">
            <p className="lead mb-2 text-navy"> EXPERT MENTORSHIP</p>
            <h1 className="text-navy fw-semibold">
              Learn from Industry Leaders
            </h1>
            <p className="lead text-navy">
              Gain insights from top industry experts through <br />
              video lectures, webinars, and Q&A sessions.
              <br /> Stay updated with the latest <br />
              trends and best practices.
            </p>
          </div>
          <hr className="text-navy" />
        </div>

        <div className="row px-4 ">
          <div className="col-md-8 pb-3">
            <p className="lead mb-2 text-navy">Premium tutorials</p>
            <h1 className="text-navy fw-semibold">
              Tutorials to guide you beyond
            </h1>
            <p className="lead text-navy">
              Once you’ve completed the courses, learn from our quick <br />{" "}
              design and code tutorials to strengthen <br /> your knowledge.
            </p>
          </div>
          <div className="col-md-4">
            <img src={tutorial} alt="img" width={200} height={202} />
          </div>
          <hr className="text-navy" />
        </div>

        <div className="row px-4 ">
          <div className="col-md-4">
            <img src={certificate} alt="img" width={200} height={202} />
          </div>
          <div className="col-md-8 pb-3">
            <p className="lead mb-2 text-navy"> CREATE A PROFILE</p>
            <h1 className="text-navy fw-semibold">Get certificates</h1>
            <p className="lead text-navy">
              After passing a test, we’ll award you with an online certificate.
              <br /> You can add them to your profile <br />
              after completing the courses.
            </p>
            <button
              className="bg-navy border-0 py-1 mb-3  rounded-pill text-white px-3"
              style={{ backgroundColor: "#000B58" }}
              onClick={() => navigate("/user/signup")}
            >
              CREATE ACCOUNT
            </button>
          </div>
        </div>
        {/* <div className="row px-4 ">
          <div className="col-md-12">
            <img src={footer} alt="img" />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Subsection;
