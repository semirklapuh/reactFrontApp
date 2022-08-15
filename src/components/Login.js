import "../../src/App.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  let [loginData, setLoginData] = useState([]);
  let [user, setUser] = useState([]);

  useEffect(() => {
    checkUser(); // eslint-disable-next-line
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target.elements.username.value);
    console.log(event.target.elements.password.value);
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
      // const data = await response.json();
      // setUser(data);
      // checkUser();
      response.json().then((res) => {
        setUser(res);
      });
    } catch (error) {
      console.log("Failed to fetch from DB", error);
    }
  };

  const navigate = useNavigate();

  let checkUser = () => {
    if (user.length !== 0) {
      console.log(loginData);
      console.log(user);

      if (
        user.username === loginData.username &&
        user.password === loginData.password
      ) {
        //alert("Successful login");
        console.log("toast");
        toast.success("Successful login", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/home");
      } else {
        // alert("Wrong username or password!");
        toast.error("Wrong username or password!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
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
