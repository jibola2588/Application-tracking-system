import { useEffect, useState } from "react";
import Axios from "axios";

export default function UserDetails() {
  // const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    Axios.post("http://localhost:8000/auth/userData", {
      crossDomain: true,
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      // .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data.role == "Admin") {
          setAdmin(true);
        }

        // setUserData(data.data);

        // if (data.data == "token expired") {
        //   alert("Token expired login again");
        //   window.localStorage.clear();
        //   window.location.href = "/login";
        // }
      });
  }, []);

  return admin ? <h1>Welcome Admin</h1> :  <h1>Welcome Applicant</h1>;
}