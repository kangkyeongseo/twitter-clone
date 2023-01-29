import React, { useState } from "react";
import { auth } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  margin-top: 30px;
`;

const Input = styled.input`
  max-width: 320px;
  padding: 10px;
  border-radius: 30px;
  margin-bottom: 10px;
  font-size: 12px;
  background-color: rgba(255, 255, 255, 1);
  color: black;
`;

const SubmitInput = styled(Input)`
  text-align: center;
  background-color: #04aaff;
  color: white;
`;

const ErrorMessagea = styled.span`
  color: tomato;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
`;

const Switch = styled.span`
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 50px;
  font-size: 12px;
  text-decoration: underline;
`;

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccout, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (newAccout) {
      //create account
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
        });
    } else {
      //login
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
        });
    }
  };
  const toggleAccout = () => setNewAccount((prev) => !prev);
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
        />
        <Input
          onChange={onChange}
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
        />
        <SubmitInput
          type="submit"
          value={newAccout ? "Create Account" : "Login"}
        />
        <ErrorMessagea>{error}</ErrorMessagea>
      </Form>
      <Switch onClick={toggleAccout}>
        {newAccout ? "Login" : "Create Account"}
      </Switch>
    </>
  );
};

export default AuthForm;
