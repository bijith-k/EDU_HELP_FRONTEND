import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentRouter from "./routes/StudentRouter";
import TutorRouter from "./routes/TutorRouter";
import AdminRouter from "./routes/AdminRouter";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/*"} element={<StudentRouter />} />
          <Route path={"/tutor/*"} element={<TutorRouter />} />
          <Route path={"/admin/*"} element={<AdminRouter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
