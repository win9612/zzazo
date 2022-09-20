import React from "react";
import styled from "styled-components";
import ReviewCard from "./ReviewCard";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 50rem;
  height: 30rem;
  padding-top: 1.5rem;
  padding-left: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.8);

  margin-bottom: 3rem;
`;
const ExitBtnWrapper = styled.div`
  width: 48rem;
  display: flex;

  justify-content: flex-end;
`;

const CardTitle = styled.div`
  font-size: 2.3rem;
  font-weight: bold;
  padding-bottom: ;
`;
const CardLine = styled.hr`
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: ${({ hrwidth }) => hrwidth};
  height: 0.1rem;
  background-color: black;
  color: black;
`;
const CardMainWrapper = styled.div`
  width: 50rem;
  height: 22rem;
  display: flex;
  justify-content: space-evenly;
`;

const CardInfoWrapper = styled.div`
  display: flex;
  width: 24rem;

  flex-direction: column;

  background-color: white;
`;
const CardImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardInfo = styled.div`
  display: flex;
  height: 8rem;
  flex-direction: column;
`;
const CardInfoItem = styled.div`
  margin: 0.4rem;
  font-weight: bold;
`;
const InfoIcon = styled.img`
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
`;
const CardImg = styled.img`
  width: 23rem;
  height: 18rem;
  margin-left: 1.5rem;
  border-radius: 16px;
  box-shadow: 2px 1px 1px grey;
`;
const InstaButtonWrapper = styled.div`
  width: 25rem;
  display: flex;
  margin-top: 1.5rem;
  margin-right: 1rem;
  justify-content: flex-end;
`;
const ImgButton = styled.img`
  border-radius: 5px;
  width: 2rem;
  height: 2rem;
`;
const ReviewWrapper = styled.div`
  height: 10rem;
  border-radius: 10px;
  padding: 1rem;

  margin-bottom: 1rem;
  background-color: white;

  flex-direction: column;
  overflow-y: scroll;
  display: flex;
`;

const ReviewTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 900;
`;

const CardDetail = ({}) => {
  return (
    <CardWrapper>
      <ExitBtnWrapper>
        <ImgButton src={`${process.env.PUBLIC_URL}/assets/card/exit.png`} alt="exit"></ImgButton>
      </ExitBtnWrapper>
      <CardTitle>가가가덮밥</CardTitle>
      <CardLine width="50%"></CardLine>
      <CardMainWrapper>
        <CardInfoWrapper>
          <CardInfo>
            <CardInfoItem>
              <InfoIcon src={`${process.env.PUBLIC_URL}/assets/card/location.png`} alt="location"></InfoIcon>
              서울 강남구 강남대로 123
            </CardInfoItem>
            <CardInfoItem>
              <InfoIcon src={`${process.env.PUBLIC_URL}/assets/card/sushi.png`} alt="location"></InfoIcon>
              음식점 - 일식
            </CardInfoItem>
            <CardInfoItem>
              <InfoIcon src={`${process.env.PUBLIC_URL}/assets/card/women.png`} alt="location"></InfoIcon>
              20대 여성들이 많이 방문했어요
            </CardInfoItem>
            <CardInfoItem>
              <InfoIcon src={`${process.env.PUBLIC_URL}/assets/card/star.png`} alt="location"></InfoIcon>
              4.3
            </CardInfoItem>
          </CardInfo>
          <CardLine width="100%"></CardLine>
          <ReviewTitle>Review</ReviewTitle>
          <ReviewWrapper>
            <ReviewCard writer="김성수" writeday="2022 - 09 - 20" score="4.7" content="인생은 가지덮밥을 먹기 전과 후로 나뉜다."></ReviewCard>
            <ReviewCard
              writer="김성수"
              writeday="2022 - 09 - 20"
              score="4.7"
              content="내 인생에 있어 가지는 변수가 아닌 상수다.내 인생에 있어 가지는 변수가 아닌 상수다. 내 인생에 있어 가지는 변수가 아닌 상수다."
            ></ReviewCard>
          </ReviewWrapper>
        </CardInfoWrapper>
        <CardImgWrapper>
          <CardImg src={`${process.env.PUBLIC_URL}/assets/card/gazi.png`} alt="exit"></CardImg>
          <InstaButtonWrapper>
            <ImgButton src={`${process.env.PUBLIC_URL}/assets/card/insta.png`} alt="insta"></ImgButton>
          </InstaButtonWrapper>
        </CardImgWrapper>
      </CardMainWrapper>
    </CardWrapper>
  );
};

export default CardDetail;