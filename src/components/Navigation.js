import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  width: 100%;
  max-width: 890px;
  margin: 0 auto;
  margin-top: 50px;
  color: white;
`;

const Lists = styled.ul`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const List = styled.li`
  a {
    display: flex;
    flex-direction: column;
    span {
      font-size: 12px;
      margin-top: 10px;
    }
  }
`;

const Navigation = ({ userObj }) => (
  <Nav>
    <Lists>
      <List>
        <Link to="/">
          <FontAwesomeIcon icon={faTwitter} color={"#04aaff"} size="2x" />
        </Link>
      </List>
      <List>
        <Link to="/profile">
          <FontAwesomeIcon icon={faUser} color={"#04aaff"} size="2x" />
          <span>{userObj.displayName}의 Profile</span>
        </Link>
      </List>
    </Lists>
  </Nav>
);

export default Navigation;
