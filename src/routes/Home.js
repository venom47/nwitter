import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [didMount, setDidMount] = useState(false);
  useEffect(() => setDidMount(true), []);
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    if (didMount) {
      try {
        const q = query(
          collection(dbService, "nweets"),
          orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
          const nweetArr = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setNweets(nweetArr);
        });
      } catch (e) {
        console.log(e.message);
      }
    }
  }, [didMount]);
  return (
    <div>
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
