import "../../src/App.css";
import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  let handleClick = () => {
    console.log("brisi auth");
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };
  return (
    <div className="App">
      <h1>welcome</h1>
      <div>
        <button className="button-72" onClick={handleClick}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
