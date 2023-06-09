import { dbService, storageService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const fileInput = useRef();
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let attachmentUrl = "";
      if (attachment) {
        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        await uploadString(fileRef, attachment, "data_url");
        attachmentUrl = await getDownloadURL(fileRef);
      }
      if (nweet || attachment) {
        const nweetObj = {
          text: nweet,
          createdAt: Date.now(),
          creatorId: userObj.uid,
          attachmentUrl,
        };
        await addDoc(collection(dbService, "nweets"), nweetObj);
        setNweet("");
        onClearAttachment();
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  const onChange = ({ target: { value } }) => {
    setNweet(value);
  };
  const onFileChange = ({
    target: {
      files: [file],
    },
  }) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = ({ currentTarget: { result } }) => {
        if (result) {
          setAttachment(result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setAttachment("");
    }
  };
  const onClearAttachment = () => {
    setAttachment("");
    fileInput.current.value = null;
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Waht's on your mind?"
        maxLength={120}
        onChange={onChange}
        value={nweet}
      />
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInput}
      />
      <input type="submit" value="Nweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" alt="" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
