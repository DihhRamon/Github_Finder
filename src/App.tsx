import { Outlet } from "react-router-dom";

import classes from "./App.module.css";
function App() {

  return (
      <div className={classes.app}>
        <div className={classes.app_img}>
          <img src="/github.png" alt="Mascote Git" />
        </div>
        <h1>GitHub Finder</h1>
        <Outlet />
      </div>
  );
}

export default App
