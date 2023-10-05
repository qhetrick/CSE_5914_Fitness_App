import React from "react";
import Navbar from "../components/Navbar";
import "../css/Team.css";

function Team() {
  let message = "Lorem Ipsum ";
  return (
    <>
      <Navbar />
      <section className="section-white">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center"></div>
            <h2 className="section-title">The Team Behind FitFriend</h2>
            <p className="section-subtitle">{message}</p>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="team-item">
              <img src="OwenProfile.jpg" className="team-img" alt="pic" />
              <h3 className="member-name">Owen Hennessey</h3>
              <div className="team-info">
                <p className="Team">Backend</p>
                <p>Owen is</p>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-4">
            <div className="team-item">
              <img src="" className="team-img" alt="pic" />
              <h3 className="member-name">Owen Hennessey</h3>
              <div className="team-info">
                <p className="Team">Backend</p>
                <p>Owen is</p>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-md-4">
            <div className="team-item">
              <img src="" className="team-img" alt="pic" />
              <h3 className="member-name">Owen Hennessey</h3>
              <div className="team-info">
                <p className="Team">Backend</p>
                <p>Owen is</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Team;
