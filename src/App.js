import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import UserContainer from "./components/user/UserContainer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <UserContainer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="onex-toast"
      />
    </div>
  );
}

export default App;
