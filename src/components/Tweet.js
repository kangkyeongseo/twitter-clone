import { db } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      const tweetsRef = doc(db, "tweets", `${tweetObj.id}`);
      await deleteDoc(tweetsRef);
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    const tweetsRef = doc(db, "tweets", `${tweetObj.id}`);
    await updateDoc(tweetsRef, {
      text: newTweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };
  return editing ? (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Edit your tweet"
          onChange={onChange}
          value={newTweet}
          required
        />
        <input type="submit" value="Update Tweet" />
      </form>
      <button onClick={toggleEditing}>cancel</button>
    </>
  ) : (
    <div>
      <h4>{tweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={toggleEditing}>Edit</button>
          <button onClick={onDeleteClick}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Tweet;
