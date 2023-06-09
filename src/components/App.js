import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
// import { updateProfile } from "firebase/auth";

function App() {
  const [didMount, setDidMount] = useState(false);
  useEffect(() => setDidMount(true), []);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    if (didMount) {
      authService.onAuthStateChanged((user) => {
        setUserObj(user);
        // setUserObj({
        //   uid: user.uid,
        //   displayName: user.displayName,
        //   updateProfile: (args) =>
        //     updateProfile(user, { displayName: user.displayName }),
        // });
        setInit(true);
      });
    }
  }, [didMount]);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj(Object.assign({}, user));
    // setUserObj({
    //   uid: user.uid,
    //   displayName: user.displayName,
    //   updateProfile: (args) =>
    //     updateProfile(user, { displayName: user.displayName }),
    // });
  };
  return (
    <>
      {init ? (
        <AppRouter userObj={userObj} refreshUser={refreshUser} />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
