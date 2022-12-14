import React from "react";
import { MobileSizeWrapper, Wrapper } from "../../components/styled/Wrapper";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import TabItem from "../../components/mypage/TabItem";
import Header from "./../../components/layout/Header";
const EditWrapper = styled.div`
  width: 100%;
  max-width: 61.25rem;
  min-height: 43rem;
  /* 53.75rem */
  margin: 6.25rem 5rem;
  background-color: white;
  border: 1px solid #80c0a0;
  border-radius: 3px;
  display: flex;
  height: 70%;
  @media screen and (max-width: 500px) {
    margin: 0;
    flex-direction: column;
    border: none;
  }
`;

const TabWrapper = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media screen and (max-width: 500px) {
    flex-direction: row;
    width: 100%;
  }
`;

const EditorWrapper = styled.div`
  width: 75%;
  padding: 5%;
  max-height: 860px;
  border-left: 1px solid #80c0a0;
  @media screen and (max-width: 500px) {
    border-left: none;
    width: 70%;
  }
  /* background-color: green; */
`;

const nestedLink = [
  {
    tabId: 1,
    title: "개인정보",
    link: "update/profile",
  },
  {
    tabId: 2,
    title: "비밀번호",
    link: "update/password",
  },
  {
    tabId: 3,
    title: "계정삭제",
    link: "delete/profile",
  },
];

const MyPage = () => {
  return (
    <>
      {/* 헤더 */}
      <Header></Header>
      <Wrapper>
        <EditWrapper>
          {/* 좌측 링크 선택 영역 */}
          <TabWrapper>
            {nestedLink.map((item) => (
              <TabItem {...item} key={item.tabId} />
            ))}
          </TabWrapper>
          {/* 우측 링크별 페이지 영역 */}
          <EditorWrapper>
            <Outlet />
          </EditorWrapper>
        </EditWrapper>
      </Wrapper>
    </>
  );
};

export default MyPage;
