import Canvas from "./components/Canvas";
import SettingsBar from "./components/SettingsBar";
import Toolbar from "./components/Toolbar";
import "./styles/app.scss";
import { Route, Routes, Navigate } from "react-router-dom";
function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/:id"
          element={
            <>
              <Toolbar />
              <SettingsBar />
              <Canvas />
            </>
          }
        ></Route>
        <Route path="*" element={<Navigate to={`f${(+new Date()).toString(16)}`} replace />} />
      </Routes>
    </div>
  );
}

export default App;
