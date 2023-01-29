import React from "react";
import { auth } from "fbase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import AuthForm from "components/AuthForm";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const AuthContianer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  color: #04aaff;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 320px;
  gap: 15px;
`;

const SocialBtn = styled.button`
  cursor: pointer;
  width: 100%;
  border: none;
  border-radius: 20px;
  padding: 10px 0px;
  font-size: 12px;
`;

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "githup") {
      provider = new GithubAuthProvider();
    }
    const result = await signInWithPopup(auth, provider);
  };
  return (
    <AuthContianer>
      <FontAwesomeIcon icon={faTwitter} color={"#04aaff"} size="3x" />
      <AuthForm />
      <BtnContainer>
        <SocialBtn name="google" onClick={onSocialClick}>
          Continue with Google
          <FontAwesomeIcon icon={faGoogle} style={{ marginLeft: 5 }} />
        </SocialBtn>
        <SocialBtn name="githup" onClick={onSocialClick}>
          Continue with Github
          <FontAwesomeIcon icon={faGithub} style={{ marginLeft: 5 }} />
        </SocialBtn>
      </BtnContainer>
    </AuthContianer>
  );
};

export default Auth;
