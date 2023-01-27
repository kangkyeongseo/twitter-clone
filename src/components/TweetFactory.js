import React, { useRef, useState } from "react";
import { db, storage } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const TweetFactory = ({ userObj }) => {
  const fileInput = useRef();
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const fileRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
    }
    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      createdId: userObj.uid,
      attachmentUrl,
    };
    await addDoc(collection(db, "tweets"), tweetObj);
    setTweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    console.log(files);
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      console.log(result);
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachmenat = () => {
    setAttachment(null);
    fileInput.current.value = "";
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        onChange={onChange}
        value={tweet}
        placeholder="What's on your mind"
        maxLength={120}
      />
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInput}
      />
      <input type="submit" value="Tweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={onClearAttachmenat}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default TweetFactory;
