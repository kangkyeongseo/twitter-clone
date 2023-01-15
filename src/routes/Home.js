import React, { useEffect, useState } from "react";
import { db } from "fbase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const getTweets = async () => {
    const q = await getDocs(collection(db, "tweets"));
    q.forEach((doc) => {
      const tweetObject = {
        ...doc.data(),
        id: doc.id,
      };
      setTweets((prev) => [tweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getTweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(db, "tweets"), {
      tweet,
      createdAt: Date.now(),
    });
    setTweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={tweet}
          placeholder="What's on your mind"
          maxLength={120}
        />
        <input type="submit" value="Tweet" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id}>
            <h4>{tweet.tweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
