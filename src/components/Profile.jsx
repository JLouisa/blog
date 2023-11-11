import { useState, useEffect } from "react";
import localHost from "./localHost";
import formattedDate from "./formattedDate";
import useBearStore from "./useBearStore";

function Profile() {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]);
  const { setIsAdmin } = useBearStore();

  const getUserInfo = async () => {
    const token = localStorage.getItem("projectX");

    if (!token) {
      console.error("No token found");
      return false;
    }

    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(`${localHost}/v1/api/user`, requestOptions);

      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
        setIsAdmin(data.data.isAdmin);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const promoteUser = async (id) => {
    try {
      const token = localStorage.getItem("projectX");
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(`${localHost}/v1/api/user/${id}/admin`, requestOptions);
      if (response.ok) {
        getUserInfo();
      } else {
        const errorData = response.json();
        setErrors(errorData.errors);
      }
    } catch (err) {
      console.error("Error getting user information");
    }
  };

  return (
    <>
      {errors
        ? errors.map((error, index) => {
            return (
              <p key={error.msg || index} className="errors">
                {error.msg}
              </p>
            );
          })
        : null}
      <h1>Username: {user.username}</h1>
      <p>Date Joined: {formattedDate(user.createdDate)}</p>
      <p>Admin privileges: {user.isAdmin ? "Yes" : "No"}</p>
      <p>Account Banned: {user.isSuspended ? "Yes" : "No"}</p>
      <div>
        {user.isAdmin ? "Remove Admin Privileges" : "Become an Admin"}
        <br />
        <button className="btn" onClick={() => promoteUser(user._id)}>
          Yes
        </button>
      </div>
    </>
  );
}

export default Profile;
