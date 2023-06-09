import { HashRouter, Route, Routes } from "react-router-dom";
import Navigation from "components/Navigation";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Profile from "routes/Profile";

const AppRouter = ({ userObj, refreshUser }) => {
  return (
    <HashRouter>
      {userObj && <Navigation userObj={userObj} />}
      <Routes>
        {userObj ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />}></Route>
            <Route
              path="/profile"
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            ></Route>
          </>
        ) : (
          <Route path="/" element={<Auth />}></Route>
        )}
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
