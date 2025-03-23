import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Us</h1>
        <p>AI-powered Healthcare Solutions for Age-Related Macular Degeneration Detection.</p>
        <p>Our innovative approach leverages deep learning and multi-modal imaging techniques to enhance diagnostic accuracy 
          and facilitate early intervention. By integrating state-of-the-art technology with medical expertise, 
          we strive to improve patient outcomes, streamline clinical workflows, and make eye disease detection more 
          accessible and efficient.</p>
      </section>

      <section className="about-content">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            We are committed to transforming eye disease detection through cutting-edge AI-driven solutions. 
            By leveraging advanced machine learning techniques, we aim to enhance diagnostic accuracy, improve early detection, and make eye care more accessible and efficient.
          </p>
        </div>
        <div className="about-image">
          <img src="/src/assets/mission.jpg" alt="Mission as AI Ophthalmologist" />
        </div>
      </section>

      <section className="about-team">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="/src/assets/dev_team_member.jpeg" alt="Developer" />
            <h3>Randika Geekiyanage</h3>
            <p>Undergraduate</p>
            <p>Informatics Institute of Technology</p>
            <p>randika.20210147@iit.ac.lk</p>
          </div>
          <div className="team-member">
            <img src="/src/assets/dev_team_member.jpeg" alt="Supervisor" />
            <h3>Oshadha Goonathilake</h3>
            <p>Visiting Lecturer</p>
            <p>Informatics Institute of Technology</p>
            <p>oshadha.g@iit.ac.lk</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
