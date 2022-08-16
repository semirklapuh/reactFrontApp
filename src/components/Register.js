import "../../src/App.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import { useState } from "react";

const Register = () => {
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Register");
    console.log(event.target.elements.username.value);
    console.log(event.target.elements.password.value);
    console.log(event.target.elements.confirmPassword.value);
    if (validPassword) {
      console.log("password je validan");
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
    } else {
      console.log("password nije validan");
    }
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
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <input
              className="inputClass"
              name="confirmPassword"
              type={"password"}
              placeholder="confirm password"
              onChange={(e) => setPasswordAgain(e.target.value)}
            ></input>
            <PasswordChecklist
              style={{ fontSize: 15 }}
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={8}
              value={password}
              valueAgain={passwordAgain}
              onChange={(isValid) => {
                if (isValid) {
                  setValidPassword(true);
                } else {
                  setValidPassword(false);
                }
              }}
              messages={{
                minLength: "Password must have more than 8 characters.",
                specialChar: "Password must have a special character.",
                number: "Password must have a number.",
                capital: "Password must have a capital letter",
                match: "Passwords need to match.",
              }}
            />
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
