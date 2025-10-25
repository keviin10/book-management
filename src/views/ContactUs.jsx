import React from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const subject = form.elements["subject"].value.trim();
    const message = form.elements["message"].value.trim();

    if (!name || !email || !subject) {
      alert("Please fill in all required fields (Name, Email, and Subject).");
      return;
    }

    alert("Your message was sent successfully!");
    form.reset(); 
  };

  return (
    <div className="contact-page">
      {/* Left Side - Form */}
      <div className="contact-left">
        <h1>Get in Touch</h1>
        <p>
          We'd love to hear from you. Whether you have a question about our
          books, pricing, or anything else — our team is ready to answer all
          your questions.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" />
          <input type="email" name="email" placeholder="Your Email" />
          <input type="text" name="subject" placeholder="Subject" />
          <textarea name="message" placeholder="Your Message" rows="5"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

      {/* Right Side - Info */}
      <div className="contact-right">
  <h2>Our Location</h2>

  <div className="contact-info">
    <h2>Contact Information</h2>
    <p>
      <strong>Email:</strong>{" "}
      <a href="mailto:support@novelnest.com" className="clickable">
        support@novelnest.com
      </a>
    </p>
    <p>
      <strong>Phone:</strong>{" "}
      <a href="tel:+15551234567" className="clickable">
        +1 (555) 123-4567
      </a>
    </p>
    <p>
      <strong>Address:</strong>{" "}
      <a 
        href="https://www.google.com/maps/search/?api=1&query=123+Bookworm+Lane+Readington+BK+54321"
        target="_blank" /*yeene kabna aa new tab*/
        rel="noopener noreferrer"
        className="clickable"
      >
        123 Bookworm Lane, Readington, BK 54321
      </a>
    </p>
  </div>
</div>

    </div>
  );
};

export default ContactUs;
