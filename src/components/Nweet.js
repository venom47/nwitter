import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              onChange={onChange}
              autoFocus
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <span onClick={cancelEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} alt="" />
          )}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
