import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db, storage } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 390px;
  height: 70px;
  padding: 10px 10px 10px 20px;
  border-radius: 15px;
  background-color: white;
`;

const EditContainer = styled(Container)`
  flex-direction: column;
  padding: 20px;
  height: 100%;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 10px;
  text-align: center;
  border: 1px solid;
  border-radius: 30px;
  margin-bottom: 20px;
`;

const SubmitInput = styled.input`
  padding: 10px;
  background-color: #04aaff;
  border-radius: 30px;
  text-align: center;
  color: white;
`;

const CancleBtn = styled.button`
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  background-color: tomato;
  border: none;
  border-radius: 30px;
  text-align: center;
  color: white;
`;

const Text = styled.h4``;

const BtnContainer = styled.div`
  align-self: flex-start;
`;

const Btn = styled.button`
  border: none;
  background-color: transparent;
`;

const Img = styled.img`
  z-index: 1;
  position: absolute;
  right: -10px;
  bottom: -22px;
  width: 60px;
  height: 60px;
  border: 1px solid;
  border-radius: 50%;
`;

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      const tweetsRef = doc(db, "tweets", `${tweetObj.id}`);
      const urlRef = ref(storage, tweetObj.attachmentUrl);
      await deleteDoc(tweetsRef);
      await deleteObject(urlRef);
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
    <EditContainer>
      <EditForm onSubmit={onSubmit}>
        <TextInput
          type="text"
          placeholder="Edit your tweet"
          onChange={onChange}
          value={newTweet}
          required
        />
        <SubmitInput type="submit" value="Update Tweet" />
      </EditForm>
      <CancleBtn onClick={toggleEditing}>cancel</CancleBtn>
    </EditContainer>
  ) : (
    <Container>
      <Text>{tweetObj.text}</Text>
      {isOwner && (
        <BtnContainer>
          <Btn onClick={toggleEditing}>
            <FontAwesomeIcon icon={faPencil} />
          </Btn>
          <Btn onClick={onDeleteClick}>
            <FontAwesomeIcon icon={faTrash} />
          </Btn>
        </BtnContainer>
      )}
      {tweetObj.attachmentUrl && (
        <Img src={tweetObj.attachmentUrl} width="50px" height="50px" />
      )}
    </Container>
  );
};

export default Tweet;
