import React, { useState } from "react";
import "./AboutUs.css";
import bookStack from "../assets/bookStack.png";
import ethan from "../assets/ethan.png";

const AboutUs = () => {
  const [openMember, setOpenMember] = useState(null);

  const toggleMember = (name) => {
    setOpenMember(openMember === name ? null : name);
  };

  const teamMembers = [
    {
      name: "Jad Attieh",
      role: "Founder & CEO",
      email: "jad@novelverse.com",
      phone: "+1 (234) 567-890",
    },
    {
      name: "Kevin Rahme",
      role: "Head of Content",
      email: "kevin@novelverse.com",
      phone: "+1 (098) 765-432",
    },
  ];

  return (
    <div className="about-page">
      {/* Intro Section */}
      <section className="about-intro">
        <h1>About NovelVerse</h1>
        <p>
          At NovelVerse, we believe in the power of stories to connect, inspire, and transform. 
          Our mission is to make the world of literature accessible to everyone, fostering a 
          community of readers who share a passion for books.
        </p>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="story-text">
          <h2>Our Story</h2>
          <p>
            NovelVerse was founded in 2020 by a group of avid readers who envisioned a digital 
            space where books could be celebrated and shared. Starting as a small online forum, 
            it quickly grew into a comprehensive platform offering a vast library of books, 
            personalized recommendations, and interactive features. Today, NovelVerse continues 
            to evolve, driven by our commitment to enriching the reading experience for our users.
          </p>

          <h2>Our Values</h2>
          <ul>
            <li><span>✔</span> <strong>Integrity:</strong> We uphold honesty and transparency in all our interactions.</li>
            <li><span>✔</span> <strong>Inclusivity:</strong> We embrace diversity and strive to create a welcoming environment for all readers.</li>
            <li><span>✔</span> <strong>Innovation:</strong> We continuously seek new ways to enhance the reading experience and connect readers with books.</li>
            <li><span>✔</span> <strong>Community:</strong> We foster a vibrant network of readers, authors, and publishers united by a love for literature.</li>
          </ul>
        </div>

        <div className="story-image">
          <img src={bookStack} alt="Stack of books" className="aboutus-image"/>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <h2>Meet the Team</h2>
        <p>The passionate readers behind NovelVerse.</p>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div className="team-member" key={member.name}>
              <img src={ethan} alt={member.name} />
              <h3
                style={{ cursor: "pointer" }}
                onClick={() => toggleMember(member.name)}
              >
                {member.name}
              </h3>
              <div className={`member-card ${openMember === member.name ? "show" : ""}`}>
                <p><strong>Name:</strong> {member.name}</p>
                <p><strong>Role:</strong> {member.role}</p>
                <p><strong>Email:</strong> <a href={`mailto:${member.email}`}>{member.email}</a></p>
                <p><strong>Phone:</strong> <a href={`tel:${member.phone}`}>{member.phone}</a></p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
