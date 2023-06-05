import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <HashRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />}></Route>
          </>
        ) : (
          <Route path="/" element={<Auth />}></Route>
        )}
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
