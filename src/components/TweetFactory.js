import React, { useRef, useState } from "react";
import { db, storage } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX, faXmark } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  margin-top: 90px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  color: #04aaff;
`;

const InputContainer = styled.div`
  position: relative;
`;

const TextInput = styled.input`
  width: 390px;
  padding: 10px 20px;
  border: 1px solid #04aaff;
  border-radius: 30px;
  color: white;
`;

const SubmitInput = styled.input`
  position: absolute;
  right: 0;
  width: 41.5px;
  height: 41.5px;
  text-align: center;
  border-radius: 50%;
  background-color: #04aaff;
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const FileInput = styled.input`
  display: none;
`;

const Label = styled.label`
  margin-top: 20px;
  text-align: center;
`;

const ImageContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const RemoveBtn = styled.button`
  margin-top: 5px;
  border: none;
  background-color: transparent;
  color: #04aaff;
`;

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
    <Container>
      <Form onSubmit={onSubmit}>
        <InputContainer>
          <TextInput
            type="text"
            onChange={onChange}
            value={tweet}
            placeholder="What's on your mind"
            maxLength={120}
          />
          <SubmitInput type="submit" value="〉" />
        </InputContainer>
        <Label htmlFor="file">
          Add photos
          <FontAwesomeIcon icon={faPlus} style={{ paddingLeft: 10 }} />
        </Label>
        <FileInput
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
          id="file"
        />
      </Form>
      {attachment && (
        <ImageContainer>
          <Image src={attachment} width="50px" height="50px" />
          <RemoveBtn onClick={onClearAttachmenat}>
            Clear
            <FontAwesomeIcon icon={faXmark} style={{ paddingLeft: 10 }} />
          </RemoveBtn>
        </ImageContainer>
      )}
    </Container>
  );
};

export default TweetFactory;
