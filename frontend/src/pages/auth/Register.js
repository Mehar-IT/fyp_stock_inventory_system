import React, { useState } from "react";
import styles from "./auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { departments } from "../../data/sidebar";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
  dept: "",
};

const Register = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const { name, email, password, password2, dept } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !dept) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      name,
      email,
      password,
      dept,
    };
    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      toast.info(data.message);
      navigate("/login");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="signupContainer">
      <div className={`container ${styles.auth}`}>
        {isLoading && <Loader />}
        <Card>
          <div className={styles.form}>
            <div className="--flex-center">
              <TiUserAddOutline size={35} color="#999" />
            </div>
            <h2>Register</h2>

            <form onSubmit={register}>
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={handleInputChange}
              />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                name="password2"
                value={password2}
                onChange={handleInputChange}
              />
              <select
                required
                name="dept"
                value={dept}
                onChange={handleInputChange}
              >
                <option>Select Deartment</option>
                {departments.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>

            <span className={styles.register}>
              <Link to="/">Home</Link>
              <p> &nbsp; Already have an account? &nbsp;</p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
