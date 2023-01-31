import React, { useEffect, useState } from "react";
import { db } from "fbase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Tweets = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  margin-top: 30px;
`;

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "tweets"), orderBy("createdAt", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const newTweets = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setTweets(newTweets);
    });
  }, []);

  return (
    <Container>
      <TweetFactory userObj={userObj} />
      <Tweets>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={userObj.uid === tweet.createdId ? true : false}
          />
        ))}
      </Tweets>
    </Container>
  );
};

export default Home;
