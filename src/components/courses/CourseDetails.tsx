import React, { useEffect, useState } from 'react';
import { ICourse } from '../../models/ICourse';
import { useParams } from 'react-router-dom';
import axios from 'axios';

  
const CourseDetails = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const previousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();
  console.log(id);
  const [course, setCourse] = useState<ICourse>({
    id: "",
    courseName: "",
    instructor: "",
    phone: "",
    duration: "",
    imageUrl: "",
    githubURL: "",
    driveURL: "",
  });

  useEffect(() => {
    async function getCourse() {
      try {
        const response = await axios.get(
          `http://localhost:8080/instalearn/api/v1/course/${id}`
        );
        console.log(response);
        setCourse(response.data);
      } catch (error) {
        setIsLoading(false);
        setError("Failed to fetch course data. Please try again later.");
      }
    }
    getCourse();
  }, []);

  return (
    <div className="container-fluid mt-5 px-5">
      <div className="card">
        <img src={course.imageUrl} className="card-img-top" alt={course.courseName} width="450" height="350" />
        <div className="card-body">
          <h1 className="card-title fs-2 fw-light">{course.courseName}</h1>

          {/* Progress Bar
          <div className="progress mb-4">
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${(currentStep / 3) * 100}%` }}
              aria-valuenow={currentStep}
              aria-valuemin={1}
              aria-valuemax={3}
            ></div>
          </div> */}

          {/* Step 1: Course Details */}
          {currentStep === 1 && (
            <div>
              <p className="card-text fw-semibold">
                <strong className="text-success fw-normal">Instructor:</strong> {course.instructor}
              </p>
              <p className="card-text fw-semibold">
                <strong className="text-success fw-normal">Duration:</strong> {course.duration}
              </p>
              <p className="card-text fw-semibold">
                <strong className="text-success fw-normal">Description:</strong> {course.description}
              </p>
            </div>
          )}

          {/* Step 2: Attachments */}
          {currentStep === 2 && (
            <div>
              <h5 className="fw-semibold text-success border-bottom w-10">Course Materials</h5>
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-outline-success mx-2 my-2"
                  onClick={() => openLink(course.githubURL)}
                >
                  <i className="fab fa-github"></i> GitHub
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success mx-2 my-2"
                  onClick={() => openLink(course.driveURL)}
                >
                  <i className="fas fa-file-alt"></i> Drive
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Video */}
          {currentStep === 3 && (
            <div>
              <h5 className="fw-semibold text-success border-bottom w-10">Course Video</h5>
              <div className="embed-responsive embed-responsive-16by9 px-5 py-2">
                <iframe
                  width="800"
                  height="500"
                  src={course.sanitizedCourseURL}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-3 d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={previousStep}
              disabled={currentStep === 1}
            >
              Previous
            </button>
            {currentStep < 3 && (
              <button className="btn btn-success" type="button" onClick={nextStep}>
                Next
              </button>
            )}
            {currentStep === 3 && (
              <button className="btn btn-success" type="button">
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
