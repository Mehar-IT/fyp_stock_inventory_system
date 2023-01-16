import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import "./home.css";
import heroImg from "../../assets/inv-img.png";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";
import logo from "../../data/uoslogo.png";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between ">
        <div className="logo">
          <img src={logo} alt="logo" className="logoHome" />
        </div>

        <ul className="home-links">
          <ShowOnLogout>
            <li className="registerButtonHome">
              <Link to="/register">Register</Link>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <button className="--btn loginButtonHome ">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn loginButtonHome">
                <Link to="/orders">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      {/* HERO SECTION */}
      <section className="container hero">
        <div className="hero-text">
          <h2>Inventory {"&"} Stock Management Solution</h2>
          <p className="homePara">
            Inventory system to control and manage proucts in the warehouse in
            real timeand integrated to make it easier to develop your business.
          </p>
          <p className="homePara">This is the final year Project made by</p>
          <ul>
            <li className="developer">Hamza Tarique 2k19-IT-40</li>
            <li className="developer">Ahsan Jawed 2k19-IT-12</li>
            <li className="developer">Hassan Khan 2k19-IT-43</li>
          </ul>
          <p className="homePara"> under the supervision of</p>
          <h3 className="tag">Dr.Zeeshan Bhatti </h3>
          <p className="homePara" style={{ marginTop: "10px" }}>
            For <span className="UOS"> University of Sindh</span>
          </p>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Inventory" />
        </div>
      </section>
    </div>
  );
};

export default Home;
