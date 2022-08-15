import "../../src/App.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Register");
    console.log(event.target.elements.username.value);
    console.log(event.target.elements.password.value);
    console.log(event.target.elements.confirmPassword.value);

    axios
      .post("http://localhost:4000/api/v1/loginData", {
        username: event.target.elements.username.value,
        password: event.target.elements.password.value,
      })
      .then((response) => {
        console.log("semir");
        console.log(response);
        toast.success("Successful register", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Register</h1>
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
            <input
              className="inputClass"
              name="confirmPassword"
              type={"password"}
              placeholder="confirm password"
            ></input>
            <div>
              <button className="button-72" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
};

export default Register;
