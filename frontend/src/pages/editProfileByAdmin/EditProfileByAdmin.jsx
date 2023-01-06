import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import "../profile/Profile.scss";
import { toast } from "react-toastify";
import { updateUserByAdmin } from "../../services/authService";
// import ChangePassword from "../../components/changePassword/ChangePassword";
// import FileBase from "react-file-base64";
import { useParams } from "react-router-dom";
import { getUserDetail } from "../../services/authService";
import {
  selectUserDetail,
  selectUser,
  SET_USER_DETAIL,
} from "../../redux/features/auth/authSlice";

const EditProfileByAdmin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const userDetail = useSelector(selectUserDetail);
  const user = useSelector(selectUser);
  // const { email } = selectUserDetail;
  const { id } = useParams();
  const [profile, setProfile] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserDetail(id);

      dispatch(SET_USER_DETAIL(data));
    };
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    const initialState = {
      name: userDetail?.name,
      email: userDetail?.email,
      phone: userDetail?.phone,
      bio: userDetail?.bio,
      photo: userDetail?.photo,
    };

    setProfile(initialState);
    // if (!email) {
    //   navigate("/profile");
    // }
  }, [dispatch, navigate, userDetail]);

  const [profileImage, setProfileImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // const handleImageChange = (e) => {
  //   setProfileImage(e.target.files[0]);
  // };

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Handle Image upload
      // let imageURL;
      // if (
      //   profileImage
      // ) {
      //   // if (
      //   //   profileImage &&
      //   //   (profileImage.type === "image/jpeg" ||
      //   //     profileImage.type === "image/jpg" ||
      //   //     profileImage.type === "image/png")
      //   // ) {
      //   const image = new FormData();
      //   image.append("file", profileImage);
      //   image.append("cloud_name", "druo8nrp9");
      //   image.append("upload_preset", "flnfqsnv");

      //   // First save image to cloudinary
      //   const response = await fetch(
      //     "https://api.cloudinary.com/v1_1/druo8nrp9/image/upload",
      //     { method: "post", body: image }
      //   );
      //   const imgData = await response.json();
      //   imageURL = imgData.url.toString();
      // }
      // Save Profile
      const formData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        // photo: profileImage ? imageURL : profile.photo,
        // photo: profileImage,
      };

      updateUserByAdmin({ id, formData });

      toast.success("User updated");
      navigate("/user-list");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  if (!userDetail) {
    return <Loader />;
  }
  return (
    <div className="profile --my2">
      {/* {isLoading && <Loader />} */}

      <Card cardClass={"card --flex-dir-column"}>
        <span className="profile-photo">
          <img src={userDetail?.photo} alt="profilepic" />
        </span>
        <form className="--form-control --m" onSubmit={saveProfile}>
          <span className="profile-data">
            <p>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={userDetail?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={userDetail?.email}
                disabled
              />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={userDetail?.phone}
                onChange={handleInputChange}
              />
            </p>
            {user.bio === "admin" && (
              <p>
                <label>Role:</label>
                <select
                  name="bio"
                  value={userDetail?.bio}
                  onChange={handleInputChange}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
                {/* <textarea
                  name="bio"
                  value={profile?.bio}
                  onChange={handleInputChange}
                  cols="30"
                  rows="10"
                ></textarea> */}
              </p>
            )}
            {/* <p>
              <label>Photo:</label>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => {
                  setProfileImage(base64);
                }}
              />
              <input type="file" name="image" onChange={handleImageChange} />
            </p> */}
            <div>
              <button className="--btn --btn-primary">Edit Profile</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      {/* <ChangePassword /> */}
    </div>
  );
};

export default EditProfileByAdmin;
