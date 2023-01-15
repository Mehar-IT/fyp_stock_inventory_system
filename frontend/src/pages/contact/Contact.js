import React, { useState } from "react";
import Card from "../../components/card/Card";
import "./Contact.scss";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../services/authService";

const Contact = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const data = {
    subject,
    message,
  };
  const [loading, setloading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const response = await axios.post(`${BACKEND_URL}/api/contactus`, data);
      setSubject("");
      setMessage("");
      toast.success(response.data.message);
      setloading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="contact">
      <h3 className="--mt">Contact Us</h3>
      <div className="section">
        <form onSubmit={sendEmail}>
          <Card cardClass="card">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <label>Message</label>
            <textarea
              cols="30"
              rows="10"
              name="message"
              required
              placeholder="Enter Message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              disabled={loading}
              style={{ cursor: `${loading ? "not-allowed" : "pointer"}` }}
              className="--btn --btn-primary"
            >
              Send Message
            </button>
          </Card>
        </form>

        <div className="details">
          <Card cardClass={"card2"}>
            <h3>Our Contact Information</h3>
            <p>Fill the form or contact us via other channels listed below</p>

            <div className="icons">
              <span>
                <FaPhoneAlt />
                <p>022-9213159</p>
              </span>
              <span>
                <FaEnvelope />
                <p>info@usindh.edu.pk</p>
              </span>
              <span>
                <GoLocation />
                <p>University of Sindh</p>
              </span>
              <span>
                <FaTwitter />
                <p>@usindh</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
