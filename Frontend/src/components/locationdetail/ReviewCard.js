import React from "react";
import styled from "styled-components";

const ReviewCardWrapper = styled.div`
  width: 20rem;
  background-color: #d9d9d9;
  margin-bottom: 0.5rem;
`;
const ReviewHeader = styled.div`
  display : flex;
  justify-content: flex-start;
  width : 100%:
`;

const Writer = styled.div`
  padding-top: 0.4rem;
  padding-left: 0.4rem;
  width: 4rem;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
`;

const WriteDay = styled.div`
  padding-top: 0.6rem;
  width: 13rem;
  font-size: 0.5rem;
  color: gray;
`;
const StarImg = styled.img`
  padding-top: 0.4rem;
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
`;
const Score = styled.div`
  padding-top: 0.6rem;
  padding-right: 0.4rem;
  font-size: 0.7rem;
  font-weight: bold;
`;
const ReviewContents = styled.div`
  padding: 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;
`;

const ReviewCard = ({ writer, writeday, score, content }) => {
  return (
    <ReviewCardWrapper>
      <ReviewHeader>
        <Writer>{writer}</Writer>
        <WriteDay>{writeday}</WriteDay>
        <StarImg src={`${process.env.PUBLIC_URL}/assets/card/star.png`}></StarImg>
        <Score>{score}</Score>
      </ReviewHeader>
      <ReviewContents>{content}</ReviewContents>
    </ReviewCardWrapper>
  );
};

export default ReviewCard;
