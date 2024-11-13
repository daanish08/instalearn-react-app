import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    comment: "",
    enquiryType: "Feedback",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <div className="gradient-background text-navy">
        <div
          className="px-4   mt-0 text-center"
          style={{ paddingTop: "100px" }}
        >
          <h1 className="display-2  pb-5  fw-semibold  ">CONTACT</h1>
          <h3 className="display-5  pb-5  fw-semibold gradient-text">
            "Join our vibrant online language learning community and connect{" "}
            <br />
            with us."
          </h3>
          <a href="#form">
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
          </a>
          <i className="bi bi-arrow-down-circle-fill"></i>
        </div>
      </div>
      <div className="container mt-5" id="form">
        <h2 className="text-left fw-light">
          For any <span className="fw-semibold text-success">Media</span> and
          <span className="fw-semibold text-success">Business</span> inquiries
          <hr className="pb-2" />
        </h2>
        <p>
          Send us a message below or email us at
          <a href="mailto:contact@info.com">contact&#64;info.com</a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="contact">Contact Info</label>
            <input
              type="text"
              className="form-control"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Email or Phone"
              required
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="comment">Message</label>
            <textarea
              className="form-control"
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows={4}
              required
            ></textarea>
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="enquiryType">What is this about</label>
            <select
              className="form-control"
              id="enquiryType"
              name="enquiryType"
              value={formData.enquiryType}
              onChange={handleChange}
              required
            >
              <option>Feedback</option>
              <option>Query</option>
              <option>Help</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <br />
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
