import Nweet from "components/Nweet";
import { authService, dbService } from "fbase";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
  const [didMount, setDidMount] = useState(false);
  const [nweets, setNweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(
    userObj.displayName ?? ""
  );
  useEffect(() => setDidMount(true), []);
  const navigate = useNavigate();
  const onLogOutClick = async () => {
    await authService.signOut();
    navigate("/");
  };
  const getMyNweets = useCallback(async () => {
    if (didMount && nweets.length === 0) {
      const q = query(
        collection(dbService, "nweets"),
        where("creatorId", "==", userObj.uid),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        const nweet = { ...doc.data(), id: doc.id };
        setNweets((prev) => [...prev, nweet]);
      });
    }
  }, [didMount, userObj.uid, nweets]);
  useEffect(() => {
    getMyNweets();
  }, [getMyNweets]);
  const onChangeDisplayName = ({ target: { value } }) =>
    setNewDisplayName(value);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="New Display Name"
          value={newDisplayName}
          onChange={onChangeDisplayName}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{ marginTop: "10px" }}
        />
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
      <span className="formBtn" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
