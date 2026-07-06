import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Rooms from "./pages/Rooms";
import Scheduler from "./pages/Scheduler";
import StudentView from "./pages/StudentView";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route
          path="/courses"
          element={<Courses />}
        />

        <Route
          path="/rooms"
          element={<Rooms />}
        />

        <Route
          path="/scheduler"
          element={<Scheduler />}
        />

        <Route
          path="/student"
          element={<StudentView />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;