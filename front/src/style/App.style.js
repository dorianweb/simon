import { React } from "react";
import styled from "styled-components";

export const KeyCase = styled.div`
  width: 15vw;
  height: 15vw;
  margin: 5px;
  background-color: ${(props) => {
    if (props.keycase) {
      if (props.color && props.color != "") {
        return props.color;
      } else {
        return "red";
      }
    } else {
      return "blue";
    }
  }};
  border: red;
`;

export const CodeBoard = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;
