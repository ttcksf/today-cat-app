import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPageProps {
  initialCatImageUrl: string;
}

const fetchCatImg = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = await res.json();
  return result[0];
};

const Home: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
  const [catImgUrl, setCatImgUrl] = useState(initialCatImageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const catImg = await fetchCatImg();
    setCatImgUrl(catImg.url);
    setIsLoading(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>猫画像アプリ</h1>
      {isLoading ? (
        <Loader active />
      ) : (
        <img src={catImgUrl} width={500} height="auto" alt="test" />
      )}

      <button style={{ marginTop: 18 }} onClick={handleClick}>
        今日の猫さん
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const catImg = await fetchCatImg();
  return {
    props: {
      initialCatImageUrl: catImg.url,
    },
  };
};

export default Home;
