import Login from "./component/Login.js";
import Post from "./component/Post.js";
import Register from "./component/Register.js";

import Text from "./component/Text.js";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/post" element={<Post/>} />
        <Route path="/text" element={<Text/>} />
      </Routes>
     </BrowserRouter>
  );
}

export default App;
