import "../../src/App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";

const Login = () => {
  let [loginData, setLoginData] = useState([]);
  let [user, setUser] = useState([]);
  let [decryptedPassword, setDecryptedPassword] = useState("");

  useEffect(() => {
    checkUser(); // eslint-disable-next-line
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginData({
      username: event.target.elements.username.value,
      password: event.target.elements.password.value,
    });
    await login(
      event.target.elements.username.value,
      event.target.elements.password.value
    );
  };

  let login = async (username, password) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/loginData/getByUsername/${username}`
      );
      response.json().then((res) => {
        decryptPassword(res.password, res);
      });
    } catch (error) {
      console.log("Failed to fetch from DB", error);
    }
  };

  const navigate = useNavigate();

  let checkUser = () => {
    if (user.length !== 0) {
      if (
        user.username === loginData.username &&
        decryptedPassword === loginData.password
      ) {
        toast.success("Successful login", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/home");
      } else {
        toast.error("Wrong username or password!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const decryptPassword = (encryption, res) => {
    console.log("EE" + encryption);
    Axios.post("http://localhost:4000/api/v1/loginData/decrypt-password", {
      password: encryption,
    })
      .then((response) => {
        setDecryptedPassword(response.data);
        setUser(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login</h1>
        <div className="formDiv">
          <form onSubmit={handleSubmit}>
            <input
              className="inputClass"
              name="username"
              type={"text"}
              placeholder="username"
            ></input>
            <input
              className="inputClass"
              name="password"
              type={"password"}
              placeholder="password"
            ></input>
            <div>
              <button className="button-72" type="submit">
                Login
              </button>
            </div>
          </form>
          <div style={{ marginTop: 25 }}>
            <Link style={{ fontSize: 24 }} to="/register">
              Don't have an account? Click here...
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Login;
