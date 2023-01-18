import React, { useEffect } from "react";
import { auth, db } from "fbase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const Profile = ({ userObj }) => {
  const navigate = useNavigate();
  const onLogOutClick = async () => {
    await auth.signOut();
    navigate("/");
  };
  const getMyTweets = async () => {
    const q = query(
      collection(db, "tweets"),
      where("createdId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => console.log(doc.data()));
  };
  useEffect(() => {
    getMyTweets();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
