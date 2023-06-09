import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, steNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      try {
        await deleteDoc(doc(dbService, "nweets", `${nweetObj.id}`));
        if (nweetObj.attachmentUrl) {
          await deleteObject(ref(storageService, nweetObj.attachmentUrl));
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  };
  const onChange = (event) => {
    steNewNweet(event.target.value);
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const cancelEditing = () => {
    setEditing(false);
    steNewNweet(nweetObj.text);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const ref = doc(dbService, "nweets", `${nweetObj.id}`);
      await updateDoc(ref, {
        text: newNweet,
      });
      setEditing(false);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={cancelEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img
              src={nweetObj.attachmentUrl}
              width="50px"
              height="50px"
              alt=""
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
