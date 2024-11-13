import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";

interface IProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
}

function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [password, setPassword] = useState<string>("");
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);

  useEffect(() => {
    if (user && user.role) {
      loadUserProfile(user.id, user.role);
      console.log(user.role);
    }
  }, [user]);

  const loadUserProfile = async (id: number, role: string) => {
    try {
      let endpoint = `http://localhost:8080/instalearn/admin/${id}`;

      // Determine the endpoint based on the role
      if (role === "ADMIN") {
        endpoint = `http://localhost:8080/instalearn/admin/AdminList/${id}`;
      } else if (role === "USER") {
        endpoint = `http://localhost:8080/instalearn/user/userList/${id}`;
      }
      // Add more conditions if you have more roles

      const response = await axios.get(endpoint);
      setProfile(response.data);
      setPassword(response.data.password); // Initialize password state
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
  };

  

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center py-4">
      <div className="card" style={{ width: "23rem" }}>
        <img
          src="../src/assets/image/profile.png"
          height="280px"
          className="card-img-top"
          alt="Profile Image"
        />
        <div className="card-body">
          <h5 className="card-title text-center fw-bold gradient-text">
            {profile?.name}
          </h5>
          <ul className="list-group list-group-flush text-center">
            <li className="list-group-item fw-light">
              <strong className="text-muted fw-bold">Email: </strong>
              {profile?.email}
            </li>
            <li className="list-group-item fw-light">
              <strong className="text-muted fw-bold">Contact: </strong>
              {profile?.phone}
            </li>
            <li className="list-group-item fw-light">
            <strong className="text-muted fw-bold">Password: </strong>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                className="form-control"
                id="password"
                placeholder="Password"
                required
              />
              {passwordTouched && password === "" && (
                <div className="text-danger">Password is required.</div>
              )}
            </li>
            {/* Password is NOT displayed for security reasons */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
