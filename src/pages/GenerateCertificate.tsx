import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useAuth } from "../contexts/authContext";
import axios from "axios";
import { useParams } from "react-router-dom";

// Placeholder for your services – replace with your actual API calls

const userService = {
  getUserName: async (userId: any) => {
    const response = await fetch(
      `http://localhost:8080/instalearn/user/userList/${userId}`
    );
    const data = await response.json();
    return data.userName;
  },
};

const courseService = {
  getcourseDetailsById: async (courseId: any) => {
    const response = await axios.get(
      `http://localhost:8080/instalearn/api/v1/course/${courseId}`
    );
    const data = response.data;
    console.log(data + "   course");

    return data.courseName;
  },
};

const GenerateCertificate = () => {
  const { id } = useParams();
  const courseId = id;

  const { user } = useAuth();
  const userId = user?.id;
  const [userName, setUserName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [loading, setLoading] = useState(true);
  const completionDate = new Date();
  const signature = "FORD";

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        const name = await userService.getUserName(userId);
        setUserName(name);
      }
    };

    const fetchCourseDetails = async () => {
      if (courseId) {
        const name = await courseService.getcourseDetailsById(courseId);
        console.log(name);
        setCourseName(name);
      }
    };

    Promise.all([fetchUserDetails(), fetchCourseDetails()]).then(() => {
      setLoading(false);
    });
  }, [userId, courseId]);

  const generateCertificate = async () => {
    const certificateElement = document.getElementById("certificate");
    if (certificateElement) {
      try {
        const canvas = await html2canvas(certificateElement);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "px", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${userName}_Certificate.pdf`);
      } catch (error) {
        console.error("Error generating certificate:", error);
        // Handle the error appropriately, e.g., display an alert to the user
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-2 ">
      <div id="certificate" className="certificate bg-tertiary py-4">
        <div className="certificate-border p-5 text-center">
          <div className="p-4 border border-black">
            <img
              src="https://www.ford.com/etc/designs/brand_ford/brand/skin/ford/img/bri-icons/Ford-logo.svg"
              alt=""
              width={150}
              height={50}
            />
            <h1 className="pb-4">
              <span className="text-navy ">Certificate</span> of Completion
            </h1>
            <p>This is to certify that</p>
            <h2 className="pt-2 pb-3 text-navy">{userName}</h2>
            <p>has successfully completed the course</p>
            <h4>{courseName}</h4>
            <br />
            <br />
            <div
              className="certificate-footer d-flex text-center pt-6"
              style={{ paddingLeft: "0px" }}
            >
              <div className="footer-item px-4 w-50">
                <p>
                  <span className="underline  fw-bold">
                    {completionDate.toLocaleDateString("de-DE")}
                  </span>
                </p>
                <hr />
                <p className="text-muted">Date</p>
              </div>
              <div className="footer-item w-50">
                <p>
                  <span className="underline   fw-bold">{signature}</span>
                </p>
                <hr />
                <p className="text-muted">Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-2">
        <button
          className="bg-navy border-0 mb-3  rounded-pill text-white px-3"
          style={{ backgroundColor: "#000B58" }}
          onClick={generateCertificate}
        >
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default GenerateCertificate;
