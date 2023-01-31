import React, { useEffect, useState } from "react";
import { auth, db } from "fbase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 90px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 60px;
  padding-bottom: 30px;
  border-bottom: 1px solid white;
`;

const TextInput = styled.input`
  background-color: white;
  width: 390px;
  padding: 10px;
  border-radius: 30px;
  text-align: center;
`;

const SubmitInput = styled(TextInput)`
  background-color: #04aaff;
  color: white;
`;

const LogoutBtn = styled.button`
  background-color: tomato;
  color: white;
  width: 390px;
  padding: 10px;
  border: none;
  border-radius: 30px;
  text-align: center;
`;

const Profile = ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = async () => {
    await auth.signOut();
    navigate("/");
  };
  const getMyTweets = async () => {
    const q = query(
      collection(db, "tweets"),
      where("createdId", "==", userObj.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => console.log(doc.data()));
  };
  useEffect(() => {
    getMyTweets();
  }, []);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <TextInput
          type="text"
          placeholder="Display Name"
          onChange={onChange}
          value={newDisplayName}
        />
        <SubmitInput type="submit" value="Update Profile" />
      </Form>
      <LogoutBtn onClick={onLogOutClick}>Log Out</LogoutBtn>
    </Container>
  );
};

export default Profile;
